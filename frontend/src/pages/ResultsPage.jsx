// src/pages/ResultsPage.jsx
import { useLocation } from "react-router-dom";

export default function ResultsPage() {
    const location = useLocation();
    const { score, feedback } = location.state?.analysis || {};

    return (
        <div className="min-h-screen bg-white p-6 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-6">Resume Evaluation Results</h2>

            <div className="text-xl mb-4">
                <strong>Score:</strong> {score} / 8
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Feedback:</h3>
                <ul className="list-disc pl-6 text-gray-700">
                    {feedback && feedback.length > 0 ? (
                        feedback.map((item, index) => <li key={index}>{item}</li>)
                    ) : (
                        <li>No feedback! Great job.</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
