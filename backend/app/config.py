from dotenv import load_dotenv
import os

# Load variables from .env into the environment
load_dotenv()

# Access environment variables
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
