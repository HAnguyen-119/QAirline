import React, { useState } from 'react';
import './Payment.css';
import {useLocation} from "react-router-dom";

export default function Payment() {
    const location = useLocation()
    const state = location.state
    console.log(state)
    return (
        <div>
            <h1>Payment</h1>
            <p>{state.code}</p>
        </div>
    )
}