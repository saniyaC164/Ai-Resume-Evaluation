import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import axios from "axios";

export default function HomePage() {
    const [resumeFile, setResumeFile] = useState(null);
    const [jobDesc, setJobDesc] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        if (!allowedTypes.includes(file.type)) {
            alert("Please upload a valid PDF or Word document.");
            return;
        }

        setResumeFile(file);
    };

    const handleSubmit = async () => {
        if (!resumeFile) return alert("Please upload a resume file");

        const formData = new FormData();
        formData.append("resume", resumeFile);
        if (jobDesc.trim()) {
            formData.append("job_description", jobDesc);
        }

        try {
            setLoading(true);
            navigate("/loading");

            const response = await axios.post("/api/evaluate", formData);
            const result = response.data;

            if (result.status === "success") {
                navigate("/resume-results", { state: { result } });
            } else {
                alert(result.message || "Evaluation failed. Try again.");
                navigate("/");
            }
        } catch (error) {
            console.error("Error submitting:", error);
            alert("Failed to evaluate resume. Please try again.");
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
                    <Input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />

                    <label className="block text-sm font-medium mt-6 mb-2">Optional Job Description</label>
                    <Textarea
                        rows={4}
                        placeholder="Paste job description here (optional)"
                        value={jobDesc}
                        onChange={(e) => setJobDesc(e.target.value)}
                    />

                    <Button onClick={handleSubmit} className="mt-6 w-full">
                        {loading ? "Submitting..." : "Submit for Evaluation"}
                    </Button>
                </div>
            </main>

            <Footer />
        </div>
    );
}
