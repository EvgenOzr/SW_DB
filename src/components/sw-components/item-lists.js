import React from 'react';
import ItemList from '../item-list/'
import {withData, withSwapiService} from '../hoc-helper/'


const withChildFunction = (Wrapped, fn) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        )
    }
}

const mapPersonMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPeople
    }
}
const mapPlanetMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPlanets
    }
}
const mapStarshipMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllStarships
    }
}
const ListWithChildren = withChildFunction (ItemList, ({name}) => <span>{name}</span>)
const renderModelAndName = ({model, name, id}) => <span>{name} ({model}) (id:{id})</span>

const PersonList = withSwapiService(withData(ListWithChildren), mapPersonMethodsToProps)
const PlanetList = withSwapiService(withData(ListWithChildren), mapPlanetMethodsToProps)
const StarshipsList = withSwapiService(withData(withChildFunction(ItemList, renderModelAndName)), mapStarshipMethodsToProps)

export {
    PersonList,
    PlanetList,
    StarshipsList
}