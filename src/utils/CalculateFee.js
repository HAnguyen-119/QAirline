export function CalculateFee({ flight, seatType, adults, children, infants }) {
    const adultsTotal = seatType === 'economy' ? adults * flight.economyPrice : adults * flight.businessPrice;
    const childrenTotal = (seatType === 'economy' ? children * flight.economyPrice : children * flight.businessPrice) * 0.75;
    const infantsTotal = (seatType === 'economy' ? infants * flight.economyPrice : infants * flight.businessPrice) * 0.1;

    return adultsTotal + childrenTotal + infantsTotal;
}