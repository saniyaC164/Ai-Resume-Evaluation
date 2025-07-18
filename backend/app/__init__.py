from flask import Flask
from .routes.evaluator import evaluator_bp

def create_app():
    app = Flask(__name__)
    app.config['UPLOAD_FOLDER'] = 'uploads'
    app.register_blueprint(evaluator_bp)
    return app