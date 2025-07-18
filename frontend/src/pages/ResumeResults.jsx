import React from 'react';

const ResumeResults = () => {
    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            {/* Navbar */}
            <nav className="flex justify-between items-center py-4 border-b bg-white px-4">
                <h1 className="text-xl font-semibold">AI Resume Evaluator</h1>
                <div className="space-x-6 text-gray-600">
                    <a href="#">Home</a>
                    <a href="#">Features</a>
                    <a href="#">About</a>
                    <a href="#">Contact</a>
                </div>
            </nav>

            {/* Title */}
            <h2 className="text-3xl font-bold text-center mt-10">Resume Evaluation Results</h2>

            {/* Match Score */}
            <div className="bg-white rounded-xl shadow-md p-6 mt-10 max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold mb-4">Overall Match Score</h3>
                <div className="flex items-center justify-center">
                    <div className="bg-blue-500 text-white rounded-full w-32 h-32 flex items-center justify-center text-3xl font-bold">
                        85%
                    </div>
                </div>
                <p className="text-center text-gray-600 mt-4">Your resume is a strong match for the job description!</p>
            </div>

            {/* Skills Analysis */}
            <div className="bg-white rounded-xl shadow-md p-6 mt-6 max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold mb-4">Skills Analysis</h3>
                <div className="flex justify-between flex-wrap">
                    <div>
                        <h4 className="font-semibold mb-2">Matched Skills</h4>
                        <ul className="text-green-600 space-y-1">
                            <li>✔️ Project Management</li>
                            <li>✔️ Data Analysis</li>
                            <li>✔️ SQL</li>
                            <li>✔️ Python</li>
                            <li>✔️ Communication</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Missing Skills</h4>
                        <ul className="text-red-600 space-y-1">
                            <li>❌ Machine Learning</li>
                            <li>❌ Cloud Computing (AWS)</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* ATS Compliance Summary */}
            <div className="bg-white rounded-xl shadow-md p-6 mt-6 max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold mb-4">ATS Compliance Summary</h3>
                <ul className="grid grid-cols-2 gap-3 text-gray-800">
                    <li className="text-green-600">✔️ Standard Font Used</li>
                    <li className="text-green-600">✔️ Clear Section Headings</li>
                    <li className="text-green-600">✔️ Keyword Optimization</li>
                    <li className="text-red-600">❌ Complex Graphics Detected</li>
                    <li className="text-green-600">✔️ Standard File Format (PDF)</li>
                </ul>
            </div>

            {/* Resume Section Feedback */}
            <div className="bg-white rounded-xl shadow-md p-6 mt-6 max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold mb-4">Resume Section Feedback</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-100 p-3 rounded-md">
                        <h4 className="font-semibold">Experience</h4>
                        <p className="text-sm text-gray-700">Use strong action verbs and quantifiable achievements.</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-md">
                        <h4 className="font-semibold">Education</h4>
                        <p className="text-sm text-gray-700">Clearly listed degrees and institutions.</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-md">
                        <h4 className="font-semibold">Skills</h4>
                        <p className="text-sm text-gray-700">Include both soft and technical skills.</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-md">
                        <h4 className="font-semibold">Summary/Objective</h4>
                        <p className="text-sm text-gray-700">Tailor it more to the company’s values.</p>
                    </div>
                </div>
            </div>

            {/* LLM Suggestions */}
            <div className="bg-white rounded-xl shadow-md p-6 mt-6 max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold mb-4">LLM Summary & Suggestions</h3>
                <p className="text-gray-700">
                    Your resume demonstrates a strong foundation in project management and data analysis. Consider expanding on
                    experience with cloud platforms (AWS) and give examples of presentations or collaborations. Tailoring the
                    resume to job-specific keywords will further improve ATS compliance.
                </p>
            </div>

            {/* Download Button */}
            <div className="flex justify-center mt-6">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                    Download Full Report
                </button>
            </div>
        </div>
    );
};

export default ResumeResults;
