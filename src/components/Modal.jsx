import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Portal } from "./Portal";

export function Modal({ isOpen, onClose, title, children }) {
    const [isClosing, setIsClosing] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const [currentTitle, setCurrentTitle] = useState(title);

    useEffect(() => {
        if (isOpen) {
            setIsClosing(false);
            setShouldRender(true);
            setCurrentTitle(title);
            document.body.style.overflow = 'hidden';
        } else if (shouldRender) {
            setIsClosing(true);
            const timer = setTimeout(() => {
                setShouldRender(false);
                document.body.style.overflow = 'unset';
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [isOpen, title]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!shouldRender) return null;

    return (
        <Portal>
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div
                    className={`fixed inset-0 bg-black/50 backdrop-blur-sm ${
                        isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
                    }`}
                    onClick={onClose}
                />
                <div className={`relative w-full max-w-lg rounded-lg bg-gray-800 p-6 shadow-xl ${
                    isClosing ? 'animate-slideUp' : 'animate-slideDown'
                }`}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-white">{currentTitle}</h2>
                        <button
                            onClick={onClose}
                            className="rounded-full p-1 hover:bg-gray-700 transition-colors"
                        >
                            <X className="h-5 w-5 text-gray-400" />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </Portal>
    );
}