export function calculateTravelTime(departureTime, arrivalTime) {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
    const diffMs = arrival - departure;
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHrs}h ${diffMins}m`;
}

export function calculateCancelTime(time) {
    const cancelTime = new Date(time);
    cancelTime.setDate(cancelTime.getDate() + 3);
    return cancelTime;
}