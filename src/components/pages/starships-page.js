import React from "react";
import {  StarshipsList } from "../sw-components";
import {useNavigate} from 'react-router-dom'

const StarshipsPage = () => {

    let navigate = useNavigate();

    return (
        <StarshipsList onItemSelected = {(itemId) => {navigate(itemId)}}/>
    )
}

export default StarshipsPage;
