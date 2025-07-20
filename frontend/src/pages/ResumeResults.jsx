import React from "react";
import { useLocation, Link } from "react-router-dom";

const ResumeResults = () => {
    const location = useLocation();
    const result = location.state?.result?.result;

    console.log("Results data:", location.state); // Debug log

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

    // Handle different response structures from backend
    const {
        score = 0,
        overall_score = 0,
        matchedSkills = [],
        matched_skills = [],
        missingSkills = [],
        missing_skills = [],
        skills_gap = [],
        atsFeedback = [],
        ats_feedback = [],
        recommendations = [],
        suggestions = [],
        sectionFeedback = {},
        section_feedback = {},
        summary = "",
        llmSummary = "",
        fit_assessment = "",
        strengths = [],
        weaknesses = []
    } = result;

    // Normalize the data to handle different API response formats
    const normalizedScore = score || overall_score || 0;
    const normalizedMatchedSkills = matchedSkills.length > 0 ? matchedSkills : matched_skills;
    const normalizedMissingSkills = missingSkills.length > 0 ? missingSkills : (missing_skills.length > 0 ? missing_skills : skills_gap);
    const normalizedAtsFeedback = atsFeedback.length > 0 ? atsFeedback : ats_feedback;
    const normalizedSectionFeedback = Object.keys(sectionFeedback).length > 0 ? sectionFeedback : section_feedback;
    const normalizedSummary = summary || llmSummary || fit_assessment || "";
    const normalizedRecommendations = recommendations.length > 0 ? recommendations : suggestions;

    const scoreValue = typeof normalizedScore === "number" || !isNaN(Number(normalizedScore)) ? `${Math.round(normalizedScore)}%` : "N/A";

    const atsColors = {
        "✔️": "text-green-600",
        "❌": "text-red-600",
        "⚠️": "text-yellow-600",
    };

    const downloadReport = () => {
        const reportData = {
            score: normalizedScore,
            matchedSkills: normalizedMatchedSkills,
            missingSkills: normalizedMissingSkills,
            atsFeedback: normalizedAtsFeedback,
            recommendations: normalizedRecommendations,
            sectionFeedback: normalizedSectionFeedback,
            summary: normalizedSummary,
            strengths,
            weaknesses,
            generatedAt: new Date().toLocaleString()
        };

        // Create a formatted report content
        const reportContent = `
    RESUME EVALUATION REPORT
    Generated: ${reportData.generatedAt}
    ==================================================

    OVERALL MATCH SCORE: ${typeof normalizedScore === "number" ? Math.round(normalizedScore) : normalizedScore}%

    MATCHED SKILLS:
    ${normalizedMatchedSkills?.map(skill => `• ${skill}`).join('\n') || 'None identified'}

    MISSING SKILLS:
    ${normalizedMissingSkills?.map(skill => `• ${skill}`).join('\n') || 'None identified'}

    ${strengths?.length > 0 ? `
    STRENGTHS:
    ${strengths.map(strength => `• ${strength}`).join('\n')}
    ` : ''}

    ${weaknesses?.length > 0 ? `
    AREAS FOR IMPROVEMENT:
    ${weaknesses.map(weakness => `• ${weakness}`).join('\n')}
    ` : ''}

    ${normalizedRecommendations?.length > 0 ? `
    RECOMMENDATIONS:
    ${normalizedRecommendations.map(rec => `• ${rec}`).join('\n')}
    ` : ''}

   ${Object.keys(normalizedSectionFeedback || {}).length > 0 ? `
   SECTION FEEDBACK:
   ${Object.entries(normalizedSectionFeedback).map(([section, feedback]) =>
            `${section.toUpperCase()}: ${feedback}`
        ).join('\n\n')}
    ` : ''}

    AI SUMMARY:
    ${normalizedSummary || 'No summary available'}
    `;

        // Create and download the file
        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `resume-evaluation-report-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
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
                        {parseInt(normalizedScore) >= 80
                            ? "✅ Your resume is a strong match for the job!"
                            : parseInt(normalizedScore) >= 60
                                ? "⚠️ Your resume shows potential with room for improvement."
                                : "❌ Consider improving your resume using suggestions below."}
                    </p>
                </div>

                {/* Skills Section */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Skills Analysis</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-green-600 mb-2">Matched Skills</h4>
                            <ul className="space-y-1">
                                {normalizedMatchedSkills && normalizedMatchedSkills.length > 0 ? (
                                    normalizedMatchedSkills.map((skill, i) => <li key={i}>✔️ {skill}</li>)
                                ) : (
                                    <li className="text-gray-400">No matched skills identified</li>
                                )}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-red-600 mb-2">Missing Skills</h4>
                            <ul className="space-y-1">
                                {normalizedMissingSkills && normalizedMissingSkills.length > 0 ? (
                                    normalizedMissingSkills.map((skill, i) => <li key={i}>❌ {skill}</li>)
                                ) : (
                                    <li className="text-gray-400">No missing skills identified</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Strengths & Weaknesses */}
                {(strengths.length > 0 || weaknesses.length > 0) && (
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Strengths & Areas for Improvement</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-green-600 mb-2">Strengths</h4>
                                <ul className="space-y-1">
                                    {strengths.length > 0 ? (
                                        strengths.map((strength, i) => <li key={i}>💪 {strength}</li>)
                                    ) : (
                                        <li className="text-gray-400">No specific strengths identified</li>
                                    )}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-red-600 mb-2">Areas for Improvement</h4>
                                <ul className="space-y-1">
                                    {weaknesses.length > 0 ? (
                                        weaknesses.map((weakness, i) => <li key={i}>⚠️ {weakness}</li>)
                                    ) : (
                                        <li className="text-gray-400">No specific weaknesses identified</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* ATS Feedback */}
                {normalizedAtsFeedback && normalizedAtsFeedback.length > 0 && (
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">ATS Compliance Summary</h3>

                        {/* Check if the feedback is in paragraph format or list format */}
                        {normalizedAtsFeedback.length === 1 && !normalizedAtsFeedback[0].includes('✔️') && !normalizedAtsFeedback[0].includes('❌') && !normalizedAtsFeedback[0].includes('⚠️') ? (
                            // If it's a single paragraph response from backend
                            <div className="text-gray-700 leading-relaxed text-left whitespace-pre-line">
                                {normalizedAtsFeedback[0]}
                            </div>
                        ) : (
                            // If it's a list of feedback items with icons
                            <div className="space-y-3">
                                {normalizedAtsFeedback.map((item, i) => {
                                    const trimmedItem = item.trim();
                                    const prefix = trimmedItem.slice(0, 2);
                                    const color = atsColors[prefix] || "text-gray-600";

                                    return (
                                        <div key={i} className={`${color} flex items-start text-left leading-relaxed`}>
                                            <span className="flex-shrink-0 mr-3 text-lg">
                                                {prefix === "✔️" ? "✔️" : prefix === "❌" ? "❌" : prefix === "⚠️" ? "⚠️" : "•"}
                                            </span>
                                            <span className="text-gray-700 flex-1">
                                                {trimmedItem.replace(/^[✔️❌⚠️]\s*/, "")}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* Recommendations */}
                {normalizedRecommendations && normalizedRecommendations.length > 0 && (
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Recommendations</h3>
                        <ul className="space-y-2">
                            {normalizedRecommendations.map((recommendation, i) => (
                                <li key={i} className="flex items-start">
                                    <span className="text-blue-500 mr-2">•</span>
                                    <span className="text-gray-700">{recommendation}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Section-wise Feedback */}
                {normalizedSectionFeedback && Object.entries(normalizedSectionFeedback).length > 0 && (
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Resume Section Feedback</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {Object.entries(normalizedSectionFeedback).map(([section, feedback], i) => (
                                <div key={i} className="bg-blue-50 p-4 rounded-md">
                                    <h4 className="font-semibold text-gray-700 mb-2 capitalize">{section}</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed text-left">
                                        {feedback || "No feedback provided."}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* AI Summary */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                        AI Summary & Suggestions
                    </h3>
                    <div className="text-gray-700 whitespace-pre-line text-left leading-relaxed">
                        {normalizedSummary && normalizedSummary.trim()
                            ? normalizedSummary
                            : "No detailed summary provided by the AI model."}
                    </div>
                </div>

                {/* Download Report */}
                <div className="flex justify-center space-x-4">
                    <Link
                        to="/"
                        className="bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition"
                    >
                        Analyze Another Resume
                    </Link>
                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition flex items-center space-x-2"
                        onClick={downloadReport}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Download Full Report</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResumeResults;