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

    addPlane: (plane) => {
        const url = "api/v1/airplanes";
        return axiosClient.post(url, plane);
    }
}

export default userAPI;