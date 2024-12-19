import emailjs from 'emailjs-com';

export function sendEmail(username, OTP, email) {
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