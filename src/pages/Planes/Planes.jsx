import './Planes.css'
import {useLocation, useNavigate} from "react-router-dom";

export default function Planes() {
    const location = useLocation();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const branch = searchParams.get('branch');
    const company = searchParams.get("company");
    const original = searchParams.get('original');
    const seats = searchParams.get('seats');

    const checkSeats = (seat, range) => {
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

    const filteredPlanes = planesInfo.filter((plane) => {
        return (!id || plane.id === id)
            && (!branch || plane.branch === branch)
            && (!company || plane.company === company)
            && (!original || plane.original === original)
            && (checkSeats(plane.seats, seats));
    })

    const clearFilters = () => {
        const idFilter = document.getElementById("id-filter");
        const branchFilter = document.getElementById("branch-filter");
        const companyFilter = document.getElementById("company-filter");
        const originalFilter = document.getElementById("original-filter");
        const seatsFilter = document.getElementById("seats-filter");
        idFilter.value = "";
        branchFilter.value = "";
        companyFilter.value = "";
        originalFilter.value = "";
        seatsFilter.value = "";
        searchWithFilter();
    }

    const searchWithFilter = () => {
        const idValue = document.getElementById("id-filter").value;
        const branchValue = document.getElementById("branch-filter").value;
        const companyValue = document.getElementById("company-filter").value;
        const originalValue = document.getElementById("original-filter").value;
        const seatsValue = document.getElementById("seats-filter").value;
        let params = new URLSearchParams({
            'id': idValue,
            'branch': branchValue,
            'original': originalValue,
            'company': companyValue,
            'seats': seatsValue,
        }).toString();
        navigate(`?${params}`);
    }

    return (
        <div className="planes">
            <div className="planes-filter">
                <div className="filters">
                    ID <input type="text" id="id-filter"/>
                    Branch <input type="text" id="branch-filter"/>
                    Company <input type="text" id="company-filter"/>
                    Original <input type="text" id="original-filter"/>
                    Number of seats <select id="seats-filter">
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
                    <th>Branch</th>
                    <th>Company</th>
                    <th>Original</th>
                    <th>Number of seats</th>
                    <th>Edit</th>
                </tr>
                {filteredPlanes.map((plane, index) =>
                    <tr key={plane.id}>
                        <td>{index + 1}</td>
                        <td>{plane.id}</td>
                        <td>{plane.branch}</td>
                        <td>{plane.company}</td>
                        <td>{plane.original}</td>
                        <td>{plane.seats}</td>
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

export const planesInfo = [
    {
        id: "fwf3e",
        branch: "Boeing123",
        company: "Boeing",
        original: "USA",
        seats: 98,
    },
    {
        id: "cs3r3",
        branch: "Boeing987",
        company: "Boeing",
        original: "France",
        seats: 200,
    },
    {
        id: "ety88",
        branch: "Airbus124",
        company: "Airbus",
        original: "France",
        seats: 110,
    },
    {
        id: "nth56",
        branch: "sgwrgrg",
        company: "Abscscc",
        original: "USA",
        seats: 240,
    },
]
