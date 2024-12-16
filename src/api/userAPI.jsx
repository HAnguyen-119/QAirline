import axiosClient from "./axiosClient.jsx";

const userAPI = {
    getAllFlights: (flights) => {
        const url = "api/v1/flights";
        return axiosClient.get(url, flights);
    },

    addFlight: (flight) => {
        const url = "api/v1/flights";
        return axiosClient.post(url, flight);
    },

    updateFlight: (flightId, flight) => {
        const url = `api/v1/flights/${flightId}`;
        return axiosClient.put(url, flight);
    },

    deleteFlight: (flightId) => {
        const url = `api/v1/flights/${flightId}`;
        return axiosClient.delete(url, flightId);
    },

    getAllPlanes: () => {
        const url = "api/v1/airplanes";
        return axiosClient.get(url);
    },

    addPlane: (plane) => {
        const url = "api/v1/airplanes";
        return axiosClient.post(url, plane);
    },

    updatePlane: (planeId, plane) => {
        const url = `api/v1/airplanes/${planeId}`;
        return axiosClient.put(url, plane);
    },

    deletePlane: (planeId) => {
        const url = `api/v1/airplanes/${planeId}`;
        return axiosClient.delete(url, planeId);
    },

    getAllAirports: () => {
        const url = "api/v1/airports";
        return axiosClient.get(url);
    },

    addAirport: (airport) => {
        const url = "api/v1/airports";
        return axiosClient.post(url, airport);
    },

    updateAirport: (airportId, airport) => {
        const url = `api/v1/airports/${airportId}`;
        return axiosClient.put(url, airport);
    },

    deleteAirport: (airportId) => {
        const url = `api/v1/airports/${airportId}`;
        return axiosClient.delete(url, airportId);
    },
    findFlight: (data) => {
        const url = 'api/v1/flights/find'
        return axiosClient.post(url, data)
    },
    findFlightById: (id) => {
        const url = `api/v1/flights/${id}`
        return axiosClient.get(url, id)
    },

    getAllBookings: () => {
        const url = "api/v1/bookings";
        return axiosClient.get(url);
    },

    addBooking: (booking) => {
        const url = "api/v1/bookings";
        return axiosClient.post(url, booking);
    },
}

export default userAPI;