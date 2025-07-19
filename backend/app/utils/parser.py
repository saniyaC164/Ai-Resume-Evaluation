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
        file.stream.seek(0)  # Ensure pointer is at start
        pdf_stream = file.read()
        print("PDF file size in bytes:", len(pdf_stream))

        doc = fitz.open(stream=pdf_stream, filetype="pdf")

        text = ""
        for i, page in enumerate(doc):
            page_text = page.get_text()
            print(f"Page {i + 1} text length: {len(page_text)}")
            if page_text:
                text += page_text + "\n"

        doc.close()

        return text.strip()

    except Exception as e:
        print(f"Error extracting PDF text: {e}")
        return ""
