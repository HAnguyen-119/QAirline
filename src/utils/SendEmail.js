import emailjs from 'emailjs-com';

export function sendOTP(username, OTP, email) {
    const templateParams = {
        to_email: email,
        username: username,
        OTP: OTP,
    };

    emailjs.send('UUFpcmxpbmU5MTQz', 'Q2FuY2VsOTE0Mw==', templateParams, '08kildmCjlQ6GmEKB')
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
        }, (error) => {
            console.log('FAILED...', error);
        });
}

export function sendCancelNotification(email, name, code) {
    const templateParams = {
        to_email: email,
        username: name,
        code: code
    };

    emailjs.send('UUFpcmxpbmU5MTQz', 'Q2FuY2VsQm9va2luZ3M=', templateParams, '08kildmCjlQ6GmEKB')
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
        }, (error) => {
            console.log('FAILED...', error);
        });
}

export function sendEmailWithText(email, name, subject, title, text) {
    emailjs.send("c2VydmljZV9zb3dpejM5","czlheWh4ZA==",{
        title: title,
        username: name,
        text: text,
        subject: subject,
        to_email: email,
    }, "vo9jCNKkMnVL1yAa_")
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
        }, (error) => {
            console.log('FAILED...', error);
        });
}