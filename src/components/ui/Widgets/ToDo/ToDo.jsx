import React, { useEffect, useState } from 'react';
import styles from './ToDo.module.css';
import { useTheme } from '../../../Theme/theme-provider.jsx';

function Todo({ id: todo_list_id }) {
    const { theme } = useTheme();
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await fetch(`http://localhost:8080/widgets/todo/get-tasks?todo_list_id=${todo_list_id}`, {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setTasks(data);
            } else {
                console.error("Error fetching tasks");
            }
        } catch (error) {
            console.error("Fetch failed:", error);
        }
    };

    const addTask = async () => {
        if (!task.trim()) return;
        try {
            const response = await fetch('http://localhost:8080/widgets/todo/add-task', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ todo_list_id, task })
            });

            if (response.ok) {
                setTask('');
                fetchTasks();
            }
        } catch (error) {
            console.error("Add task failed:", error);
        }
    };

    const toggleTaskCompletion = async (task_id) => {
        try {
            const response = await fetch('http://localhost:8080/widgets/todo/complete-task', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ task_id })
            });

            if (response.ok) {
                fetchTasks();
            }
        } catch (error) {
            console.error("Toggle task failed:", error);
        }
    };

    const removeTask = async (task_id) => {
        try {
            const response = await fetch('http://localhost:8080/widgets/todo/delete-task', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ task_id })
            });

            if (response.ok) {
                fetchTasks();
            }
        } catch (error) {
            console.error("Delete task failed:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [todo_list_id]);

    return (
        <div className={`${styles.todoWidget} ${theme === 'dark' ? styles.dark : ''}`}>
            <h3>Todo List</h3>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new task"
                className={styles.input}
            />
            <button onClick={addTask} className={styles.addButton}>
                Add Task
            </button>
            <ul className={styles.taskList}>
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className={`${styles.task} ${task.completed ? styles.completed : ''}`}
                    >
                        <span onClick={() => toggleTaskCompletion(task.id)}>{task.task}</span>
                        <button onClick={() => removeTask(task.id)} className={styles.removeButton}>
                            &#10005;
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todo;
