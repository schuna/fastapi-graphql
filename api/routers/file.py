import os
import zipfile
from io import BytesIO
from pathlib import Path

from fastapi import APIRouter
from fastapi.responses import StreamingResponse

router = APIRouter(
    prefix="/download",
    tags=["download"]
)


@router.get("/zip")
async def download_zip():
    filename = "main"
    io = BytesIO()
    file_path = os.path.join(Path('asset'), filename)
    zip_filename = f"{filename}.zip"
    with zipfile.ZipFile(io, mode='w', compression=zipfile.ZIP_DEFLATED) as zf:
        zf.write(file_path)
    return StreamingResponse(
        iter([io.getvalue()]),
        media_type="application/x-zip-compressed",
        headers={
            "Content-Disposition": f"attachment;filename={zip_filename}"
        }
    )
