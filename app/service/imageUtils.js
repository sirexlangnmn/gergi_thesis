const path = require('path');

function sanitizeFileName(name) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

function getFileExtensionFromUrl(url) {
    const parts = url.split('.');
    return parts.length > 1 ? parts.pop().split(/[\?\#]/)[0] : ''; // Removes query params and fragments
}

module.exports = {
    sanitizeFileName,
    getFileExtensionFromUrl
};
