// modules/render.js - DOM rendering functions

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Render task list to DOM
 * @param {HTMLElement} taskListElement - Container element
 * @param {Array} tasks - Array of tasks
 * @param {Function} onToggle - Toggle handler
 * @param {Function} onDelete - Delete handler
 */
export function renderTaskList(taskListElement, tasks, onToggle, onDelete) {
    // Clear existing content
    taskListElement.innerHTML = '';
    
    // Show empty state if no tasks
    if (tasks.length === 0) {
        taskListElement.innerHTML = `
            <li class="empty-state">
                <div class="empty-icon">📋</div>
                <p class="empty-text">No tasks yet!</p>
                <p class="empty-subtext">Add your first task above to get started</p>
            </li>
        `;
        return;
    }
    
    // Render each task
    tasks.forEach(task => {
        const taskElement = document.createElement('li');
        taskElement.className = `task ${task.completed ? 'completed' : ''}`;
        taskElement.dataset.id = task.id;
        
        taskElement.innerHTML = `
            <label class="task-label">
                <input 
                    type="checkbox" 
                    class="task-checkbox"
                    ${task.completed ? 'checked' : ''}
                    aria-label="Toggle task completion"
                >
                <span class="task-text">${escapeHTML(task.text)}</span>
            </label>
            <div class="task-actions">
                <button 
                    class="delete-btn" 
                    aria-label="Delete task"
                    title="Delete task"
                >
                    🗑️
                </button>
            </div>
        `;
        
        // Add event listeners
        const checkbox = taskElement.querySelector('.task-checkbox');
        const deleteBtn = taskElement.querySelector('.delete-btn');
        
        checkbox.addEventListener('change', () => onToggle(task.id));
        deleteBtn.addEventListener('click', () => onDelete(task.id));
        
        taskListElement.appendChild(taskElement);
    });
}

/**
 * Update task count display
 * @param {Array} tasks - Array of all tasks
 */
export function updateTaskCount(tasks) {
    const taskCountElement = document.getElementById('task-count');
    const activeCount = tasks.filter(t => !t.completed).length;
    const totalCount = tasks.length;
    
    taskCountElement.textContent = `${activeCount} active / ${totalCount} total`;
}
