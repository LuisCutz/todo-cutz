import { useState } from 'react'
import { useTasks } from './hooks/useTasks';
import { ListTodo } from 'lucide-react';
import { TasksForm } from './components/TasksForm';
import { TasksList } from './components/TasksList';
import { Modal } from './components/Modal';
import { DeleteConfirmation } from './components/DeleteConfirmation';
import toDoCutzLogo from './assets/toDoCutzLogo.svg';

const FILTER_TABS = [
  { value: 'all', label: 'Todas' },
  { value: 'pending', label: 'Pendientes'},
  { value: 'completed', label: 'Completadas'},
];

function App() {
  const { tasks, addTask, updateTask, deleteTask, toggleTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(undefined);
  const [deletingTask, setDeletingTask] = useState(undefined);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredTasks = tasks.filter((task) => {
    switch (activeFilter) {
      case 'pending':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (task) => {
    setDeletingTask(task);
  };

  const handleConfirmDelete = () => {
    if (deletingTask) {
      deleteTask(deletingTask.id);
      setDeletingTask(undefined);
    }
  };

  const handleSubmit = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(undefined);
  }

  return (
    <>
      <div className='min-h-screen bg-gray-900 px-4 py-8 md:py-12'>
        <div className='mx-auto max-w-3xl'>
          <div className='rounded-xl bg-gray-800 shadow-lg overflow-hidden animate-fadeIn'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-700 p-4 sm:p-6'>
              <div className='flex items-center justify-center sm:justify-start gap-3 mb-4 sm:mb-0 w-full sm:w-auto'>
                <div className='rounded-lg bg-gray-700/50 p-2'>
                  <img src={toDoCutzLogo} alt="toDoCutz logo" className='w-32 sm:w-40' />
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className='w-full sm:w-auto rounded-lg bg-secondary-secondary px-4 py-2 text-sm font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-105'
              >
                Agregar tarea
              </button>
            </div>

            <div className='mt-4 flex items-center justify-center sm:justify-start gap-1 border-b border-gray-700 px-4 sm:px-6 overflow-x-auto'>
              {FILTER_TABS.map(({ value, label}) => (
                <button
                  key={value}
                  onClick={() => setActiveFilter(value)}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    activeFilter === value
                      ? 'border-b-2 border-secondary text-secondary'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-t-lg'
                  }`}
                >
                  {label}
                </button>
              ))} 
            </div>

            <div className='p-4 sm:p-6'>
              <TasksList
                tasks={filteredTasks}
                onToggleTask={toggleTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingTask ? 'Editar tarea' : 'Agregar tarea'}
        >
          <TasksForm
            onSubmit={handleSubmit}
            initialTask={editingTask}
            onClose={handleCloseModal}
          />
        </Modal>

        <DeleteConfirmation
          isOpen={!!deletingTask}
          task={deletingTask}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingTask(undefined)}
        />
      </div>
    </>
  );
}

export default App