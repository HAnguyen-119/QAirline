import {NAME_REGEX, EMAIL_REGEX, PHONE_REGEX, NUMBER_REGEX} from "../data/RegEx.js";

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
            if (NUMBER_REGEX.test(name)) {
                return 1;
            } else {
                return -1;
            }
        }
        ret += name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() + ' ';
    }
    return ret
}

export function EmailValidation(email) {
    return EMAIL_REGEX.test(email);
}

export function PhoneValidation(phone) {
    return PHONE_REGEX.test(phone);
}

console.log(PhoneValidation(password))

console.log(EmailValidation(email))