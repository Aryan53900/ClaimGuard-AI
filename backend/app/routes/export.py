import os
import base64
import uuid
from io import BytesIO
from fastapi import APIRouter, Request
from fastapi.responses import Response
from jinja2 import Environment, FileSystemLoader
from xhtml2pdf import pisa

router = APIRouter()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
env = Environment(loader=FileSystemLoader(os.path.join(BASE_DIR, 'templates')))
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@router.post("/export-pdf")
async def generate_pdf(request: Request):
    data = await request.json()
    template = env.get_template("report_template.html")
    
    # 1. Convert Base64 back to a physical image file temporarily
    image_path = ""
    base64_str = data.get('image_base64', '')
    temp_filepath = None
    
    if base64_str:
        try:
            if "base64," in base64_str:
                base64_str = base64_str.split("base64,")[1]
            
            img_data = base64.b64decode(base64_str)
            temp_filepath = os.path.join(UPLOAD_FOLDER, f"temp_{uuid.uuid4()}.jpg")
            
            with open(temp_filepath, "wb") as f:
                f.write(img_data)
                
            # xhtml2pdf strictly requires absolute system paths to render images
            image_path = os.path.abspath(temp_filepath)
        except Exception as e:
            print(f"Failed to process image for PDF: {e}")

    # 2. Render Template
    rendered_html = template.render(
        claim_amount=data.get('total_claim_amount', 0),
        deductible=data.get('policy_deductable', 0),
        fraud_score=data.get('fraud_score', 0),
        severity=data.get('damage_severity', 'N/A'),
        repair_cost=data.get('estimated_repair_cost', '₹0'),
        parts=data.get('damaged_parts', []),
        indicators=data.get('fraud_indicators', ''),
        image_path=image_path
    )
    
    # 3. Generate PDF
    pdf_buffer = BytesIO()
    pisa_status = pisa.CreatePDF(rendered_html, dest=pdf_buffer)
    
    # 4. Cleanup the temporary image immediately
    if temp_filepath and os.path.exists(temp_filepath):
        os.remove(temp_filepath)
    
    if pisa_status.err:
        return Response(content="PDF Generation Error", status_code=500)
        
    return Response(
        content=pdf_buffer.getvalue(),
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="ClaimGuard_Report.pdf"'}
    )