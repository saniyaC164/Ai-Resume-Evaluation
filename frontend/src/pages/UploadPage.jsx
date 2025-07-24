import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import axios from "axios";

export default function UploadPage() {
    const [resumeFile, setResumeFile] = useState(null);
    const [jobDesc, setJobDesc] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Fixed: Move API_BASE_URL inside component or create config file
    const API_BASE_URL = import.meta.env.VITE_API_URL || "https://ai-resume-evaluator-backend-7msi.onrender.com";

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // More comprehensive file type checking
        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        const allowedExtensions = [".pdf", ".doc", ".docx"];
        const fileName = file.name.toLowerCase();
        const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));

        if (!allowedTypes.includes(file.type) && !hasValidExtension) {
            alert("Please upload a valid PDF or Word document.");
            setError("Invalid file type. Please upload PDF, DOC, or DOCX files only.");
            return;
        }

        // Check file size (16MB limit)
        const maxSize = 16 * 1024 * 1024; // 16MB
        if (file.size > maxSize) {
            alert("File size too large. Please upload a file smaller than 16MB.");
            setError("File size exceeds 16MB limit.");
            return;
        }

        setResumeFile(file);
        setError(""); // Clear any previous errors
    };

    const handleSubmit = async () => {
        if (!resumeFile) {
            setError("Please upload a resume file");
            alert("Please upload a resume file");
            return;
        }

        const formData = new FormData();
        formData.append("resume", resumeFile);

        // Fixed: Use the correct field name that matches your backend
        if (jobDesc.trim()) {
            formData.append("job_description", jobDesc.trim()); // This matches your backend expectation
        }

        try {
            setLoading(true);
            setError("");
            navigate("/loading");

            // Make API call with proper error handling
            const response = await axios.post(`${API_BASE_URL}/api/evaluate`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                timeout: 60000, // 60 second timeout
            });

            console.log("API Response:", response.data); // Debug log

            // Handle different response structures
            if (response.data && (response.data.success || response.data.status === "success")) {
                // Extract the actual result data
                const resultData = response.data.data || response.data.result || response.data;
                navigate("/resume-results", {
                    state: {
                        result: {
                            result: resultData,
                            status: "success"
                        }
                    }
                });
            } else {
                const errorMessage = response.data.message || response.data.error || "Evaluation failed. Try again.";
                alert(errorMessage);
                setError(errorMessage);
                navigate("/");
            }
        } catch (error) {
            console.error("Error submitting:", error);

            let errorMessage = "Failed to evaluate resume. Please try again.";

            if (error.response) {
                // Server responded with error status
                errorMessage = error.response.data?.error ||
                    error.response.data?.message ||
                    `Server error: ${error.response.status}`;
            } else if (error.request) {
                // Network error
                errorMessage = "Network error. Please check your connection and try again.";
            }

            alert(errorMessage);
            setError(errorMessage);
            navigate("/");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow bg-gray-50 p-6 flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold mb-2 text-center">AI Resume Evaluator</h2>
                <p className="text-gray-600 mb-8 text-center max-w-xl">
                    Upload your resume and get instant AI-powered feedback tailored to your dream job.
                </p>

                <div className="bg-white rounded-2xl shadow-md w-full max-w-xl p-6">
                    <label className="block text-sm font-medium mb-2">Upload Resume (PDF/DOCX)</label>
                    <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className={error ? "border-red-500" : ""}
                    />

                    {/* Display selected file name */}
                    {resumeFile && (
                        <p className="text-sm text-green-600 mt-1">
                            Selected: {resumeFile.name}
                        </p>
                    )}

                    <label className="block text-sm font-medium mt-6 mb-2">Optional Job Description</label>
                    <Textarea
                        rows={4}
                        placeholder="Paste job description here (optional)"
                        value={jobDesc}
                        onChange={(e) => setJobDesc(e.target.value)}
                    />

                    {/* Error display */}
                    {error && (
                        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <Button
                        onClick={handleSubmit}
                        className="mt-6 w-full"
                        disabled={loading || !resumeFile}
                    >
                        {loading ? "Submitting..." : "Submit for Evaluation"}
                    </Button>
                </div>
            </main>

            <Footer />
        </div>
    );
}