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

    getAllPosts: () => {
        const url = "api/v1/posts";
        return axiosClient.get(url);
    },

    getPostImageById: (post) => {
        const url = `api/v1/posts/${post.id}/image`;
        return axiosClient.get(url, {responseType: "blob"});
    },

    addPost: (post) => {
        const url = "api/v1/posts";
        return axiosClient.post(url, post, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    },

    updatePost: (postId, post) => {
        const url = `api/v1/posts/${postId}`;
        return axiosClient.put(url, post, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    },

    deletePost: (postId) => {
        const url = `api/v1/posts/${postId}`;
        return axiosClient.delete(url, postId);
    }
}

export default userAPI;