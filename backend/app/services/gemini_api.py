import google.generativeai as genai
from app.config import GEMINI_API_KEY


genai.configure(api_key=GEMINI_API_KEY)

def evaluate_resume(resume_text: str, jd_text: str = '') -> str:
    """
    Evaluates a resume against a job description using Gemini API.

    Args:
        resume_text (str): Extracted text from resume PDF.
        jd_text (str): Optional job description text.

    Returns:
        str: JSON-formatted evaluation string from Gemini response.
    """
    model = genai.GenerativeModel('gemini-pro')

    # Build prompt dynamically
    prompt = f"""
You are an AI Resume Evaluator. Analyze the following resume with respect to the job description (if provided).

Resume:
\"\"\"
{resume_text}
\"\"\"

Job Description:
\"\"\"
{jd_text if jd_text else 'N/A'}
\"\"\"

Provide a detailed and structured JSON output including:
- Match Score (out of 100)
- Matched and Missing Skills
- ATS Compliance Feedback (e.g., font usage, section headers, keywords, formatting, graphics)
- Section-wise Feedback (Experience, Education, Skills, Objective)
- Overall Summary and Suggestions

Ensure the output is pure JSON without extra explanations.
"""

    try:
        response = model.generate_content(prompt)
        return response.text  # This should be a JSON string
    except Exception as e:
        print(f"[Gemini API Error] {e}")
        return '{"error": "Failed to process resume with Gemini API."}'
