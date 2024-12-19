export function CalculateFee({ flight, seatType, adults, children, infants }) {
    const adultsTotal = seatType === 'ECONOMY' ? adults * flight.economyPrice : adults * flight.businessPrice;
    const childrenTotal = (seatType === 'ECONOMY' ? children * flight.economyPrice : children * flight.businessPrice) * 0.75;
    const infantsTotal = (seatType === 'ECONOMY' ? infants * flight.economyPrice : infants * flight.businessPrice) * 0.1;

    return adultsTotal + childrenTotal + infantsTotal;
}