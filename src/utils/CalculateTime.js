export function calculateTravelTime(departureTime, arrivalTime) {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
    let timeDifference = arrival - departure;
    const totalMinutes = timeDifference / (1000 * 60);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);

    return `${hours}h${minutes}m`;

}

export function calculateCancelTime(time) {
    const cancelTime = new Date(time);
    cancelTime.setDate(cancelTime.getDate() + 3);
    return cancelTime;
}