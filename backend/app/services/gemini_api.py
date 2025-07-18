import google.generativeai as genai
from app.config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

def evaluate_resume(resume_text, jd_text=''):
    model = genai.GenerativeModel('gemini-pro')
    prompt = f"""
    Resume: {resume_text}
    Job Description: {jd_text if jd_text else 'N/A'}

    Analyze the resume with respect to the job description if provided. 
    Return a structured analysis including:
    - Match score (out of 100)
    - Matched and missing skills
    - ATS compliance feedback (font, headings, keywords, format, graphics)
    - Section-wise feedback (Experience, Education, Skills, Objective)
    - LLM-generated summary and suggestions
    Format it as JSON.
    """
    response = model.generate_content(prompt)
    return response.text