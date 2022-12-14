import React, { useState, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'

function Image() {

    const [apod, setApod] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchApod() {
            const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=xkG1fcvkAYkhPdGuforBegxaGE1oQtigQNcf6gu3');
            const data = await response.json();
            setApod(data);
            setIsLoading(false);
        }

        fetchApod();
    }, []);

    return (
        <section className='image-section'>
            {isLoading ?
                <div className="loading"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
                :
                <>
                    <div className="welcome">
                        <h2>Welcome to <span>Meteor Market</span>!</h2>
                        <h3>Your <span>meteorites</span> and <span>asteroids</span> shop</h3>
                        <div className="welcome-info">
                            <p>Here you will find:</p>
                            <ul>
                                <li><span className='intro-list-title'>Meteorites</span>: objects that fall into Earth's surface (check out our <span className='intro-links'>Landings section</span>).</li>
                                <li><span className='intro-list-title'>Near-Earth Asteroids</span>: minor planets and bodies of rock that orbit the sun (check out our <span className='intro-links'>NEAs section)</span>.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="apod">
                        <div className="apod-title">
                            <h3>Astronomic Picture of the Day</h3>
                            <h4>{apod.title} ({apod.date})</h4>
                        </div>

                        <div className="image-container">
                            <img src={apod.url} alt="" />
                            <p>{apod.explanation}</p>
                        </div>
                    </div>

                </>
            }
        </section>
    )
}

export default Image