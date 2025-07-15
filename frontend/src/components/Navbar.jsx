import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">AI Resume Evaluator</h1>
            <div className="space-x-4">
                <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                <Link to="/upload" className="text-gray-700 hover:text-blue-600">Upload Resume</Link>
                <Link to="/jd-match" className="hover:text-blue-600">JD Match</Link>
            </div>
        </nav>
    );
}

