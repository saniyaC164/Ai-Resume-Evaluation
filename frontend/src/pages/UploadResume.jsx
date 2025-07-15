import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_description", jobDescription);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Upload Success", response.data);
      navigate("/results", { state: response.data });

    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Upload Your Resume</h2>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <textarea
        placeholder="Paste the job description here"
        className="w-full h-32 mt-4 p-2 border"
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  );
}

