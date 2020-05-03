class DateUtils {
	constructor() {
		this.dateObj = new Date();
		this.year = this.dateObj.getFullYear();
		this.month = this.dateObj.getMonth() + 1;
		this.day = this.dateObj.getDate();
		this.weekday = this.dateObj.getDay();
		this.hour = this.dateObj.getHours();
		this.minute = this.dateObj.getMinutes();
		this.second = this.dateObj.getSeconds();
	}
}
