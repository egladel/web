const yearEl = document.getElementById("yearEl");
const monthEl = document.getElementById("monthEl");
const dayEl = document.getElementById("dayEl");
const hourEl = document.getElementById("hourEl");
const minuteEl = document.getElementById("minuteEl");
const secondEl = document.getElementById("secondEl");
const weekdayEl = document.getElementById("weekdayEl");
const leapEl = document.getElementById("leapEl");
const sexagenaryEl = document.getElementById("sexagenaryEl");

const week = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
const NORMAL_YEAR = "Normal year";
const LEAP_YEAR = "Leap year";
const celestialStem = new Array(
	{ cn: "癸", kr: "계" },
	{ cn: "甲", kr: "갑" },
	{ cn: "乙", kr: "을" },
	{ cn: "丙", kr: "병" },
	{ cn: "丁", kr: "정" },
	{ cn: "戊", kr: "무" },
	{ cn: "己", kr: "기" },
	{ cn: "庚", kr: "경" },
	{ cn: "辛", kr: "신" },
	{ cn: "壬", kr: "임" }
);

const earthlyBranches = new Array(
	{ cn: "亥", kr: "해", zodiac: "돼지" },
	{ cn: "子", kr: "자", zodiac: "쥐" },
	{ cn: "丑", kr: "축", zodiac: "소" },
	{ cn: "寅", kr: "인", zodiac: "범" },
	{ cn: "卯", kr: "묘", zodiac: "토끼" },
	{ cn: "辰", kr: "진", zodiac: "용" },
	{ cn: "巳", kr: "사", zodiac: "뱀" },
	{ cn: "午", kr: "오", zodiac: "말" },
	{ cn: "未", kr: "미", zodiac: "양" },
	{ cn: "申", kr: "신", zodiac: "원숭이" },
	{ cn: "酉", kr: "유", zodiac: "닭" },
	{ cn: "戌", kr: "술", zodiac: "개" }
);

const LESS_THAN = "<";
const GREATER_THAN = ">";
const UNIT = 1;
const FIRST = 1;
const LAST_MONTH = 12;

function setCalendar(dateObj) {
	setYear(dateObj.year);
	setMonth(dateObj.month);
	setDay(dateObj.day);
	setTime(dateObj.hour, dateObj.minute, dateObj.second);
}

function setCalendarOther() {
	setWeekday();
	setLeap();
	setSexagenary();
}

// Gregorian Date Year Setting
function setYear(value) {
	yearEl.value = value;
}

// Gregorian Date Month Setting
function setMonth(value) {
	for (i = 0; i < monthEl.options.length; i++) {
		if (monthEl.options[i].value === value.toString()) {
			monthEl.options[i].selected = "selected";
		}
	}
}

// Gregorian Date Day Setting
function setDay(value) {
	dayEl.value = value;
}

// Gregorian Date Leap or Normal setting
function setLeap() {
	let year = parseInt(yearEl.value);
	if (year < 0) year++;

	console.log(year);

	if ((calMod(year, 4) === 0 && calMod(year, 100) !== 0) || calMod(year, 400) === 0) {
		leapEl.value = LEAP_YEAR;
	} else {
		leapEl.value = NORMAL_YEAR;
	}
}

// Gregorian Date Time Setting
function setTime(hour, minute, second) {
	hourEl.value = hour < 10 ? `0${hour}` : hour;
	minuteEl.value = minute < 10 ? `0${minute}` : minute;
	secondEl.value = second < 10 ? `0${second}` : second;
}

// Gregorian Date Weekday setting
function setWeekday() {
	const value = new Date(yearEl.value, parseInt(monthEl.value) - 1, dayEl.value);
	weekdayEl.value = week[value.getDay()];
}

// Gregorian Date Year Change
function changeYear(element, action) {
	const units = element === CENTURY ? 100 : UNIT;
	const year = parseInt(yearEl.value);
	if (action === LESS_THAN) {
		if (year - units === 0) {
			yearEl.value = year - units - UNIT;
		} else {
			yearEl.value = year - units;
		}
	} else {
		if (year + units === 0) {
			yearEl.value = year + units + UNIT;
		} else {
			yearEl.value = year + units;
		}
	}
}

// Gregorian Date Month Change
function changeMonth(action) {
	const year = parseInt(yearEl.value);
	const month = parseInt(monthEl.value);
	if (action === LESS_THAN) {
		monthEl.value = month - UNIT;
		if (monthEl.value === "") {
			monthEl.value = LAST_MONTH;
			if (year - UNIT === 0) {
				yearEl.value = year - UNIT - 1;
			} else {
				yearEl.value = year - UNIT;
			}
		}
	} else {
		monthEl.value = month + UNIT;
		if (monthEl.value === "") {
			monthEl.value = FIRST;
			if (year + UNIT === 0) {
				yearEl.value = year + UNIT + 1;
			} else {
				yearEl.value = year + UNIT;
			}
		}
	}
}

// Gregorian Date Day Change
function changeDay(action) {
	const day = parseInt(dayEl.value);
	const month = parseInt(monthEl.value);
	const year = parseInt(yearEl.value);
	const lastDay = calLastDay(month);

	if (action === LESS_THAN) {
		if (day - UNIT === 0) {
			dayEl.value = calLastDay(month - UNIT);
			if (month - UNIT === 0) {
				monthEl.value = LAST_MONTH;
				if (year - UNIT === 0) {
					yearEl.value = year - UNIT - 1;
				} else {
					yearEl.value = year - UNIT;
				}
			} else {
				monthEl.value = month - UNIT;
			}
		} else {
			dayEl.value = day - UNIT;
		}
	} else {
		if (day === lastDay) {
			dayEl.value = FIRST;
			if (month === LAST_MONTH) {
				monthEl.value = FIRST;
				if (year + UNIT === 0) {
					yearEl.value = year + UNIT + 1;
				} else {
					yearEl.value = year + UNIT;
				}
			} else {
				monthEl.value = month + UNIT;
			}
		} else {
			dayEl.value = day + UNIT;
		}
	}
}

function calLastDay(month) {
	switch (month) {
		case 2:
			lastDay = leapEl.value === LEAP_YEAR ? 29 : 28;
			break;
		case 4:
		case 6:
		case 9:
		case 11:
			lastDay = 30;
			break;
		default:
			lastDay = 31;
			break;
	}
	return lastDay;
}

function setSexagenary() {
	const year = parseInt(yearEl.value);
	const { celestial, earthly } = getSexagenary(year);

	const sexagenary = `${celestialStem[celestial].cn}${earthlyBranches[earthly].cn}(${celestialStem[celestial].kr}${earthlyBranches[earthly].kr})년, ${earthlyBranches[earthly].zodiac}띠`;
	sexagenaryEl.value = sexagenary;
}

function getSexagenary(year) {
	const units = 3;
	const CELESTIAL_LEN = celestialStem.length;
	const EARTHLY_LEN = earthlyBranches.length;
	const SIXTY = CELESTIAL_LEN * EARTHLY_LEN;
	let celestial;
	let earthly;

	if (year < 0) {
		celestial = calMod(year - units + 1, CELESTIAL_LEN);
		earthly = calMod(calMod(year - units + 1, SIXTY), EARTHLY_LEN);
	} else {
		celestial = calMod(year - units, CELESTIAL_LEN);
		earthly = calMod(calMod(year - units, SIXTY), EARTHLY_LEN);
	}
	return {
		celestial,
		earthly,
	};
}

function calMod(dividend, divisor) {
	return ((dividend % divisor) + divisor) % divisor;
}

function getCycle() {
	const CELESTIAL_LEN = celestialStem.length;
	const EARTHLY_LEN = earthlyBranches.length;
	const cycle = new Array();
	let celestialCnt = 0;
	let earthlyCnt = 0;
	let cycleObj = new Object();
	for (let i = 0; i < 60; i++) {
		celestialCnt++;
		earthlyCnt++;
		cycleObj.cNo = calMod(celestialCnt, CELESTIAL_LEN);
		cycleObj.eNo = calMod(earthlyCnt, EARTHLY_LEN);
		cycleObj.sexagenary = `${celestialStem[calMod(celestialCnt, CELESTIAL_LEN)].cn}${earthlyBranches[calMod(earthlyCnt, EARTHLY_LEN)].cn}(${
			celestialStem[calMod(celestialCnt, CELESTIAL_LEN)].kr
		}${earthlyBranches[calMod(earthlyCnt, EARTHLY_LEN)].kr})`;
		cycleObj.zodiac = earthlyBranches[calMod(earthlyCnt, EARTHLY_LEN)].zodiac;

		cycle.push(cycleObj);
		cycleObj = new Object();

		if (celestialCnt === 10) celestialCnt = 0;
		if (earthlyCnt === 12) earthlyCnt = 0;
	}

	return cycle;
}
