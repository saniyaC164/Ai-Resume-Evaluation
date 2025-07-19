from flask import Flask
from flask_cors import CORS
from app.routes.evaluator import evaluator_bp

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(evaluator_bp, url_prefix="/api")
    return app