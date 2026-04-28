from ..docs.generator import DocGenerator
from ..docs.ai_writer import enhance_docs
from ..docs.formatter import to_html
from ..database import SessionLocal
from ..models.documentation import Documentation
import os

generator = DocGenerator()

def generate_docs_for_file(file_path):
    if not os.path.isabs(file_path):
        # Handle relative paths if necessary, but absolute is safer
        pass
        
    raw_doc = generator.generate(file_path)
    enhanced = enhance_docs(raw_doc)
    html_content = to_html(enhanced)
    
    file_base = os.path.basename(file_path)
    output_filename = f"{file_base}.html"
    output_path = os.path.join("output_docs", output_filename)
    
    # Ensure directory exists
    os.makedirs("output_docs", exist_ok=True)
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html_content)
        
    # Save to database
    db = SessionLocal()
    try:
        doc_entry = Documentation(
            title=file_base,
            content=enhanced,
            version="1.0.0"
        )
        db.add(doc_entry)
        db.commit()
    finally:
        db.close()
        
    return {
        "source_file": file_base,
        "output_file": output_filename,
        "status": "Documentation Generated Successfully",
        "output_path": os.path.abspath(output_path)
    }
