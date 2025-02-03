import { CheckCircle, Circle, Pencil, Trash2 } from "lucide-react"; 

export function TasksList({ tasks, onToggleTask, onEditTask, onDeleteTask }) {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-primary/60 dark:text-white/60">No tasks found</p>
            </div>
        );
    }

    return (
        <ul className="space-y-3">
            {tasks.map((task) => (
                <li
                    key={task.id}
                    className="group flex items-start gap-3 rounded-lg boder dark:border-secondary/10 p-4 hover:bg-secondary/5 transition-colors"
                >
                    <button
                        onClick={() => onToggleTask(task.id)}
                        className="mt-1 text-secondary hover:text-tertiary-hover transition-colors"
                    >
                        {task.completed ? (
                            <CheckCircle className="h-6 w-6 text-tertiary hover:text-secondary transition-colors" />
                        ) : (
                            <Circle className="h-6 w-6" />
                        )}
                    </button>

                    <div className="flex-1 min-w-0">
                        <h3 className={`font-medium ${
                            task.completed
                            ? 'line-through text-primary/40 dark:text-white/40'
                            : 'text-primary dark:text-white'
                        }`}>
                            {task.title}
                        </h3>
                        {task.description && (
                            <p className={`mt-1 text-sm ${
                                task.completed
                                ? 'text-primary/30 dark:text-white/30'
                                : 'text-primary/60 dark:text-white/60'
                            }`}>
                                {task.description}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => onEditTask(task)}
                            className="rounded p-1 hover:bg-accent/10 dark:hover:bg-secondary/10 text-primary/40 dark:text-white/40 hover:text-primary dark:hover:text-secondary transition-colors"
                        >
                            <Pencil className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => onDeleteTask(task)}
                            className="rounded p-1 hover:bg-accent/10 dark:hover:bg-secondary/10 text-primary/40 dark:text-white/40 hover:text-red-500 transition-colors"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}