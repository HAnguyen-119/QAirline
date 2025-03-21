import './Planes.css'
import {useLocation, useNavigate, useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import userAPI from "../../../api/userAPI.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";

export default function Planes() {
    const isLightMode = useOutletContext();
    const location = useLocation();
    const navigate = useNavigate();

    const [planeData, setPlaneData] = useState([]);
    const [isRefresh, setIsRefresh] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updatingPlane, setUpdatingPlane] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deletingPlane, setDeletingPlane] = useState(null);
    const [isDuplicatedId, setIsDuplicatedId] = useState(false);

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
    const id = searchParams.get('id');
    const model = searchParams.get('model');
    const manufacturer = searchParams.get("manufacturer");
    const capacity = searchParams.get('capacity');
    const status = searchParams.get('status');

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
        if (newId.length === 0) return false;
        const planeIds = planeData.map(plane => plane.code);
        for (let i = 0; i < planeIds.length; i++) {
            if (planeIds[i] === newId) return true;
        }
        return false
    }

    const filteredPlanes = planeData.filter((plane) => {
        return (!id || plane.code === id.toUpperCase())
            && (!model || plane.model.toLowerCase() === model.toLowerCase())
            && (!manufacturer || plane.manufacturer.toLowerCase() === manufacturer.toLowerCase())
            && (!status || plane.isActive === (status === "Active"))
            && (checkCapacity(plane.economySeatNumber + plane.businessSeatNumber, capacity));
    })

    const clearFilters = () => {
        const idFilter = document.getElementById("id-filter");
        const modelFilter = document.getElementById("model-filter");
        const manufacturerFilter = document.getElementById("manufacturer-filter");
        const statusFilter = document.getElementById("status-filter");
        const capacityFilter = document.getElementById("capacity-filter");
        idFilter.value = "";
        modelFilter.value = "";
        manufacturerFilter.value = "";
        statusFilter.value = "";
        capacityFilter.value = "";
        searchWithFilter();
    }

    const searchWithFilter = () => {
        const idValue = document.getElementById("id-filter").value.trim();
        const modelValue = document.getElementById("model-filter").value.trim();
        const manufacturerValue = document.getElementById("manufacturer-filter").value.trim();
        const statusValue = document.getElementById("status-filter").value.trim();
        const capacityValue = document.getElementById("capacity-filter").value.trim();
        let params = new URLSearchParams({
            'id': idValue.toUpperCase(),
            'model': modelValue,
            'manufacturer': manufacturerValue,
            'status': statusValue,
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
    }

    const handleAdd = async () => {
        const newId = document.getElementById("id-new").value.trim();
        const newModel = document.getElementById("model-new").value.trim();
        const newManufacturer = document.getElementById("manufacturer-new").value.trim();
        const newEconomy = document.getElementById("economy-new").value.trim();
        const newBusiness = document.getElementById("business-new").value.trim();
        const newStatus = document.getElementById("status-new").value.trim();
        const isValid = newId.length > 0
                                && newModel.length > 0
                                && newManufacturer.length > 0
                                && newEconomy.length > 0
                                && newBusiness.length > 0;
        const newPlaneData = {"code": newId.toUpperCase(),
            "model": newModel,
            "manufacturer": newManufacturer,
            "economySeatNumber": newEconomy,
            "businessSeatNumber": newBusiness,
            "isActive": newStatus === "Active"};
        try{
            if (!isValid) {
                if(checkDuplicateId(newId)) {
                    setIsDuplicatedId(true);
                } else {
                    setIsDuplicatedId(false);
                }
            } else {
                setIsDuplicatedId(false);
                await userAPI.addPlane(newPlaneData);
                setIsAdding(false);
                setIsRefresh(!isRefresh);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = async () => {
        const newId = document.getElementById("id-new").value.trim();
        const newModel = document.getElementById("model-new").value.trim();
        const newManufacturer = document.getElementById("manufacturer-new").value.trim();
        const newEconomy = document.getElementById("economy-new").value.trim();
        const newBusiness = document.getElementById("business-new").value.trim();
        const newStatus = document.getElementById("status-new").value.trim();
        const isValid = newId.length > 0
            && newModel.length > 0
            && newManufacturer.length > 0
            && newEconomy.length > 0
            && newBusiness.length > 0;
        const newPlaneData = {"code": newId,
            "model": newModel,
            "manufacturer": newManufacturer,
            "economySeatNumber": newEconomy,
            "businessSeatNumber": newBusiness,
            "isActive": newStatus === "Active",};
        console.log(updatingPlane);
        console.log(newStatus === "Active");
        try {
            if (isValid)  {
                if (checkDuplicateId(newId) && updatingPlane.code !== newId) {
                    setIsDuplicatedId(true);
                }
                else {
                    setIsDuplicatedId(false);
                    await userAPI.updatePlane(updatingPlane.id, newPlaneData);
                    setIsUpdating(false);
                    setIsRefresh(!isRefresh);
                }
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
                    <div className='form-wrapper'>ID <input type="text" id="id-filter" className="josefin-sans"/></div>
                    <div className='form-wrapper'>Model <input type="text" id="model-filter" className="josefin-sans"/></div>
                    <div className='form-wrapper'>Manufacturer <input type="text" id="manufacturer-filter" className="josefin-sans"/></div>
                    <div className='form-wrapper select'>Capacity <select id="capacity-filter" className="josefin-sans">
                        <option value=""></option>
                        <option value="< 100">{"< 100"}</option>
                        <option value="100 - 200">{"100 - 200"}</option>
                        <option value="> 200">{"> 200"}</option>
                    </select></div>
                    <div className='form-wrapper select'>Status <select id="status-filter" className="josefin-sans">
                        <option value=""></option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select></div>
                </div>
                <div>
                    <button className="josefin-sans" onClick={searchWithFilter}>Search</button>
                    <button className="josefin-sans" onClick={clearFilters}>Clear Filters</button>
                </div>
            </div>
            <div className="table-container">
            <table className={`${isLightMode ? "" : "dark"}`}>
                <caption>TOTAL NUMBER OF PLANES : {planeData.length}</caption>
                <tbody>
                    <tr>
                        <th rowSpan={2}>No</th>
                        <th rowSpan={2}>ID</th>
                        <th rowSpan={2}>Model</th>
                        <th rowSpan={2}>Manufacturer</th>
                        <th colSpan={3}>Capacity</th>
                        <th rowSpan={2}>Status</th>
                        <th rowSpan={2}>Edit</th>
                    </tr>
                    <tr>
                        <th>Economy</th>
                        <th>Business</th>
                        <th>Total</th>
                    </tr>
                {filteredPlanes.map((plane, index) =>
                    <tr key={plane.code}>
                        <td>{index + 1}</td>
                        <td>{plane.code}</td>
                        <td>{plane.model}</td>
                        <td>{plane.manufacturer}</td>
                        <td>{plane.economySeatNumber}</td>
                        <td>{plane.businessSeatNumber}</td>
                        <td>{plane.economySeatNumber + plane.businessSeatNumber}</td>
                        <td>{plane.isActive ? "Active" : "Inactive"}</td>
                        <td>
                            <button className="edit" onClick={() => {
                                setIsUpdating(true);
                                setUpdatingPlane(plane);
                            }}><FontAwesomeIcon icon={faPenToSquare}/></button>
                            <button className="delete" onClick={() => {
                                setIsDeleting(true);
                                setDeletingPlane(plane)
                            }}><FontAwesomeIcon icon={faTrash}/></button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            </div>
            {(isAdding || isUpdating) ?
                <div className="add-plane-window">
                    <div></div>
                    <div className="add-plane-form">
                        <h1>{isAdding ? "New plane" : "Update plane"}</h1>
                        <div className="form-wrapper input-fields">
                            <span>Plane ID <span
                                style={{color: "red"}}>* {isDuplicatedId ? "ID existed ! Try another ID" : ""}</span></span>
                            <input type="text" id="id-new" className="josefin-sans" required={true}
                                   defaultValue={isUpdating ? updatingPlane.code : ""}/>
                            <span>Model <span style={{color: "red"}}>* </span></span>
                            <input type="text" id="model-new" className="josefin-sans" required={true}
                                   defaultValue={isUpdating ? updatingPlane.model : ""}/>
                            <span>Manufacturer <span
                                style={{color: "red"}}>* </span></span>
                            <input type="text" id="manufacturer-new" className="josefin-sans" required={true}
                                   defaultValue={isUpdating ? updatingPlane.manufacturer : ""}/>
                            <div className='seat-number'>
                                <div className='form-wrapper'>
                                    <span>Economy seats <span style={{color: "red"}}>* </span></span>
                                    <input type="number" id="economy-new" className="josefin-sans" min={1} required={true}
                                           defaultValue={isUpdating ? updatingPlane.economySeatNumber : ""}/>
                                </div>
                                <div className='form-wrapper'>
                                    <span>Business seats <span style={{color: "red"}}>* </span></span>
                                    <input type="number" id="business-new" className="josefin-sans" min={1} required={true}
                                           defaultValue={isUpdating ? updatingPlane.businessSeatNumber : ""}/>
                                </div>
                            </div>
                            <div className='form-wrapper status-input'>
                                <span>Status <span style={{color: "red"}}>* </span></span>
                                <select id="status-new" className="josefin-sans" required={true}
                                        defaultValue={isUpdating ? (updatingPlane.isActive ? "Active" : "Inactive") : "Active"}>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
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
                    {deletingPlane.isActive ?
                        <div className="delete-plane-form">
                            <h3>Can&#39;t delete an active plane</h3>
                            <div className="buttons">
                                <button className="josefin-sans" onClick={handleCancel}>BACK</button>
                            </div>
                        </div> :
                        <div className="delete-plane-form">
                            <h3>Delete plane with ID {deletingPlane.code} ?</h3>
                            <div className="buttons">
                                <button className="josefin-sans" onClick={handleCancel}>CANCEL</button>
                                <button className="josefin-sans" onClick={() => {
                                    handleDelete(deletingPlane.id)
                                }}>DELETE
                                </button>
                            </div>
                        </div>
                    }
                </div> : null}
        </div>
    )
}

