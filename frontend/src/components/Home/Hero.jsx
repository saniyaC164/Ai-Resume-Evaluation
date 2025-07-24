import { useNavigate } from 'react-router-dom';
import illustration from '../assets/illustration.png';

const Hero = () => {
    const navigate = useNavigate();
    return (
        <section className="text-center py-16 bg-gray-50">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Unlock Your Career Potential with AI‑Powered Resume Evaluation
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-gray-600 mb-6">
                Optimize your resume for any job description, ensuring you stand out to recruiters and ATS systems.
            </p>
            <div className="space-x-4">
                <button
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                    onClick={() => navigate('/upload')}
                >
                    Get Started Free
                </button>
                <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50">
                    <a href='#features'>Learn More</a>
                </button>
            </div>
            <img
                src={illustration}
                alt="Illustration"
                className="mt-12 w-full max-w-4xl mx-auto rounded-xl"
            />
        </section>
    );
};

export default Hero;
