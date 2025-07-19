import fitz  # PyMuPDF
from werkzeug.datastructures import FileStorage

def extract_text_from_pdf(file: FileStorage) -> str:
    """
    Extracts text from a PDF file using PyMuPDF (fitz).

    Args:
        file (FileStorage): Uploaded PDF file.

    Returns:
        str: Extracted plain text from PDF.
    """
    try:
        # Read the file stream and open as PDF
        pdf_stream = file.read()
        doc = fitz.open(stream=pdf_stream, filetype="pdf")

        text = ""
        for page in doc:
            page_text = page.get_text()
            if page_text:
                text += page_text + "\n"

        doc.close()

        return text.strip() if text else "No text could be extracted from the PDF."

    except Exception as e:
        print(f"Error extracting PDF text: {e}")
        return "Error parsing the PDF file. Please ensure it is a valid, readable PDF."
