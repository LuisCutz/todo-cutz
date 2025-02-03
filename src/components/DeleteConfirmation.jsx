import { AlertTriangle } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const modalRoot = document.getElementById('modal-root');

export function DeleteConfirmation({ isOpen, task, onConfirm, onCancel}) {
    const [isClosing, setIsClosing] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (isOpen && task) {
            setIsClosing(false);
            setShouldRender(true);
        } else if (shouldRender) {
            setIsClosing(true);
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, 200); // Duración de la animación
            return () => clearTimeout(timer);
        }
    }, [isOpen, task]);

    if (!shouldRender || !task) return null;

    const modal = (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm ${
                    isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
                }`}
                onClick={onCancel}
            />
            <div className={`relative w-full max-w-lg rounded-lg bg-gray-800 p-6 shadow-xl ${
                isClosing ? 'animate-slideUp' : 'animate-slideDown'
            }`}>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-red-400">
                        <AlertTriangle className="h-5 w-5" />
                        <span className="text-lg font-medium">Eliminar tarea</span>
                    </div>

                    <p className="text-gray-300">
                        ¿Seguro que deseas eliminar la tarea <span className="font-medium text-white">"{task.title}"</span>? Esta acción no se puede deshacer.
                    </p>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            onClick={onCancel}
                            className="rounded-md border border-gray-600 bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={onConfirm}
                            className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modal, modalRoot);
}