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
            setError('Por favor, ingresa un título para la tarea');
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
                <label htmlFor="title" className='block text-sm font-medium text-white'>
                    Título
                </label>
                <input
                    type="text"
                    id='title'
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        setError('');
                    }}
                    className='mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors'
                    placeholder='Ejemplo: Responder correos pendientes'
                />
                {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
            </div>

            <div>
                <label htmlFor="description" className='block text-sm font-medium text-white'>
                    Descripción
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className='mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors'
                    placeholder='Ejemplo: Responder a los correos importantes antes de las 3 p.m.'
                />
            </div>

            <div className='flex justify-end space-x-3 pt-2'>
                <button
                    type="button"
                    onClick={onClose}
                    className='rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200'
                >
                    Cancelar
                </button>
                <button
                    type='submit'
                    className='rounded-md bg-secondary-secondary px-4 py-2 text-sm font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200'
                >
                    {initialTask ? 'Guardar' : 'Crear'}
                </button>
            </div>
        </form>
    );
}