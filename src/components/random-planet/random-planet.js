import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service'
import './random-planet.css';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator/error-indicator';
import PropTypes from 'prop-types'


export default class RandomPlanet extends Component {

	static defaultProps = {
		updateInterval: 10000
	}
	

	static propTypes = {
		updateInterval: PropTypes.number
	}
	
	swapiService = new SwapiService();

	state = {
		planet: {},
		loading: true,
		error: false
	}

	// constructor(){
	// 	super();
	// 	this.updatePlanet();
	// }

	componentDidMount(){
		const {updateInterval} = this.props;
		this.updatePlanet();
		this.timerID = setInterval(this.updatePlanet, updateInterval)
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	onPlanetLoaded = (planet) =>{
		this.setState({planet, loading: false, error: false})
	}

	onError = (err) => {
		this.setState({error: true, loading: false})
	}

	updatePlanet = () =>{
		const id = Math.floor(Math.random()*17) + 2;
		this.swapiService
			.getPlanet(id)
			.then(this.onPlanetLoaded)
			.catch(this.onError)
	}

	render() {

		const { planet, loading, error } = this.state;


		let content = loading ? <Spinner/> : <PlanetView planet={planet}/>
		if(error) content = <ErrorIndicator/>

		return (
		<div className="random-planet jumbotron rounded card">
			{content}
		</div>

		);
	}
}

const PlanetView = ({planet}) => {

	const {id, name, population, rotationPeriod, diameter} = planet;

	return (
		<>
			<img className="planet-image"
				src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} 
				alt='planet'/>
			<div>
				<h4>{name}</h4>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">
						<span className="term">Population</span>
						<span>{population}</span>
					</li>
					<li className="list-group-item">
						<span className="term">Rotation Period</span>
						<span>{rotationPeriod}</span>
					</li>
					<li className="list-group-item">
						<span className="term">Diameter</span>
						<span>{diameter}</span>
					</li>
				</ul>
			</div>
		</>
	)

}

