from flask import Blueprint, request, jsonify
from app.services.gemini_api import evaluate_resume
from app.utils.formatter import format_output

evaluator_bp = Blueprint('evaluator', __name__)

@evaluator_bp.route('/evaluate', methods=['POST'])
def evaluate():
    resume_file = request.files.get('resume')
    jd_file = request.files.get('job_description')

    resume_text = resume_file.read().decode('utf-8') if resume_file else ''
    jd_text = jd_file.read().decode('utf-8') if jd_file else ''

    result = evaluate_resume(resume_text, jd_text)
    output = format_output(result)
    return jsonify(output)