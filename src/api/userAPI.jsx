import axiosClient from "./axiosClient.jsx";

const userAPI = {
    getAllFlights: (flights) => {
        const url = "api/v1/flights";
        return axiosClient.get(url, flights);
    },

    getAllPlanes: (planes) => {
        const url = "api/v1/airplanes";
        return axiosClient.get(url, planes);
    },

    getAllAirports: (airports) => {
        const url = "api/v1/airports";
        return axiosClient.get(url, airports);
    },
    findFlight: (data) => {
        const url = 'api/v1/flights/find'
        return axiosClient.post(url, data)
    },
    findFlightById: (id) => {
        const url = `api/v1/flights/${id}`
        return axiosClient.get(url, id)
    }
}

export default userAPI;