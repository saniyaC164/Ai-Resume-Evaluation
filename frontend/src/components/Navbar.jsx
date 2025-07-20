import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">AI Resume Evaluator</h1>
            <ul className="flex space-x-6 text-gray-700 font-medium">
                <li><Link to="/">Home</Link></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#about">About</a></li>
                <li><Link to="#">Contact</Link></li>
            </ul>
        </nav>
    );
}