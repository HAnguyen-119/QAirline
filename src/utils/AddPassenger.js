export function AddPassenger(numberOfData) {
    const passengers = document.querySelector('.passengers')
    const passengerTable = document.querySelector('.table.passengers>tbody')
    const passengerRow = document.createElement('tr')
    const submitButton = document.createElement('button')

    for (let i = 0; i < numberOfData; i++) {
        let tmpData = document.createElement('td')
        tmpData.appendChild(document.createElement('input'))
        passengerRow.appendChild(tmpData)
    }
    passengerTable.appendChild(passengerRow)

    button.textContent = 'Submit'

    passengers.appendChild(submitButton)
}