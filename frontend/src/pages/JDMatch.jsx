import { useState } from "react";
import axios from "axios";

export default function JDMatch() {
    const [jdText, setJdText] = useState("");
    const [resumeText, setResumeText] = useState("");
    const [result, setResult] = useState(null);

    const handleMatch = async () => {
        try {
            const res = await axios.post("http://localhost:5000/match-jd", {
                resume_text: resumeText,
                jd_text: jdText,
            });

            setResult(res.data);
        } catch (error) {
            console.error("JD Match Failed", error);
            alert("Matching failed. Check server.");
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Resume vs Job Description Matching</h2>

            <textarea
                placeholder="Paste resume text..."
                className="w-full p-2 mb-4 border"
                rows={6}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
            />

            <textarea
                placeholder="Paste job description..."
                className="w-full p-2 mb-4 border"
                rows={6}
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
            />

            <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleMatch}
            >
                Match JD
            </button>

            {result && (
                <div className="mt-4 bg-gray-100 p-4 rounded">
                    <p><strong>Similarity Score:</strong> {result.similarity_score}%</p>
                    <p><strong>Verdict:</strong> {result.verdict}</p>
                </div>
            )}
        </div>
    );
}
