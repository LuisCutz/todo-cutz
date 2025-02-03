import { useState } from 'react'
import { useTasks } from './hooks/useTasks';
import { ListTodo } from 'lucide-react';
import { TasksForm } from './components/TasksForm';
import { TasksList } from './components/TasksList';
import { Modal } from './components/Modal';
import { DeleteConfirmation } from './components/DeleteConfirmation';


const FILTER_TABS = [
  { value: 'all', label: 'All tasks' },
  { value: 'pending', label: 'Pending'},
  { value: 'completed', label: 'Completed'},
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
      <div className='min-h-screen bg-gray-900'>
        <div className='mx-auto max-w-3xl px-4 py-12'>
          <div className='rounded-xl bg-gray-800 shadow-lg'>
            <div className='flex items-center justify-between border-b border-gray-700 p-6'>
              <div className='flex items-center gap-3'>
                <div className='rounded-lg bg-secondary p-2 text-white'>
                  <ListTodo className='h-6 w-6' />
                </div>
                <h1 className='text-xl font-semibold text-white'>Task manager</h1>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className='rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white hover:bg-secondary-hover focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors'
              >
                Add task
              </button>
            </div>

            <div className='mt-4 flex gap-1 border-b border-gray-700 px-6'>
              {FILTER_TABS.map(({ value, label}) => (
                <button
                  key={value}
                  onClick={() => setActiveFilter(value)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${activeFilter === value
                    ? 'border-b-2 border-secondary text-secondary'
                    : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))} 
            </div>

            <div className='p-6'>
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
          title={editingTask ? 'Edit task' : 'Add task'}
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