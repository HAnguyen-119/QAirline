import './Planes.css'
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import userAPI from "../../../api/userAPI.jsx";

export default function Planes() {
    const location = useLocation();
    const navigate = useNavigate();
    const [planeData, setPlaneData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const planes = await userAPI.getAllPlanes();
                setPlaneData(planes);
                console.log(planes);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const model = searchParams.get('model');
    const manufacturer = searchParams.get("manufacturer");
    const capacity = searchParams.get('capacity');

    const checkCapacity = (seat, range) => {
        switch(range) {
            case '< 100':
                return parseInt(seat) < 100
            case '100 - 200':
                return parseInt(seat) >= 100 && parseInt(seat) <= 200
            case '> 200':
                return parseInt(seat) > 200
            default:
                return true;
        }
    }

    const filteredPlanes = planeData.filter((plane) => {
        return (!id || plane.id === id)
            && (!model || plane.model === model)
            && (!manufacturer || plane.manufacturer === manufacturer)
            && (checkCapacity(plane.capacity, capacity));
    })

    const clearFilters = () => {
        const idFilter = document.getElementById("id-filter");
        const modelFilter = document.getElementById("model-filter");
        const manufacturerFilter = document.getElementById("manufacturer-filter");
        const capacityFilter = document.getElementById("capacity-filter");
        idFilter.value = "";
        modelFilter.value = "";
        manufacturerFilter.value = "";
        capacityFilter.value = "";
        searchWithFilter();
    }

    const searchWithFilter = () => {
        const idValue = document.getElementById("id-filter").value;
        const modelValue = document.getElementById("model-filter").value;
        const manufacturerValue = document.getElementById("manufacturer-filter").value;
        const capacityValue = document.getElementById("capacity-filter").value;
        let params = new URLSearchParams({
            'id': idValue,
            'model': modelValue,
            'manufacturer': manufacturerValue,
            'capacity': capacityValue,
        }).toString();
        navigate(`?${params}`);
    }

    return (
        <div className="planes">
            <div className="planes-filter">
                <div className="filters">
                    ID <input type="text" id="id-filter"/>
                    model <input type="text" id="model-filter"/>
                    manufacturer <input type="text" id="manufacturer-filter"/>
                    Capacity <select id="capacity-filter">
                        <option value="">{""}</option>
                        <option value="< 100">{"< 100"}</option>
                        <option value="100 - 200">{"100 - 200"}</option>
                        <option value="> 200">{"> 200"}</option>
                    </select>
                </div>
                <button onClick={searchWithFilter}>Search</button>
                <button onClick={clearFilters}>Clear Filters</button>
            </div>
            <table>
                <tbody>
                <tr>
                    <th>No</th>
                    <th>Id</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                    <th>Capacity</th>
                    <th>Edit</th>
                </tr>
                {filteredPlanes.map((plane, index) =>
                    <tr key={plane.id}>
                        <td>{index + 1}</td>
                        <td>{plane.id}</td>
                        <td>{plane.model}</td>
                        <td>{plane.manufacturer}</td>
                        <td>{plane.capacity}</td>
                        <td>
                            <button>Edit</button>
                            <button>Delete</button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}

