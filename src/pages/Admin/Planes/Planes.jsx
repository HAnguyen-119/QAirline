import './Planes.css'
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import userAPI from "../../../api/userAPI.jsx";

export default function Planes() {
    const location = useLocation();
    const navigate = useNavigate();

    const [planeData, setPlaneData] = useState([]);
    const [isRefresh, setIsRefresh] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updatingId, setUpdatingId] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deletingId, setDeletingId] = useState([0, ""]);
    const [isDuplicatedId, setIsDuplicatedId] = useState(false);

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
                console.log(isRefresh);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [isRefresh]);

    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
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

    const checkDuplicateId = (newId) => {
        const planeIds = planeData.map(plane => plane.code);
        for (let i = 0; i < planeIds.length; i++) {
            if (planeIds[i] === newId) return true;
        }
        return false
    }

    const filteredPlanes = planeData.filter((plane) => {
        return (!code || plane.code === code)
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
        setIsUpdating(false);
        setIsDeleting(false);
        setIsDuplicatedId(false);
        setIsRefresh(!isRefresh);
        setIsIdInput(false);
        setIsModelInput(false);
        setIsManufacturerInput(false);
        setIsCapacityInput(false);
    }

    const handleAdd = async () => {
        const newId = document.getElementById("id-new").value;
        const newModel = document.getElementById("model-new").value;
        const newManufacturer = document.getElementById("manufacturer-new").value;
        const newCapacity = document.getElementById("capacity-new").value;
        const newPlaneData = {"code": newId, "model": newModel, "manufacturer": newManufacturer, "capacity": newCapacity};
        try{
            if (checkDuplicateId(newId)) {
                setIsDuplicatedId(true);
            } else {
                setIsDuplicatedId(false);
                await userAPI.addPlane(newPlaneData);
                setIsAdding(false);
                setIsIdInput(false);
                setIsModelInput(false);
                setIsManufacturerInput(false);
                setIsCapacityInput(false);
                setIsRefresh(!isRefresh);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = async () => {
        const newId = document.getElementById("id-new").value;
        const newModel = document.getElementById("model-new").value;
        const newManufacturer = document.getElementById("manufacturer-new").value;
        const newCapacity = document.getElementById("capacity-new").value;
        const newPlaneData = {"code": newId, "model": newModel, "manufacturer": newManufacturer, "capacity": newCapacity};
        try {
            if (updatingId !== newId && checkDuplicateId(newId)) {
                setIsDuplicatedId(true);
            } else {
                setIsDuplicatedId(false);
                await userAPI.updatePlane(updatingId, newPlaneData);
                setIsUpdating(false);
                setIsIdInput(false);
                setIsModelInput(false);
                setIsManufacturerInput(false);
                setIsCapacityInput(false);
                setIsRefresh(!isRefresh);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (plane) => {
        try {
            await userAPI.deletePlane(plane);
            setIsDeleting(false);
            setIsRefresh(!isRefresh);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="planes">
            <div className="planes-filter">
                <button className="josefin-sans" id="add-Bt" onClick={() => {setIsAdding(true)}}>Add new plane</button>
                <div className="filters">
                    ID <input type="text" id="id-filter" className="josefin-sans"/>
                    Model <input type="text" id="model-filter" className="josefin-sans"/>
                    Manufacturer <input type="text" id="manufacturer-filter" className="josefin-sans"/>
                    Capacity <select id="capacity-filter" className="josefin-sans">
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
                <caption>TOTAL NUMBER OF PLANES : {planeData.length}</caption>
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
                            <button className="edit" onClick={() => {
                                setIsUpdating(true);
                                setUpdatingId(plane.id);
                            }}></button>
                            <button className="delete" onClick={() => {
                                setIsDeleting(true);
                                setDeletingId([plane.id, plane.code])
                            }}></button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            {(isAdding || isUpdating) ?
                <div className="add-plane-window">
                    <div></div>
                    <div className="add-plane-form">
                        <h1>{isAdding ? "New plane" : "Update plane"}</h1>
                        <div className="input-fields">
                            <span>Plane ID <span style={{color: "red"}}>{isIdInput ? "" : "*"} {isDuplicatedId ? "ID existed ! Try another ID" : ""}</span></span>
                            <input type="text" id="id-new" className="josefin-sans" required={true} onInput={() => {
                                document.getElementById("id-new").value.trim().length > 0 ? setIsIdInput(true) : setIsIdInput(false);
                            }}/>
                            <span>Model <span style={{color: "red"}}>{isModelInput ? "" : "*"}</span></span>
                            <input type="text" id="model-new" className="josefin-sans" required={true} onInput={() => {
                                document.getElementById("model-new").value.trim().length > 0 ? setIsModelInput(true) : setIsModelInput(false);
                            }}/>
                            <span>Manufacturer <span style={{color: "red"}}>{isManufacturerInput ? "" : "*"}</span></span>
                            <input type="text" id="manufacturer-new" className="josefin-sans" required={true} onInput={() => {
                                document.getElementById("manufacturer-new").value.trim().length > 0 ? setIsManufacturerInput(true) : setIsManufacturerInput(false);
                            }}/>
                            <span>Capacity <span style={{color: "red"}}>{isCapacityInput ? "" : "*"}</span></span>
                            <input type="number" id="capacity-new" className="josefin-sans" min={1} required={true} onInput={() => {
                                document.getElementById("capacity-new").value.length > 0 ? setIsCapacityInput(true) : setIsCapacityInput(false);
                            }}/>
                        </div>
                        <div className="buttons">
                            <button className="josefin-sans" onClick={handleCancel}>CANCEL</button>
                            {isAdding ?
                                <button className="josefin-sans" onClick={handleAdd}>ADD</button> :
                                <button className="josefin-sans" onClick={handleUpdate}>SAVE</button>}
                        </div>
                    </div>
                </div> : null}
            {isDeleting ?
                <div className="delete-plane-window">
                    <div></div>
                    <div className="delete-plane-form">
                        <h3>Delete plane with id {deletingId[1]} ?</h3>
                        <div className="buttons">
                            <button className="josefin-sans" onClick={handleCancel}>CANCEL</button>
                            <button className="josefin-sans" onClick={() => {handleDelete(deletingId[0])}}>DELETE</button>
                        </div>
                    </div>
                </div> : null}
        </div>
    )
}

