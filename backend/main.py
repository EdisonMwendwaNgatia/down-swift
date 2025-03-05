from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
import yt_dlp
import os
import uuid
import logging
import tempfile
import shutil
import anyio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class VideoRequest(BaseModel):
    url: HttpUrl
    format: str  # 'video', 'audio_mp4', 'audio_mp3'

def yt_dlp_progress_hook(d):
    if d['status'] == 'downloading':
        logger.info(f"Downloading: {d['_percent_str']}")

@app.post("/download/")
async def download_video(request: VideoRequest):
    url = request.url
    format = request.format

    tmp_dir = tempfile.mkdtemp()
    try:
        video_id = str(uuid.uuid4())
        ext = ""
        ydl_opts = {
            'noplaylist': True,
            'quiet': True,
            'progress_hooks': [yt_dlp_progress_hook],
            'outtmpl': os.path.join(tmp_dir, f'{video_id}.%(ext)s'),
        }

        if format == "video":
            ydl_opts['format'] = 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]'
            ydl_opts['merge_output_format'] = 'mp4'
            ext = "mp4"
        elif format == "audio_mp4":
            ydl_opts['format'] = 'bestaudio[ext=m4a]'
            ydl_opts['postprocessors'] = [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'm4a',
            }]
            ext = "m4a"
        elif format == "audio_mp3":
            ydl_opts['format'] = 'bestaudio[ext=m4a]'
            ydl_opts['postprocessors'] = [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
            }]
            ext = "mp3"
        else:
            raise HTTPException(status_code=400, detail="Invalid format selected.")

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(str(url), download=True)
            filename = ydl.prepare_filename(info)
            actual_path = os.path.join(tmp_dir, os.path.basename(filename))

        if format == "audio_mp4":
            new_path = actual_path.replace(".m4a", ".mp4")
            os.rename(actual_path, new_path)
            actual_path = new_path
            ext = "mp4"

        media_type = ""
        output_filename = ""
        if format == "video":
            media_type = "video/mp4"
            output_filename = f"video_{video_id}.mp4"
        elif format == "audio_mp4":
            media_type = "audio/mp4"
            output_filename = f"audio_{video_id}.mp4"
        elif format == "audio_mp3":
            media_type = "audio/mpeg"
            output_filename = f"audio_{video_id}.mp3"

        async def file_streamer():
            try:
                async with await anyio.open_file(actual_path, 'rb') as f:
                    while chunk := await f.read(4096):
                        yield chunk
            except anyio.get_cancelled_exc_class():
                logger.info("Download canceled by client.")
            finally:
                shutil.rmtree(tmp_dir, ignore_errors=True)

        return StreamingResponse(
            file_streamer(),
            media_type=media_type,
            headers={'Content-Disposition': f'attachment; filename="{output_filename}"'}
        )

    except yt_dlp.utils.DownloadError as e:
        logger.error(f"Download failed: {e}")
        shutil.rmtree(tmp_dir, ignore_errors=True)
        raise HTTPException(status_code=500, detail="Failed to download. It may be restricted or unavailable.")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        shutil.rmtree(tmp_dir, ignore_errors=True)
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)