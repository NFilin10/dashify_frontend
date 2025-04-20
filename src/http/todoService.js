import axios from 'axios';

const API_URL = 'http://localhost:8080/api/widgets/todo';

const fetchTasks = async (todoListId) => {
    try {
        const response = await axios.get(`${API_URL}/get-tasks`, {
            params: { todo_list_id: todoListId },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks", error);
        throw error;
    }
};

const addTask = async (todoListId, task) => {
    try {
        const response = await axios.post(
            `${API_URL}/add-task`,
            { todo_list_id: todoListId, task },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error("Add task failed:", error);
        throw error;
    }
};

const toggleTaskCompletion = async (taskId) => {
    try {
        const response = await axios.put(
            `${API_URL}/complete-task`,
            { task_id: taskId },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error("Toggle task completion failed:", error);
        throw error;
    }
};

const removeTask = async (taskId) => {
    try {
        const response = await axios.delete(
            `${API_URL}/delete-task`,
            {
                data: { task_id: taskId },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Delete task failed:", error);
        throw error;
    }
};

export { fetchTasks, addTask, toggleTaskCompletion, removeTask };
