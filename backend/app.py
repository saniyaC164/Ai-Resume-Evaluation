# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import os

from utils.parser import extract_text
from utils.evaluator import evaluate_resume_text, match_resume_to_jd

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/", methods=["GET"])
def home():
    return "Flask backend is running!"

@app.route("/upload", methods=["POST"])
def upload_resume():
    if 'resume' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['resume']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    try:
        extracted_text = extract_text(filepath)
        evaluation = evaluate_resume_text(extracted_text)

        return jsonify({
            'message': 'Resume uploaded successfully',
            'analysis': evaluation,
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/match-jd", methods=["POST"])
def match_jd():
    data = request.get_json()
    resume_text = data.get("resume_text")
    jd_text = data.get("jd_text")

    if not resume_text or not jd_text:
        return jsonify({"error": "Missing resume or job description text"}), 400

    match_result = match_resume_to_jd(resume_text, jd_text)
    return jsonify(match_result)

if __name__ == "__main__":
    app.run(debug=True)
