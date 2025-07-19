import fitz  # PyMuPDF
import logging
from werkzeug.datastructures import FileStorage
from typing import Optional

logger = logging.getLogger(__name__)

def extract_text_from_pdf(file: FileStorage) -> str:
    """
    Extracts text from a PDF file using PyMuPDF.
    
    Args:
        file: Uploaded PDF file from Flask request
    
    Returns:
        Extracted plain text from PDF
    
    Raises:
        Exception: If PDF processing fails
    """
    if not file:
        logger.error("No file provided to extract_text_from_pdf")
        return ""
    
    try:
        # Reset file pointer and read content
        file.stream.seek(0)
        pdf_stream = file.read()
        
        if not pdf_stream:
            logger.error("PDF file is empty")
            return ""
        
        logger.info(f"Processing PDF file: {file.filename} ({len(pdf_stream)} bytes)")
        
        # Open PDF document
        doc = fitz.open(stream=pdf_stream, filetype="pdf")
        
        if doc.page_count == 0:
            logger.warning("PDF has no pages")
            doc.close()
            return ""
        
        # Extract text from all pages
        extracted_text = []
        for page_num in range(doc.page_count):
            page = doc[page_num]
            page_text = page.get_text()
            
            if page_text.strip():
                extracted_text.append(page_text)
                logger.debug(f"Page {page_num + 1}: {len(page_text)} characters")
            else:
                logger.warning(f"Page {page_num + 1} contains no extractable text")
        
        doc.close()
        
        full_text = "\n\n".join(extracted_text).strip()
        logger.info(f"Successfully extracted {len(full_text)} characters from PDF")
        
        return full_text
        
    except fitz.fitz.FileDataError:
        logger.error("Invalid or corrupted PDF file")
        raise Exception("Invalid PDF file format")
    except Exception as e:
        logger.error(f"PDF extraction error: {str(e)}")
        raise Exception(f"Failed to process PDF: {str(e)}")