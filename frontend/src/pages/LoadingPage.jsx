// Loading.jsx
import { Loader2 } from "lucide-react";

export default function LoadingScreen() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <Loader2 className="animate-spin mx-auto text-blue-500" size={48} />
                <h2 className="text-xl mt-4 font-semibold text-gray-700">Processing your resume...</h2>
                <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
            </div>
        </div>
    );
}
