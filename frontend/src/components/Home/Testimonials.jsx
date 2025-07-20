const testimonials = [
    {
        name: "Jane Doe",
        title: "Marketing Specialist",
        feedback: "This tool is a game-changer! I used to spend hours tweaking my resume, now I get instant feedback and landed interviews fast.",
    },
    {
        name: "John Smith",
        title: "Software Engineer",
        feedback: "The ATS compliance check was invaluable. I had no idea my resume was being filtered out!",
    },
    {
        name: "Emily White",
        title: "Project Manager",
        feedback: "I love the skill analysis. It helped me tailor my resume to each job. Highly recommend!",
    },
];

const Testimonials = () => (
    <section className="bg-white py-16 px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
                <div key={i} className="p-6 border rounded-lg shadow">
                    <p className="text-gray-700 italic mb-4">"{t.feedback}"</p>
                    <h4 className="font-semibold">{t.name}</h4>
                    <p className="text-sm text-gray-500">{t.title}</p>
                </div>
            ))}
        </div>
    </section>
);

export default Testimonials;
