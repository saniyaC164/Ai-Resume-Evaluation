import json
import re

def format_output(response_text: str) -> dict:
    try:
        json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
        if not json_match:
            raise ValueError("No valid JSON block found in Gemini response.")
        
        json_str = json_match.group(0)
        response_data = json.loads(json_str)

        structured_output = {
            "score": response_data.get("match_score", "N/A"),
            "matchedSkills": response_data.get("matched_skills", []),
            "missingSkills": response_data.get("missing_skills", []),
            "atsFeedback": response_data.get("ats_feedback", "").split('\n'),
            "sectionFeedback": response_data.get("section_feedback", {}),
            "summary": response_data.get("summary", "No summary provided.")
        }

        return {
            "status": "success",
            "result": structured_output
        }

    except json.JSONDecodeError:
        return {
            "status": "error",
            "message": "Invalid response format from Gemini. Please try again or check resume format."
        }

    except Exception as e:
        return {
            "status": "error",
            "message": f"Unexpected error: {str(e)}"
        }
