import json
import re
import logging
import google.generativeai as genai
from dotenv import load_dotenv
import os
from typing import Dict, Any

load_dotenv()
logger = logging.getLogger(__name__)

# Validate API key exists
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY environment variable is required")

genai.configure(api_key=api_key)
model = genai.GenerativeModel(model_name="models/gemini-2.5-flash")

def evaluate_resume(resume_text: str, jd_text: str = "") -> Dict[str, Any]:
    """
    Evaluates a resume against a job description using Gemini AI.
    
    Args:
        resume_text: The extracted resume text
        jd_text: The job description text (optional)
    
    Returns:
        Dict containing the evaluation results
    """
    try:
        # Input validation
        if not resume_text or not resume_text.strip():
            return {
                "status": "error",
                "message": "Resume text is empty or invalid"
            }

        prompt = create_evaluation_prompt(resume_text, jd_text)
        
        # Generate content with retry logic
        max_retries = 3
        for attempt in range(max_retries):
            try:
                response = model.generate_content(prompt)
                raw_text = response.text
                break
            except Exception as e:
                if attempt == max_retries - 1:
                    raise e
                logger.warning(f"Gemini API attempt {attempt + 1} failed: {e}")

        logger.info("Successfully received response from Gemini API")
        
        # Parse and structure the response
        structured_result = parse_gemini_response(raw_text)
        
        return {
            "status": "success",
            "result": structured_result
        }

    except json.JSONDecodeError as e:
        logger.error(f"JSON parsing error: {e}")
        return {
            "status": "error",
            "message": "Invalid response format from AI service"
        }
    except Exception as e:
        logger.error(f"Gemini API error: {str(e)}")
        return {
            "status": "error", 
            "message": f"AI service error: {str(e)}"
        }

def create_evaluation_prompt(resume_text: str, jd_text: str) -> str:
    """Creates the evaluation prompt for Gemini."""
    return f"""
You are an expert ATS (Applicant Tracking System) and HR consultant. Analyze the resume below against the job description.

RESUME:
{resume_text}

JOB DESCRIPTION:
{jd_text if jd_text else 'No specific job description provided - provide general resume analysis'}

Provide your analysis as a JSON object with exactly these fields:
- match_score: integer from 0-100
- matched_skills: array of skills that match the job requirements  
- missing_skills: array of important skills missing from the resume
- ats_feedback: string with specific ATS optimization suggestions
- section_feedback: object with keys (experience, education, skills, objective) and string values
- summary: string with overall evaluation summary

Respond ONLY with valid JSON, no markdown formatting.
"""

def parse_gemini_response(raw_text: str) -> Dict[str, Any]:
    """Parses and structures the Gemini API response."""
    try:
        # Clean the response
        cleaned_text = re.sub(r"^```(?:json)?|```$", "", raw_text.strip(), flags=re.MULTILINE)
        parsed_data = json.loads(cleaned_text)
        
        # Structure the output for frontend
        return {
            "score": parsed_data.get("match_score", 0),
            "matchedSkills": parsed_data.get("matched_skills", []),
            "missingSkills": parsed_data.get("missing_skills", []),
            "atsFeedback": parse_feedback_text(parsed_data.get("ats_feedback", "")),
            "sectionFeedback": parsed_data.get("section_feedback", {}),
            "llmSummary": parsed_data.get("summary", "No summary available")
        }
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse Gemini response as JSON: {e}")
        raise
    except Exception as e:
        logger.error(f"Error structuring response: {e}")
        raise

def parse_feedback_text(feedback: str) -> list:
    """Converts feedback string to list format for frontend."""
    if isinstance(feedback, list):
        return feedback
    if isinstance(feedback, str) and feedback.strip():
        return [line.strip() for line in feedback.split('\n') if line.strip()]
    return ["No specific feedback available"]