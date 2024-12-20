import "./Airports.css";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import userAPI from "../../../api/userAPI.jsx";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Airports() {
  const isLightMode = useOutletContext();
  const location = useLocation();
  const navigate = useNavigate();

  const [airportData, setAirportData] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingAirport, setUpdatingAirport] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingAirport, setDeletingAirport] = useState(null);
  const [isDuplicatedId, setIsDuplicatedId] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const airports = await userAPI.getAllAirports();
        setAirportData(airports);
        console.log(airports);
        console.log(isRefresh);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [isRefresh]);

  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("id");
  const name = searchParams.get("name");
  const region = searchParams.get("region");
  const city = searchParams.get("city");
  const status = searchParams.get("status");

  const checkDuplicateId = (newId) => {
    if (newId.length === 0) return false;
    const airportIds = airportData.map((airport) => airport.code);
    for (let i = 0; i < airportIds.length; i++) {
      if (airportIds[i] === newId) return true;
    }
    return false;
  };

  const filteredAirports = airportData.filter((airport) => {
    return (
      (!code || airport.code === code) &&
      (!name || airport.name === name) &&
      (!region || airport.region === region) &&
      (!city || airport.city === city) &&
      (!status || airport.isActive === (status === "Active"))
    );
  });

  const clearFilters = () => {
    const idFilter = document.getElementById("id-filter");
    const nameFilter = document.getElementById("name-filter");
    const regionFilter = document.getElementById("region-filter");
    const cityFilter = document.getElementById("city-filter");
    const statusFilter = document.getElementById("status-filter");
    idFilter.value = "";
    nameFilter.value = "";
    regionFilter.value = "";
    cityFilter.value = "";
    statusFilter.value = "";
    searchWithFilter();
  };

  const searchWithFilter = () => {
    const idValue = document.getElementById("id-filter").value.trim();
    const nameValue = document.getElementById("name-filter").value.trim();
    const regionValue = document.getElementById("region-filter").value.trim();
    const cityValue = document.getElementById("city-filter").value.trim();
    const statusValue = document.getElementById("status-filter").value.trim();
    let params = new URLSearchParams({
      id: idValue,
      name: nameValue,
      region: regionValue,
      city: cityValue,
      status: statusValue,
    }).toString();
    navigate(`?${params}`);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsUpdating(false);
    setIsDeleting(false);
    setIsDuplicatedId(false);
    setIsRefresh(!isRefresh);
  };

  const handleAdd = async () => {
    const newId = document.getElementById("id-new").value.trim();
    const newName = document.getElementById("name-new").value.trim();
    const newRegion = document.getElementById("region-new").value.trim();
    const newCity = document.getElementById("city-new").value.trim();
    const newStatus = document.getElementById("status-new").value.trim();
    const isValid =
      newId.length > 0 &&
      newName.length > 0 &&
      newRegion.length > 0 &&
      newCity.length > 0;
    const newAirportData = {
      code: newId,
      name: newName,
      region: newRegion,
      city: newCity,
      isActive: newStatus === "Active",
    };
    try {
      if (!isValid) {
        if (checkDuplicateId(newId)) {
          setIsDuplicatedId(true);
        } else {
          setIsDuplicatedId(false);
        }
      } else {
        setIsDuplicatedId(false);
        await userAPI.addAirport(newAirportData);
        setIsAdding(false);
        setIsRefresh(!isRefresh);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    const newId = document.getElementById("id-new").value.trim();
    const newName = document.getElementById("name-new").value.trim();
    const newRegion = document.getElementById("region-new").value.trim();
    const newCity = document.getElementById("city-new").value.trim();
    const newStatus = document.getElementById("status-new").value.trim();
    const isValid =
      newId.length > 0 &&
      newName.length > 0 &&
      newRegion.length > 0 &&
      newCity.length > 0;
    const newAirportData = {
      code: newId,
      name: newName,
      region: newRegion,
      city: newCity,
      isActive: newStatus === "Active",
    };
    try {
      if (isValid) {
        if (checkDuplicateId(newId) && updatingAirport.code !== newId) {
          setIsDuplicatedId(true);
        } else {
          setIsDuplicatedId(false);
          await userAPI.updateAirport(updatingAirport.id, newAirportData);
          setIsUpdating(false);
          setIsRefresh(!isRefresh);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (airport) => {
    try {
      await userAPI.deleteAirport(airport);
      setIsDeleting(false);
      setIsRefresh(!isRefresh);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="airports">
      <div className="airports-filter">
        <button
          className="josefin-sans"
          id="add-Bt"
          onClick={() => {
            setIsAdding(true);
          }}
        >
          Add new airport
        </button>
        <div className="filters">
          <div className='form-wrapper'>ID <input type="text" id="id-filter" className="josefin-sans" /></div>
          <div className='form-wrapper'>Name <input type="text" id="name-filter" className="josefin-sans" /></div>
          <div className='form-wrapper'>Region
            <input type="text" id="region-filter" className="josefin-sans" /></div>
          <div className='form-wrapper'>City <input type="text" id="city-filter" className="josefin-sans" /></div>
          <div className='form-wrapper select'>Status
          <select id="status-filter" className="josefin-sans">
            <option value=""></option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select></div>
        </div>
        <div>
          <button className="josefin-sans" onClick={searchWithFilter}>
            Search
          </button>
          <button className="josefin-sans" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>
      <div className="table-container">
      <table className={`${isLightMode ? "" : "dark"}`}>
        <caption>TOTAL NUMBER OF AIRPORTS : {airportData.length}</caption>
        <tbody>
          <tr>
            <th>No</th>
            <th>ID</th>
            <th>Name</th>
            <th>Region</th>
            <th>City</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
          {filteredAirports.map((airport, index) => (
            <tr key={airport.code}>
              <td>{index + 1}</td>
              <td>{airport.code}</td>
              <td>{airport.name}</td>
              <td>{airport.region}</td>
              <td>{airport.city}</td>
              <td>{airport.isActive ? "Active" : "Inactive"}</td>
              <td>
                <button
                  className="edit"
                  onClick={() => {
                    setIsUpdating(true);
                    setUpdatingAirport(airport);
                  }}
                ><FontAwesomeIcon icon={faPenToSquare}/></button>
                <button
                  className="delete"
                  onClick={() => {
                    setIsDeleting(true);
                    setDeletingAirport(airport);
                  }}
                ><FontAwesomeIcon icon={faTrash}/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {isAdding || isUpdating ? (
        <div className="add-airport-window">
          <div></div>
          <div className="add-airport-form">
            <h1>{isAdding ? "New airport" : "Update airport"}</h1>
            <div className="input-fields form-wrapper">
              <span>
                Airport ID{" "}
                <span style={{ color: "red" }}>
                  * {isDuplicatedId ? "ID existed ! Try another ID" : ""}
                </span>
              </span>
              <input
                type="text"
                id="id-new"
                className="josefin-sans"
                required={true}
                defaultValue={isUpdating ? updatingAirport.code : ""}
              />
              <span>
                Name <span style={{ color: "red" }}>* </span>
              </span>
              <input
                type="text"
                id="name-new"
                className="josefin-sans"
                required={true}
                defaultValue={isUpdating ? updatingAirport.name : ""}
              />
              <span>
                Region <span style={{ color: "red" }}>* </span>
              </span>
              <input
                type="text"
                id="region-new"
                className="josefin-sans"
                required={true}
                defaultValue={isUpdating ? updatingAirport.region : ""}
              />
              <span>
                City <span style={{ color: "red" }}>* </span>
              </span>
              <input
                type="text"
                id="city-new"
                className="josefin-sans"
                required={true}
                defaultValue={isUpdating ? updatingAirport.city : ""}
              />
              <span>
                Status <span style={{ color: "red" }}>* </span>
              </span>
              <select
                id="status-new"
                className="josefin-sans"
                required={true}
                defaultValue={
                  isUpdating
                    ? updatingAirport.isActive
                      ? "Active"
                      : "Inactive"
                    : "Active"
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="buttons">
              <button className="josefin-sans" onClick={handleCancel}>
                CANCEL
              </button>
              {isAdding ? (
                <button className="josefin-sans" onClick={handleAdd}>
                  ADD
                </button>
              ) : (
                <button className="josefin-sans" onClick={handleUpdate}>
                  SAVE
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
      {isDeleting ? (
        <div className="delete-airport-window">
          <div></div>
          {deletingAirport.isActive ? (
            <div className="delete-airport-form">
              <h3>Can&#39;t delete an active airport</h3>
              <div className="buttons">
                <button className="josefin-sans" onClick={handleCancel}>
                  BACK
                </button>
              </div>
            </div>
          ) : (
            <div className="delete-airport-form">
              <h3>Delete plane with ID {deletingAirport.code} ?</h3>
              <div className="buttons">
                <button className="josefin-sans" onClick={handleCancel}>
                  CANCEL
                </button>
                <button
                  className="josefin-sans"
                  onClick={() => {
                    handleDelete(deletingAirport.id);
                  }}
                >
                  DELETE
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
