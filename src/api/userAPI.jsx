import axiosClient from "./axiosClient.jsx";

const userAPI = {
    getAllFlights: (flights) => {
        const url = "api/v1/flights";
        return axiosClient.get(url, flights);
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
        const url = `api/v1/airplanes/${airportId}`;
        return axiosClient.put(url, airport);
    },

    deleteAirport: (airportId) => {
        const url = `api/v1/airplanes/${airportId}`;
        return axiosClient.delete(url, airportId);
    }
}

export default userAPI;