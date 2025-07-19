import json
import re
import google.generativeai as genai  # ✅ Correct import

from dotenv import load_dotenv
import os

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# ✅ Use fully-qualified model name
model = genai.GenerativeModel(model_name="models/gemini-2.5-flash")

def evaluate_resume(resume_text: str, jd_text: str = "") -> str:
    try:
        prompt = f"""
You are an AI Resume Evaluator. Analyze the resume below with respect to the job description (if provided).

Resume:
{resume_text}

Job Description:
{jd_text if jd_text else 'N/A'}

Provide your output as a strict JSON object with no markdown, no explanation, no text before or after. The JSON should include:

- match_score (int, out of 100)
- matched_skills (list)
- missing_skills (list)
- ats_feedback (str)
- section_feedback (dict: experience, education, skills, objective)
- summary (str)

Respond only with valid JSON.
"""

        # Generate content
        response = model.generate_content(prompt)
        raw_text = response.text

        print("📄 Raw Gemini Output:")
        print(raw_text[:1000])

        # Clean output (remove ```json if present)
        cleaned_text = re.sub(r"^```(?:json)?|```$", "", raw_text.strip(), flags=re.MULTILINE)

        # Parse to dict
        parsed_output = json.loads(cleaned_text)

        # Map Gemini's keys to frontend-expected structure
        structured_output = {
            "score": parsed_output.get("match_score", "N/A"),
            "matchedSkills": parsed_output.get("matched_skills", []),
            "missingSkills": parsed_output.get("missing_skills", []),
            "atsFeedback": parsed_output.get("ats_feedback", "").split('\n'),  # split str → list
            "sectionFeedback": parsed_output.get("section_feedback", {}),
            "llmSummary": parsed_output.get("summary", "No summary provided.")
    }
        print("✅ Final structured output to frontend:")
        print(json.dumps(structured_output, indent=2))

        return json.dumps(structured_output)
        


    except json.JSONDecodeError:
        print("❌ Gemini response was not valid JSON.")
        return json.dumps({"error": "Invalid response format from Gemini. Please try again or check resume format."})

    except Exception as e:
        print(f"❌ Unexpected error in Gemini API: {str(e)}")
        return json.dumps({"error": f"Unexpected error: {str(e)}"})
    