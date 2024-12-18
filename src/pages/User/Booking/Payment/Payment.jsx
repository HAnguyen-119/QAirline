import React, {useEffect, useState} from 'react';
import './Payment.css';
import {useLocation, useNavigate} from "react-router-dom";

export default function Payment() {
    const navigate = useNavigate();
    const location = useLocation()
    const state = location.state
    useEffect(() => {
        const handleBackNavigation = (e) => {
            e.preventDefault();
            navigate("/booking");
        };

        window.addEventListener("popstate", handleBackNavigation);

        return () => {
            window.removeEventListener("popstate", handleBackNavigation);
        };
    }, [navigate]);
    console.log(state)
    return (
        <div>
            <h1>Payment</h1>
            <p>Your booking code is: {state.code}</p>
        </div>
    )
}