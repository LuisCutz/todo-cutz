import { CheckCircle, Circle, Pencil, Trash2 } from "lucide-react"; 

export function TasksList({ tasks, onToggleTask, onEditTask, onDeleteTask }) {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-12 animate-fadeIn">
                <p className="text-gray-400">No se encontraron tareas</p>
            </div>
        );
    }

    return (
        <ul className="space-y-3">
            {tasks.map((task) => (
                <li
                    key={task.id}
                    className="group flex items-start gap-3 rounded-lg border border-gray-700 p-4 hover:bg-gray-700/30 transition-all duration-200 animate-slideDown"
                >
                    <button
                        onClick={() => onToggleTask(task.id)}
                        className="mt-1 text-gray-400 hover:text-secondary transition-all duration-200"
                    >
                        {task.completed ? (
                            <CheckCircle className="h-6 w-6 text-secondary hover:text-secondary-secondary transition-colors" />
                        ) : (
                            <Circle className="h-6 w-6" />
                        )}
                    </button>

                    <div className="flex-1 min-w-0">
                        <h3 className={`font-medium ${
                            task.completed
                            ? 'line-through text-gray-500'
                            : 'text-white'
                        } transition-all duration-200`}>
                            {task.title}
                        </h3>
                        {task.description && (
                            <p className={`mt-1 text-sm ${
                                task.completed
                                ? 'text-gray-600'
                                : 'text-gray-400'
                            } transition-all duration-200`}>
                                {task.description}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                        <button
                            onClick={() => onEditTask(task)}
                            className="rounded-full p-1.5 hover:bg-gray-600 text-gray-400 hover:text-white transition-all duration-200"
                        >
                            <Pencil className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => onDeleteTask(task)}
                            className="rounded-full p-1.5 hover:bg-red-500/20 text-gray-400 hover:text-red-500 transition-all duration-200"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}