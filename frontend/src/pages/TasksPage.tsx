import React, { useEffect, useState } from 'react';
import TaskForm from '../components/Tasks/TaskForm';
import TaskList from '../components/Tasks/TaskList';
import { getTasks } from '../services/api';

const TasksPage: React.FC = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const fetchedTasks = await getTasks();
            setTasks(fetchedTasks);
        };

        fetchTasks();
    }, []);

    return (
        <div>
            <h1>Task Management</h1>
            <TaskForm />
            <TaskList tasks={tasks} />
        </div>
    );
};

export default TasksPage;