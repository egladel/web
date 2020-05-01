const year = document.getElementById('year');
const month = document.getElementById('month');
const day = document.getElementById('day');
const hour = document.getElementById('hour');
const minute = document.getElementById('minute');
const second = document.getElementById('second');
const weekday = document.getElementById('weekday');

const week = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');


function setTody() {
    const now = new Date();

    year.value = now.getFullYear();
    day.value = now.getDate();
    hour.value = now.getHours();
    minute.value = now.getMinutes();
    second.value = now.getSeconds();
    weekday.value = week[now.getDay()];
}

function init() {
    setTody();
}

init();