import {EMAIL_REGEX, NAME_REGEX, PHONE_REGEX} from "../data/RegEx.js";

let name = '          a          aksd           adsa '
let email = 'abc@gmail.com'
let password = '1234567890 '

export function NameValidation(str) {
    let names = str.split(' ');
    let ret = '';
    for (let name of names) {
        if (name === '') {
            continue;
        }
        if (!NAME_REGEX.test(name)) {
            return -1;
        }
        ret += name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() + ' ';
    }
    return ret.trim();
}

export function EmailValidation(email) {
    return EMAIL_REGEX.test(email);
}

export function PhoneValidation(phone) {
    return PHONE_REGEX.test(phone);
}

export function getInfantDay() {
    const today = new Date();
    return new Date(today.getFullYear() - 2, today.getMonth(), today.getDate())
        .toISOString()
        .split("T")[0]
}

export function getChildDay() {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 2, today.getMonth(), today.getDate())
        .toISOString()
        .split("T")[0];
    const minDate = new Date(today.getFullYear() - 12, today.getMonth(), today.getDate())
        .toISOString()
        .split("T")[0];
    return {minDate, maxDate};
}

export function getAdultDay() {
    const today = new Date();
    return new Date(today.getFullYear() - 12, today.getMonth(), today.getDate())
        .toISOString()
        .split("T")[0];
}

console.log(getInfantDay())
console.log(getChildDay())
console.log(getAdultDay())
console.log(PhoneValidation(password))

console.log(EmailValidation(email))