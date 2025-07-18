import json

def format_output(raw_response):
    try:
        parsed = json.loads(raw_response)
        return {
            "matchScore": parsed.get("match_score", 0),
            "skills": {
                "matched": parsed.get("matched_skills", []),
                "missing": parsed.get("missing_skills", [])
            },
            "ats": parsed.get("ats_feedback", {}),
            "sections": parsed.get("section_feedback", {}),
            "llmSummary": parsed.get("llm_summary", "")
        }
    except Exception as e:
        return {"error": "Failed to parse Gemini output", "details": str(e)}