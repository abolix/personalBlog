import Jalaali from 'jalaali-js';


export const formatDate = (utcDate) => {
	const date = new Date(utcDate); // Convert UTC to Date object
	return date.toLocaleString(); // Format in the user's local timezone
}

const padWithZero = (value) => {
	return value.toString().padStart(2, '0');
}

export const timestampToJalali = (timestamp) => {

	// example 1727695014

    let date = new Date(timestamp); // Convert back to milliseconds for Date object

    // Convert to Jalali date
    let jalaliDate = Jalaali.toJalaali(date);
	// return like this
	// ۲۲ شهریور ۱۴۰۳ 22:15

	const hours = padWithZero(date.getHours());
	const minutes = padWithZero(date.getMinutes());
	const day = padWithZero(jalaliDate.jd);
	const month = padWithZero(jalaliDate.jm);


	return `${hours}:${minutes} ${jalaliDate.jy}/${month}/${day}`;
}

export const timestampToJalaliDate = (timestamp) => {
	// example 1727695014

	let date = new Date(timestamp); // Convert back to milliseconds for Date object

	// Convert to Jalali date
	let jalaliDate = Jalaali.toJalaali(date);
	// return like this
	// ۲۲ شهریور ۱۴۰۳

	const day = padWithZero(jalaliDate.jd);
	const month = padWithZero(jalaliDate.jm);

	return `${jalaliDate.jy}/${month}/${day}`;
}