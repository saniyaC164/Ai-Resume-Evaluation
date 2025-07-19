import datetime
import json
import logging
from flask import Blueprint, request, jsonify
from werkzeug.exceptions import BadRequest
from app.services.gemini_api import evaluate_resume
from app.utils.parser import extract_text_from_pdf

evaluator_bp = Blueprint('evaluator', __name__)
logger = logging.getLogger(__name__)

@evaluator_bp.route('/evaluate', methods=['POST'])
def evaluate():
    try:
        # Validate request
        if not request.files:
            return jsonify({
                "status": "error",
                "message": "No files provided"
            }), 400

        resume_file = request.files.get('resume')
        jd_file = request.files.get('job_description')

        if not resume_file:
            return jsonify({
                "status": "error", 
                "message": "Resume file is required"
            }), 400

        # Validate file types
        if resume_file and not resume_file.filename.lower().endswith('.pdf'):
            return jsonify({
                "status": "error",
                "message": "Resume must be a PDF file"
            }), 400

        # Extract text
        resume_text = extract_text_from_pdf(resume_file) if resume_file else ''
        if not resume_text.strip():
            return jsonify({
                "status": "error",
                "message": "Could not extract text from resume PDF"
            }), 400

        jd_text = jd_file.read().decode('utf-8') if jd_file else ''

        logger.info(f"Processing resume with {len(resume_text)} characters")
        logger.info(f"Job description has {len(jd_text)} characters")

        # Evaluate resume
        result = evaluate_resume(resume_text, jd_text)
        
        if result.get('status') == 'error':
            return jsonify(result), 500

        return jsonify(result)

    except Exception as e:
        logger.error(f"Unexpected error in evaluate endpoint: {str(e)}")
        return jsonify({
            "status": "error",
            "message": "Internal server error occurred"
        }), 500

@evaluator_bp.route('/test', methods=['GET'])
def test():
    return jsonify({'status': 'API working ✅', 'timestamp': str(datetime.utcnow())})