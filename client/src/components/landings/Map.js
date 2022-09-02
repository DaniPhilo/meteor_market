import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import '../..//styles/styles.scss'

import { UserContext } from '../../context/user_context';

function Map() {

    const { isAuthenticated, setIsAuthenticated } = useContext(UserContext);

    const [landings, setLandings] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchLandings = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/astronomy/landings`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    credentials: 'include',
                });
                if (response.status === 403) {
                    setIsAuthenticated(false);
                }
                const data = await response.json();
                if (data.response) {
                    setLandings(data.landings);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        if (isAuthenticated) {
            fetchLandings();
        }
        else {
            navigate('/');
        }
    }, []);

    const handleSubmitByWeight = async (event) => {
        event.preventDefault();

        const weight = event.target.weight.value;
        const response = await fetch(`https://vast-castle-72865.herokuapp.com/api/astronomy/landings/minMass/${weight}`);
        const data = await response.json();
        if (data.response) {
            setLandings(data.landings);
            event.target.reset();
        }
    }

    const handleSubmitByClass = async (event) => {
        event.preventDefault();

        const _class = event.target._class.value;
        const response = await fetch(`https://vast-castle-72865.herokuapp.com/api/astronomy/landings/class/${_class}`);
        const data = await response.json();
        if (data.response) {
            setLandings(data.landings);
            event.target.reset();
        }
    }

    return (
        <section>
            <div className="map-title">
                <h2>Check out meteorite landings on the map:</h2>
            </div>
            <div className="map-form-container">
                <form action="" onSubmit={handleSubmitByWeight}>
                    <label htmlFor="weight">Filter by weight: </label>
                    <div>
                        <input type="number" name="weight" />
                        <button type='submit'>Filter</button>
                    </div>
                </form>
                <form action="" onSubmit={handleSubmitByClass}>
                    <label htmlFor="_class">Filter by class: </label>
                    <div>
                        <input type="text" name="_class" />
                        <button type='submit'>Filter</button>
                    </div>
                </form>
            </div>

            <MapContainer center={[40, -3]} zoom={5} scrollWheelZoom={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {landings.length > 0 && landings.map(landing => {
                    const { name, recclass, mass, year, reclat, reclong, _id } = landing;
                    if (reclat && reclong) {
                        return (
                            <Marker key={_id} position={[reclat, reclong]}>
                                <Popup>
                                    <ul className='map-popup-list'>
                                        <li><b>Name</b>: {name}</li>
                                        <li><b>Class</b>: {recclass}</li>
                                        <li><b>Mass</b>: {mass}</li>
                                        <li><b>Date</b>: {year && year.slice(0, 10)}</li>
                                    </ul>
                                </Popup>
                            </Marker>
                        )
                    }
                })}
            </MapContainer>
        </section>
    );

}

export default Map