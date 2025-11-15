// modules/validation.js - Form validation logic

const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

/**
 * Validate task input
 * @param {string} value - Task input value
 * @returns {Object} Validation result with isValid and message
 */
export function validateTaskInput(value) {
    const trimmedValue = value.trim();
    
    // Check if empty
    if (trimmedValue.length === 0) {
        return {
            isValid: false,
            message: 'Task cannot be empty!'
        };
    }
    
    // Check minimum length
    if (trimmedValue.length < MIN_LENGTH) {
        return {
            isValid: false,
            message: `Task must be at least ${MIN_LENGTH} character long`
        };
    }
    
    // Check maximum length
    if (trimmedValue.length > MAX_LENGTH) {
        return {
            isValid: false,
            message: `Task must not exceed ${MAX_LENGTH} characters`
        };
    }
    
    // All validations passed
    return {
        isValid: true,
        message: ''
    };
}
