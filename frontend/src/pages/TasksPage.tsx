import React, { useEffect, useState } from 'react';
import TaskForm from '../components/Tasks/TaskForm';
import TaskList from '../components/Tasks/TaskList';
import { getTasks, createTask, deleteTask, toggleTaskCompletion, Task, TaskCreateData } from '../services/tasks';

const TasksPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const fetchedTasks = await getTasks();
                setTasks(fetchedTasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleCreateTask = async (taskData: TaskCreateData) => {
        try {
            const newTask = await createTask(taskData);
            setTasks([...tasks, newTask]);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleToggleComplete = async (taskId: string, isComplete: boolean) => {
        try {
            const updatedTask = await toggleTaskCompletion(taskId, isComplete);
            setTasks(tasks.map(task => 
                task.id === taskId ? updatedTask : task
            ));
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    if (loading) {
        return <div>Loading tasks...</div>;
    }

    return (
        <div>
            <h1>Task Management</h1>
            <TaskForm onSubmit={handleCreateTask} />
            <TaskList 
                tasks={tasks} 
                onDelete={handleDeleteTask} 
                onToggleComplete={handleToggleComplete} 
            />
        </div>
    );
};

export default TasksPage;