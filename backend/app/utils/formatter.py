import json

def format_output(response_text: str) -> dict:
    """
    Parses the Gemini API response and returns a dictionary
    suitable for sending to the frontend.

    Args:
        response_text (str): Raw response text from Gemini (should be JSON-formatted)

    Returns:
        dict: Parsed and validated dictionary with structured resume evaluation
    """
    try:
        # Try parsing Gemini's response as JSON
        response_data = json.loads(response_text)

        # Optional: Validate expected keys exist
        expected_keys = ["Match Score", "Matched Skills", "Missing Skills", 
                         "ATS Compliance Feedback", "Section-wise Feedback", "Summary and Suggestions"]
        
        structured_output = {}

        for key in expected_keys:
            structured_output[key] = response_data.get(key, "N/A")

        return {
            "status": "success",
            "data": structured_output
        }

    except json.JSONDecodeError:
        # If Gemini didn't return proper JSON
        return {
            "status": "error",
            "message": "Invalid response format from Gemini. Please try again or check resume format."
        }

    except Exception as e:
        return {
            "status": "error",
            "message": f"Unexpected error: {str(e)}"
        }
