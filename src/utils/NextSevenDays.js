export function getNextSevenDays(date) {
    const dates = [];
    const returnDateObj = new Date(date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dates.push(['Today', returnDateObj.toLocaleDateString('en-US', options).split(',')[1].split(' ')[2], returnDateObj.toLocaleDateString('en-US', options).split(',')[1].split(' ')[1]]);

    for (let i = 1; i <= 7; i++) {
        const nextDay = new Date(returnDateObj);
        nextDay.setDate(returnDateObj.getDate() + i);

        const formattedDate = nextDay.toLocaleDateString('en-US', options);

        const thingDay = formattedDate.split(',')[0]
        const month = formattedDate.split(',')[1].split(' ')[1]
        const day = formattedDate.split(',')[1].split(' ')[2]

        const res = [thingDay, day, month]
        dates.push(res);
    }

    return dates;
}
