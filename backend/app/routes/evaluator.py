from flask import Blueprint, request, jsonify
from app.services.gemini_api import evaluate_resume
from app.utils.formatter import format_output
from app.utils.parser import extract_text_from_pdf

evaluator_bp = Blueprint('evaluator', __name__)

@evaluator_bp.route('/evaluate', methods=['POST'])
def evaluate():
    resume_file = request.files.get('resume')
    jd_file = request.files.get('job_description')

    resume_text = extract_text_from_pdf(resume_file) if resume_file else ''
    jd_text = jd_file.read().decode('utf-8') if jd_file else ''

    print("------ RESUME TEXT ------")
    print(resume_text[:1000])  # Show first 1000 characters
    print("------ JOB DESCRIPTION TEXT ------")
    print(jd_text)

    result_text = evaluate_resume(resume_text, jd_text)

    # Format output from Gemini to structured JSON
    formatted_result = format_output(result_text)

    print("✅ Final structured output to frontend:")
    print(json.dumps(formatted_result, indent=2))

    return jsonify({
        "status": "success",
        "result": formatted_result
})

@evaluator_bp.route('/test', methods=['GET'])
def test():
    return jsonify({'status': 'API working ✅'})
