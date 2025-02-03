import { useEffect, useState } from "react";
import { X } from "lucide-react"
import { createPortal } from "react-dom";

const modalRoot = document.getElementById('modal-root');

export function Modal({ isOpen, onClose, title, children }) {
    const [isClosing, setIsClosing] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsClosing(false);
            setShouldRender(true);
            document.body.style.overflow = 'hidden';
        } else if (shouldRender) {
            setIsClosing(true);
            const timer = setTimeout(() => {
                setShouldRender(false);
                document.body.style.overflow = 'unset';
            }, 200); // Duración de la animación
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

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

    const modal = (
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
                    <h2 className="text-xl font-semibold text-white">{title}</h2>
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
    );

    return createPortal(modal, modalRoot);
}