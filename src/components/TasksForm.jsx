import { useState, useEffect } from 'react';

export function TasksForm({ onSubmit, initialTask, onClose }) {
    const [title, setTitle] = useState(initialTask?.title ?? '');
    const [description, setDescription] = useState(initialTask?.description ?? '');
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialTask) {
            setTitle(initialTask.title);
            setDescription(initialTask.description);
        }
    }, [initialTask]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setError('Title is required');
            return;
        }

        onSubmit({
            title: title.trim(),
            description: description.trim(),
            completed: initialTask?.completed ?? false,
        });

        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <label htmlFor="title" className='block text-sm font-medium text-primary dark:text-white'>
                    Title
                </label>
                <input
                    type="text"
                    id='title'
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        setError('');
                    }}
                    className='mt-1 block w-full rounded-md boder-secondary/20 dark:border-secondary/10 bg-white dark:bg-primary shadow-sm focus:border-primary dark:focus:border-primary focus:ring-primary dark:focus:ring-secondary dark:text-white sm:text-sm transition-colors'
                    placeholder='Enter task title'
                    />
                    {error && <p className='mt-1 text-sm text-red-600 dark:text-red-400'>{error}</p>}
            </div>

            <div>
                <label htmlFor="description" className='block text-sm font-medium text-primary dark:text-white'>
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className='mt-1 block w-full rounded-md border-secondary/20 dark:border-secondary/10 bg-white dark:bg-primary shadow-sm focus:border-primary dark:focus:border-secondary focus:ring-primary dark:focus:ring-secondary dark:text-white sm:text-sm transition-colors'
                    placeholder='Enter task description'
                    />
            </div>

            <div className='flex justify-end space-x-3'>
                <button
                    type="button"
                    onClick={onClose}
                    className='rounded-md border border-secondary/20 dark:border-secondary/10 bg-white dark:bg-primary px-4 py-2 text-sm font-medium text-primary dark:text-white hover:bg-accent/5 dark:hover:bg-secondary/5 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:ring-offset-2 dark:focus:ring-offset-primary transition-colors'
                >
                    Cancel
                </button>
                <button
                    type='submit'
                    className='rounded-md bg-primary dark:bg-secondary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover dark:hover:bg-secondary-hover focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:ring-offset-2 dark:focus:ring-offset-primary transition-colors'
                >
                    {initialTask ? 'Update' : 'Create'}
                </button>
            </div>
        </form>
    );
}