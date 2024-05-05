import React from "react";
import { PersonDetails, PersonList } from "../sw-components";
import Row from "../row";
import {useNavigate, useParams} from 'react-router-dom'


const PeoplePage = () => {

    let navigate = useNavigate();
    let {id} = useParams()
    return (
        <Row 
            left={<PersonList onItemSelected={(id) => {navigate(`/people/${id}`)}}/>} 
            right={<PersonDetails itemId={id}/>}/>

    )
}

export default PeoplePage;
