import { AlertTriangle } from "lucide-react";
import { TasksList } from "./TasksList";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById('modal-root');

export function DeleteConfirmation({ isOpen, task, onConfirm, onCancel}) {
    if (!isOpen || !task) return null;

    const modal = (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onCancel}
            />
            <div className="relative w-full max-w-lg rounded-lg bg-gray-800 p-6 shadow-xl transition-all">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-red-400">
                        <AlertTriangle className="h-5 w-5" />
                        <span className="text-lg font-medium">Delete task</span>
                    </div>

                    <p>
                        Are you sure you want to delete the task <span className="font-medium">"{TasksList.title}"</span>? This action cannot be undone.
                    </p>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            onClick={onCancel}
                            className="rounded-md border border-gray-600 bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modal, modalRoot);
}