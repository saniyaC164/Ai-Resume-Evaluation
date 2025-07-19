import React from "react";
import { useLocation, Link } from "react-router-dom";

const ResumeResults = () => {
    const location = useLocation();
    const result = location.state?.result?.result;


    if (!result) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-gray-600 text-center px-6">
                <p className="text-2xl font-semibold mb-4">No evaluation result found.</p>
                <p className="mb-6">Please upload a resume first to see results.</p>
                <Link
                    to="/"
                    className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                >
                    Go to Upload Page
                </Link>
            </div>
        );
    }

    const {
        score,
        matchedSkills = [],
        missingSkills = [],
        atsFeedback = [],
        sectionFeedback = {},
        summary = "",  // renamed from llmSummary to summary
    } = result;

    const scoreValue = typeof score === "number" || !isNaN(Number(score)) ? `${score}%` : "N/A";

    const atsColors = {
        "✔️": "text-green-600",
        "❌": "text-red-600",
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="flex justify-between items-center py-4 border-b bg-white px-6 md:px-10">
                <h1 className="text-xl font-bold text-gray-800">AI Resume Evaluator</h1>
                <div className="space-x-4 text-gray-600 hidden sm:block">
                    <Link to="/">Home</Link>
                    <Link to="/features">Features</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </div>
            </nav>

            {/* Title */}
            <h2 className="text-3xl font-bold text-center mt-10 text-gray-800">
                Resume Evaluation Results
            </h2>

            <div className="px-4 sm:px-6 md:px-8 max-w-5xl mx-auto space-y-10 mt-10 pb-16">

                {/* Match Score */}
                <div className="bg-white rounded-xl shadow-md p-6 text-center">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Overall Match Score</h3>
                    <div className="mx-auto bg-blue-500 text-white rounded-full w-28 h-28 flex items-center justify-center text-3xl font-bold">
                        {scoreValue}
                    </div>
                    <p className="text-gray-600 mt-4">
                        {parseInt(score) >= 80
                            ? "✅ Your resume is a strong match for the job!"
                            : "⚠️ Consider improving your resume using suggestions below."}
                    </p>
                </div>

                {/* Skills Section */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Skills Analysis</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-green-600 mb-2">Matched Skills</h4>
                            <ul className="space-y-1">
                                {matchedSkills.length > 0 ? (
                                    matchedSkills.map((skill, i) => <li key={i}>✔️ {skill}</li>)
                                ) : (
                                    <li className="text-gray-400">No matched skills</li>
                                )}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-red-600 mb-2">Missing Skills</h4>
                            <ul className="space-y-1">
                                {missingSkills.length > 0 ? (
                                    missingSkills.map((skill, i) => <li key={i}>❌ {skill}</li>)
                                ) : (
                                    <li className="text-gray-400">No missing skills</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* ATS Feedback */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">ATS Compliance Summary</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-800">
                        {atsFeedback.length > 0 ? (
                            atsFeedback.map((item, i) => {
                                const prefix = item.trim().slice(0, 2);
                                const color = atsColors[prefix] || "text-gray-600";
                                return <li key={i} className={color}>{item}</li>;
                            })
                        ) : (
                            <li className="text-gray-400">No ATS feedback available</li>
                        )}
                    </ul>
                </div>

                {/* Section-wise Feedback */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Resume Section Feedback</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(sectionFeedback).length > 0 ? (
                            Object.entries(sectionFeedback).map(([section, feedback], i) => (
                                <div key={i} className="bg-blue-50 p-3 rounded-md">
                                    <h4 className="font-semibold text-gray-700 mb-1">{section}</h4>
                                    <p className="text-sm text-gray-600">{feedback || "No feedback provided."}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">No section feedback provided.</p>
                        )}
                    </div>
                </div>

                {/* LLM Suggestions */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                        AI Summary & Suggestions
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line">
                        {typeof summary === "string" && summary.trim()
                            ? summary
                            : "No suggestions provided by the model."}
                    </p>
                </div>

                {/* Download Report */}
                <div className="flex justify-center">
                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                        onClick={() => alert("Download functionality coming soon!")}
                    >
                        Download Full Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResumeResults;
