export function Textarea({ className = '', ...props }) {
    return (
        <textarea
            className={`w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            {...props}
        />
    );
}

export default Textarea;