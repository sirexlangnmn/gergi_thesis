'use strict'; // https://www.w3schools.com/js/js_strict.asp

let location_hostname = location.hostname;
let host = '';

if (location_hostname === 'localhost') {
    host = 'http://' + location_hostname + ':' + 3000;
}

if (location.hostname === 'www.gergi.app' || location.hostname === 'gergi.app' || location.hostname.endsWith('.gergi.app')) {
    host = 'https://' + location_hostname;
}

function getId(id) {
    return document.getElementById(id);
}

function getSl(selector) {
    return document.querySelector(selector);
}

function getEcN(className) {
    return document.getElementsByClassName(className);
}
