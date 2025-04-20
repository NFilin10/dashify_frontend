import React from 'react';
import styles from './ToDo.module.css';
import { useTheme } from '../../../Theme/theme-provider.jsx';
import { useTodo } from '@/hooks/useTodo.js'; // Use custom hook

function Todo({ widget_id: todo_list_id }) {
    const { theme } = useTheme();
    const { task, setTask, tasks, handleAddTask, handleToggleCompletion, handleRemoveTask } = useTodo(todo_list_id);

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
            <button onClick={handleAddTask} className={styles.addButton}>
                Add Task
            </button>
            <ul className={styles.taskList}>
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className={`${styles.task} ${task.completed ? styles.completed : ''}`}
                    >
                        <span onClick={() => handleToggleCompletion(task.id)}>{task.task}</span>
                        <button onClick={() => handleRemoveTask(task.id)} className={styles.removeButton}>
                            &#10005;
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todo;
