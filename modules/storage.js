// modules/storage.js - localStorage abstraction

const STORAGE_KEY = 'taskflow_tasks';

/**
 * Save tasks to localStorage
 * @param {Array} tasks - Array of task objects
 */
export const saveTasks = (tasks) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
    }
};

/**
 * Load tasks from localStorage
 * @returns {Array} Array of task objects
 */
export const loadTasks = () => {
    try {
        const tasksJSON = localStorage.getItem(STORAGE_KEY);
        return tasksJSON ? JSON.parse(tasksJSON) : [];
    } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
        return [];
    }
};

/**
 * Clear all tasks from localStorage
 */
export const clearTasks = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing tasks from localStorage:', error);
    }
};
