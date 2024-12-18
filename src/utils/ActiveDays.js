export function getDeptDays(deptDate) {
    const dates = [];
    const today = new Date();
    const endDate = new Date(deptDate);
    const additionalDays = 7;
    const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };

    const formattedToday = today.toLocaleDateString('en-US', options);
    const formattedDeptDate = endDate.toLocaleDateString('en-US', options);

    if (formattedToday !== formattedDeptDate) {
        const todayThingDay = formattedToday.split(',')[0];
        const todayMonth = formattedToday.split(',')[1].split('/')[0].trim();
        const todayDay = formattedToday.split(',')[1].split('/')[1];
        const todayYear = formattedToday.split(',')[1].split('/')[2];
        dates.push([todayThingDay, todayDay, todayMonth, todayYear]);
    }

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

export function getRetDays(deptDate) {
    const dates = [];
    const startDate = new Date(deptDate);
    const additionalDays = 7;

    const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };

    for (let i = 0; i < additionalDays; i++) {
        const formattedDate = startDate.toLocaleDateString('en-US', options);
        const thingDay = formattedDate.split(',')[0];
        const month = formattedDate.split(',')[1].split('/')[0].trim();
        const day = formattedDate.split(',')[1].split('/')[1];
        const year = formattedDate.split(',')[1].split('/')[2];
        dates.push([thingDay, day, month, year]);
        startDate.setDate(startDate.getDate() + 1);
    }

    return dates;
}
