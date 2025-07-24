from flask import Flask
from flask_cors import CORS
from app.routes.evaluator import evaluator_bp
import logging

def create_app():
    app = Flask(__name__)
    CORS(app, origins=[
        'http://localhost:3000',
        'http://localhost:5173',  # Vite dev server
        'https://ai-resume-evaluation.vercel.app'  # Vercel URL
    ])
    
    # Configure logging
    logging.basicConfig(level=logging.INFO)
    
    # Add basic security headers
    @app.after_request
    def add_security_headers(response):
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'DENY'
        response.headers['X-XSS-Protection'] = '1; mode=block'
        return response

    @app.route('/')
    def index():
        return {"message": "Resume Evaluator API is running!", "version": "1.0"}

    app.register_blueprint(evaluator_bp, url_prefix="/api")
    return app