const features = [
    {
        title: "Match Score Analysis",
        description: "Instant score showing how well your resume aligns with a job description.",
    },
    {
        title: "Skills Gap Identification",
        description: "Highlights relevant skills and identifies what's missing.",
    },
    {
        title: "ATS Compliance Check",
        description: "Ensures formatting, keywords, and structure pass ATS filters.",
    },
    {
        title: "Personalized Feedback",
        description: "Section-wise suggestions for content improvement.",
    },
    {
        title: "Download Full Report",
        description: "PDF with scores, analysis, and tips for sharing.",
    },
    {
        title: "Fast & Accurate",
        description: "Save time with rapid and reliable AI analysis.",
    },
];

const Features = () => (
    <section className="bg-white py-16 px-4">
        <h2 className="text-3xl font-semibold text-center mb-10">Why Choose Our AI Resume Evaluator?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((f, i) => (
                <div key={i} className="p-6 border rounded-lg shadow-sm hover:shadow-lg transition">
                    <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                    <p className="text-gray-600">{f.description}</p>
                </div>
            ))}
        </div>
    </section>
);

export default Features;
