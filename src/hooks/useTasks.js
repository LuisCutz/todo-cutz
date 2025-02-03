import { useState, useEffect } from "react";

const STORAGE_KEY = 'tasks';

export function useTasks() {
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem(STORAGE_KEY);
        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task) => {
        setTasks((prev) => [
            {
                ...task,
                id: crypto.randomUUID(),
            },
            ...prev,
        ]);
    };

    const updateTask = (taskId, updates) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId ? { ...task, ...updates } : task
            )
        );
    };

    const deleteTask = (taskId) => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
    };

    const toggleTask = (taskId) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return {
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
    };
}