export function getDeptDays(deptDate) {
    const dates = [];
    const today = new Date();
    const endDate = new Date(deptDate);
    const additionalDays = 7;
    const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };

    const formattedToday = today.toLocaleDateString('en-US', options);

    const todayThingDay = formattedToday.split(',')[0];
    const todayMonth = formattedToday.split(',')[1].split('/')[0].trim();
    const todayDay = formattedToday.split(',')[1].split('/')[1];
    const todayYear = formattedToday.split(',')[1].split('/')[2];
    dates.push([todayThingDay, todayDay, todayMonth, todayYear]);

    today.setDate(today.getDate() + 1);

    while (today <= endDate) {
        const formattedDate = today.toLocaleDateString('en-US', options);
        const thingDay = formattedDate.split(',')[0];
        const month = formattedDate.split(',')[1].split('/')[0].trim();
        const day = formattedDate.split(',')[1].split('/')[1];
        const year = formattedDate.split(',')[1].split('/')[2];
        dates.push([thingDay, day, month, year]);
        today.setDate(today.getDate() + 1);
    }

    for (let i = 0; i < additionalDays; i++) {
        const formattedDate = endDate.toLocaleDateString('en-US', options);
        const thingDay = formattedDate.split(',')[0];
        const month = formattedDate.split(',')[1].split('/')[0].trim();
        const day = formattedDate.split(',')[1].split('/')[1];
        const year = formattedDate.split(',')[1].split('/')[2];
        dates.push([thingDay, day, month, year]);
        endDate.setDate(endDate.getDate() + 1);
    }

    return dates;
}

export function getReturnDays(deptDate, retDate) {
    const days = [];
    const startDate = new Date(deptDate);
    const endDate = new Date(retDate);
    const additionalDays = 7;

    while (startDate <= endDate) {
        days.push([startDate.toISOString().split('T')[0], startDate.getDate().toString()]);
        startDate.setDate(startDate.getDate() + 1);
    }

    for (let i = 0; i < additionalDays; i++) {
        endDate.setDate(endDate.getDate() + 1);
        days.push([endDate.toISOString().split('T')[0], endDate.getDate().toString()]);
    }

    return days;
}
