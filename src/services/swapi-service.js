export default class SwapiService {

  _apiBase = 'https://swapi.dev/api';
  // _apiBase = 'https://rickandmortyapi.com/api/';
  _imageUrl = 'https://starwars-visualguide.com/assets/img';

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json();
  }

  getPersonImage = ({id}) => {
    return `${this._imageUrl}/characters/${id}.jpg`
  }

  getStarshipImage = ({id}) => {
    return `${this._imageUrl}/starships/${id}.jpg`
  }

  getPlanetImage = ({id}) => {
    return `${this._imageUrl}/planets/${id}.jpg`
  }


  getAllPeople = async () =>{
    const res = await this.getResource(`/people/`);
    return res.results.map(this._transformPerson).slice(0, 5);
  }

  getPerson = async (id) => {
    const person = await this.getResource(`/people/${id}/`);
    return this._transformPerson(person);
  }

  getAllPlanets = async () => {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._transformPlanet).slice(0, 5);
  }

  getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet)
  }

  getAllStarships = async () => {
    const res = await this.getResource(`/starships/`);
    return res.results.map(this._transformStarship).slice(0, 5);
  }

  getStarship = async (id) => {
    const starship = await this.getResource(`/starships/${id}/`);
    return this._transformStarship(starship)
  }

  _extractID = (item) => {
    return item.url.replace(/\D/gi, '');
  }

  _transformPlanet = (planet) => {
    return {
      id: this._extractID(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    }
  }

  _transformStarship = (starship) => {
    return {
      id: this._extractID(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passangers: starship.passangers,
      cargoCapacity: starship.cargoCapacity
    }
  }

  _transformPerson = (person) => {
    return {
      id: this._extractID(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor,
    }
  }
}
