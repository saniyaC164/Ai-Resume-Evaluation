const steps = [
    { number: "1", title: "Upload Documents", desc: "Securely upload your resume and job description." },
    { number: "2", title: "AI Analysis", desc: "AI scans for match, gaps, and ATS compliance." },
    { number: "3", title: "Receive Report", desc: "Detailed scores and actionable feedback." },
    { number: "4", title: "Optimize & Apply", desc: "Use insights to improve and apply." },
];

const HowItWorks = () => (
    <section className="bg-gray-50 py-16 px-4 text-center">
        <h2 className="text-3xl font-semibold mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center">
                    <div className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full text-xl mb-4">{step.number}</div>
                    <h4 className="text-xl font-semibold">{step.title}</h4>
                    <p className="text-gray-600 mt-2 max-w-xs">{step.desc}</p>
                </div>
            ))}
        </div>
    </section>
);

export default HowItWorks;
