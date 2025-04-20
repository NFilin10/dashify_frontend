import { useState, useEffect } from 'react';
import { fetchTasks, addTask, toggleTaskCompletion, removeTask } from '@/http/todoService.js'; // API calls

export function useTodo(todoListId) {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    const loadTasks = async () => {
        try {
            const data = await fetchTasks(todoListId);
            setTasks(data);
        } catch (err) {
            console.error("Error loading tasks:", err);
        }
    };

    const handleAddTask = async () => {
        if (!task.trim()) return;
        try {
            await addTask(todoListId, task);
            setTask('');
            loadTasks();
        } catch (err) {
            console.error("Error adding task:", err);
        }
    };

    const handleToggleCompletion = async (taskId) => {
        try {
            await toggleTaskCompletion(taskId);
            loadTasks();
        } catch (err) {
            console.error("Error toggling task completion:", err);
        }
    };

    const handleRemoveTask = async (taskId) => {
        try {
            await removeTask(taskId);
            loadTasks();
        } catch (err) {
            console.error("Error removing task:", err);
        }
    };

    useEffect(() => {
        loadTasks();
    }, [todoListId]);

    return { task, setTask, tasks, handleAddTask, handleToggleCompletion, handleRemoveTask };
}
