import React from "react";
import { Link } from 'react-router-dom';
import { CgEnter } from "react-icons/cg";
import './LandingPage.css'

export default function LandingPage() {
    return (
        <div className="landing-contenedor">
            <div className="landing-image">
                {/* <img src={Landing} alt="" width="100%" height="100%"/> */}
                <h1 className="landing-text">Welcome to the Dogs App</h1>
                <div className="landing-link">
                <Link to='/home' className="landing-button">
                    <div className="landing-icon">
                        <CgEnter className="icon"/>
                    </div>
                    <span>HOME</span>
                </Link>
                </div>

            </div>
    </div>
    )
}