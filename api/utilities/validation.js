/**
 * Validates if the given date is in the 'YYYY-MM-DD' format.
 * @param {string} date - The date string to validate.
 * @returns {boolean} - True if the date is valid, false otherwise.
 */
function validateDate(date) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!date.match(regex)) {
    return false;
  }

  const [year, month, day] = date.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  return dateObj.getFullYear() === year && dateObj.getMonth() + 1 === month && dateObj.getDate() === day;
}

/**
 * Makes minor sanitation to the text string; character replacements and script tag removal. TODO: utilize a library to handle robust sanitations.
 * @param {string} notes - Notes text given by the user. 
 * @returns {string} - Sanitized string input.
 */
function sanitizeNotes(notes) {
  // Escape special HTML characters.
  notes = notes.replace(/&/g, '&amp;');
  notes = notes.replace(/</g, '&lt;');
  notes = notes.replace(/>/g, '&gt;');
  notes = notes.replace(/"/g, '&quot;');
  notes = notes.replace(/'/g, '&#x27;');

  return notes.replace(/<script.*?>.*?<\/script>/gi, '');
}

module.exports = {
  validateDate,
  sanitizeNotes
};