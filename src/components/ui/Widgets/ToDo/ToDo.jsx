import React, { useState } from 'react';
import styles from './ToDo.module.css';
import { useTheme } from '../../../Theme/theme-provider.jsx';

const Todo = () => {
    const { theme } = useTheme();
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    const addTask = () => {
        if (task.trim()) {
            setTasks([
                ...tasks,
                { id: Date.now(), text: task, completed: false },
            ]);
            setTask('');
        }
    };

    const toggleTaskCompletion = (id) => {
        setTasks(
            tasks.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        );
    };

    const removeTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const themeStyles = {
        '--bg-color': theme === 'dark' ? '#1e1e1e' : '#fff',
        '--text-color': theme === 'dark' ? '#f5f5f5' : '#333',
        '--task-bg': theme === 'dark' ? '#2a2a2a' : '#f9f9f9',
        '--task-completed-bg': theme === 'dark' ? '#333' : '#eaeaea',
        '--button-bg': theme === 'dark' ? '#333' : '#f0f0f0',
        '--button-hover-bg': theme === 'dark' ? '#444' : '#e0e0e0',
        '--button-text': theme === 'dark' ? '#f5f5f5' : '#333',
        '--input-bg': theme === 'dark' ? '#3a3a3a' : '#f0f0f0',
    };

    return (
        <div className={styles.todoWidget} style={themeStyles}>
            <h3>Todo List</h3>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new task"
                className={styles.input}
                style={{ backgroundColor: themeStyles['--input-bg'] }}
            />
            <button onClick={addTask} className={styles.addButton}>
                Add Task
            </button>
            <ul className={styles.taskList}>
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className={`${styles.task} ${
                            task.completed ? styles.completed : ''
                        }`}
                        style={{
                            backgroundColor: task.completed
                                ? themeStyles['--task-completed-bg']
                                : themeStyles['--task-bg'],
                        }}
                    >
                        <span onClick={() => toggleTaskCompletion(task.id)}>
                            {task.text}
                        </span>
                        <button
                            onClick={() => removeTask(task.id)}
                            className={styles.removeButton}
                        >
                            &#10005;
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;
