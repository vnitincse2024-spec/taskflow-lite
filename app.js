// app.js - Main application entry point
import { loadTasks, saveTasks } from './modules/storage.js';
import { renderTaskList, updateTaskCount } from './modules/render.js';
import { validateTaskInput } from './modules/validation.js';

// Application State
let tasks = loadTasks();
let currentFilter = 'all';

// DOM Elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('theme-toggle');
const charCount = document.getElementById('char-count');
const validationMessage = document.getElementById('validation-message');

// Task Factory
function createTask(text) {
    return {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    };
}

// Get Filtered Tasks
function getFilteredTasks() {
    switch(currentFilter) {
        case 'active':
            return tasks.filter(task => !task.completed);
        case 'completed':
            return tasks.filter(task => task.completed);
        default:
            return tasks;
    }
}

// Render Application
function render() {
    const filteredTasks = getFilteredTasks();
    renderTaskList(taskList, filteredTasks, handleToggle, handleDelete);
    updateTaskCount(tasks);
}

// Event Handlers
function handleAddTask(e) {
    e.preventDefault();
    
    const validation = validateTaskInput(taskInput.value);
    
    if (!validation.isValid) {
        validationMessage.textContent = validation.message;
        validationMessage.classList.add('error');
        return;
    }
    
    validationMessage.textContent = '';
    validationMessage.classList.remove('error');
    
    tasks.push(createTask(taskInput.value));
    saveTasks(tasks);
    taskInput.value = '';
    charCount.textContent = '0';
    render();
}

function handleToggle(taskId) {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        saveTasks(tasks);
        render();
    }
}

function handleDelete(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    saveTasks(tasks);
    render();
}

function handleFilterChange(e) {
    if (!e.target.classList.contains('filter-btn')) return;
    
    filterBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    currentFilter = e.target.dataset.filter;
    render();
}

function handleCharCount() {
    charCount.textContent = taskInput.value.length;
}

function handleThemeToggle() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.querySelector('.theme-icon').textContent = isDark ? '☀️' : '🌙';
}

// Event Listeners
taskForm.addEventListener('submit', handleAddTask);
taskInput.addEventListener('input', handleCharCount);
themeToggle.addEventListener('click', handleThemeToggle);

// Filter Controls Event Delegation
document.querySelector('.filter-controls').addEventListener('click', handleFilterChange);

// Initialize Theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.querySelector('.theme-icon').textContent = '☀️';
}

// Initial Render
render();

console.log('%cTaskFlow Lite loaded successfully!', 'color: #4CAF50; font-weight: bold;');
