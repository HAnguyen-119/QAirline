import './Planes.css'
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import userAPI from "../../../api/userAPI.jsx";

export default function Planes() {
    const location = useLocation();
    const navigate = useNavigate();

    const [planeData, setPlaneData] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    const [isIdInput, setIsIdInput] = useState(false);
    const [isModelInput, setIsModelInput] = useState(false);
    const [isManufacturerInput, setIsManufacturerInput] = useState(false);
    const [isCapacityInput, setIsCapacityInput] = useState(false);

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
    }, [isAdding]);

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

    const handleCancel = () => {
        setIsAdding(false);
        setIsIdInput(false);
        setIsModelInput(false);
        setIsManufacturerInput(false);
        setIsCapacityInput(false);
    }

    const handleAdd = async () => {
        const newId = document.getElementById("id-add").value;
        const newModel = document.getElementById("model-add").value;
        const newManufacturer = document.getElementById("manufacturer-add").value;
        const newCapacity = document.getElementById("capacity-add").value;
        const newPlaneData = {"code": newId, "model": newModel, "manufacturer": newManufacturer, "capacity": newCapacity};
        try{
            await userAPI.addPlane(newPlaneData);
            setIsAdding(false);
            setIsIdInput(false);
            setIsModelInput(false);
            setIsManufacturerInput(false);
            setIsCapacityInput(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="planes">
            <div className="planes-filter">
                <button className="josefin-sans" onClick={() => {setIsAdding(true)}}>Add new plane</button>
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
                <div>
                    <button className="josefin-sans" onClick={searchWithFilter}>Search</button>
                    <button className="josefin-sans" onClick={clearFilters}>Clear Filters</button>
                </div>
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
                    <tr key={plane.code}>
                        <td>{index + 1}</td>
                        <td>{plane.code}</td>
                        <td>{plane.model}</td>
                        <td>{plane.manufacturer}</td>
                        <td>{plane.capacity}</td>
                        <td>
                            <button className="edit"></button>
                            <button className="delete"></button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            {isAdding ?
            <div className="add-plane-window">
                <div></div>
                <div className="add-plane-form">
                    <h1>New plane</h1>
                    <div className="input-fields">
                        <span>Plane ID <span style={{color: "red"}}>{isIdInput ? "" : "*"}</span></span>
                        <input type="text" id="id-add" className="josefin-sans" required={true} onInput={() => {
                            document.getElementById("id-add").value.trim().length > 0 ? setIsIdInput(true) : setIsIdInput(false);
                        }}/>
                        <span>Model <span style={{color: "red"}}>{isModelInput ? "" : "*"}</span></span>
                        <input type="text" id="model-add" className="josefin-sans" required={true} onInput={() => {
                            document.getElementById("model-add").value.trim().length > 0 ? setIsModelInput(true) : setIsModelInput(false);
                        }}/>
                        <span>Manufacturer <span style={{color: "red"}}>{isManufacturerInput ? "" : "*"}</span></span>
                        <input type="text" id="manufacturer-add" className="josefin-sans" required={true} onInput={() => {
                            document.getElementById("manufacturer-add").value.trim().length > 0 ? setIsManufacturerInput(true) : setIsManufacturerInput(false);
                        }}/>
                        <span>Capacity <span style={{color: "red"}}>{isCapacityInput ? "" : "*"}</span></span>
                        <input type="number" id="capacity-add" className="josefin-sans" min={1} required={true} onInput={() => {
                            document.getElementById("capacity-add").value.length > 0 ? setIsCapacityInput(true) : setIsCapacityInput(false);
                        }}/>
                    </div>
                    <div className="buttons">
                        <button className="josefin-sans" onClick={handleCancel}>CANCEL</button>
                        <button className="josefin-sans" onClick={handleAdd}>ADD</button>
                    </div>
                </div>
            </div> : null}
        </div>
    )
}

