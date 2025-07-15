import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome to the AI Resume Evaluator</h1>
            <p className="text-gray-700 mb-6 max-w-xl">
                Upload your resume and get instant insights powered by AI – resume score, skill match, ATS compatibility, and personalized suggestions.
            </p>
            <Link to="/upload">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
                    Upload Resume
                </button>
            </Link>
        </div>
    );
}
