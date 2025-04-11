import React, { useState } from 'react';
import styles from './ToDo.module.css';
import { useTheme } from '../../../Theme/theme-provider.jsx';


function Todo (){
    const { theme } = useTheme();
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    const addTask = () => {
        if (task.trim()) {
            setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
            setTask('');
        }
    };

    const toggleTaskCompletion = (id) => {
        setTasks(tasks.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const removeTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

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
                        <span onClick={() => toggleTaskCompletion(task.id)}>{task.text}</span>
                        <button onClick={() => removeTask(task.id)} className={styles.removeButton}>
                            &#10005;
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;
