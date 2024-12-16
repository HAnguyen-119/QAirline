const VAT = 0.1;
const SERVICE_CHARGE = 0.05;
const SECURITY_FEE = 5;
const TICKET_FEE = 2;
const BAGGAGE_FEE = 10;
export function CalculateTax(fee, passengers) {
    const vat = fee * VAT;
    const serviceCharge = fee * SERVICE_CHARGE;
    return vat + (serviceCharge + SECURITY_FEE + TICKET_FEE) * passengers + BAGGAGE_FEE;
}