import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import './app.css';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import ErrorBoundry from '../error-boundry';
import { SwapiServiceProvider} from '../swapi-service-contex/swapi-service-context';
import { PeoplePage , PlanetsPage, StarshipsPage} from '../pages';
import { BrowserRouter as Router, Route, Routes, useParams, useLocation } from 'react-router-dom';
import { StarshipsDetails } from '../sw-components';


export default class App extends Component {

  // Fot testing Git
  state = {
    // showRandomPlanet: true,
    swapiService: new SwapiService(),
    hasError: false,
    isLoggedIn: false
  }


  onLogin = () => {
    this.setState({isLoggedIn: true})
  }

  componentDidCatch(){
    this.setState({hasError: true})
  }

  // toggleRandomPlanet = () => {
  //   this.setState((state) => {
  //     return {
  //       showRandomPlanet: !state.showRandomPlanet
  //     }
  //   })
  // }

  onChangeService = () => {
    console.log("change");
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService
      return {
        swapiService: new Service()
      }
    })
  }



  render(){

    const {isLoggedIn} = this.state;

    let StarshipsDetailsId = () => {
      let {id} = useParams()
      return <StarshipsDetails itemId={id}/>
    }

    // let LoginPageMain = () => {
    //   return <LoginPage
    // }

    let NoMatch = () => {
      let location = useLocation();
    
      return (
        <div>
          <h3>
            No match for <code>{location.pathname}</code>
          </h3>
        </div>
      );
    }
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
        <Router>
            <div className='stardb-app'>
              <Header onChangeService={this.onChangeService}/>
              <RandomPlanet/>
                <Routes>
                    {/* <Route path='/' render = {() => <h2>Welcome to StarDB</h2>}/> */}
                    <Route path='/' element={<h2>Welcome to StarDB</h2>}/>
                    <Route path='/people/:id?' element={<PeoplePage/>}/>
                    <Route path='/planets' element={<PlanetsPage/>}/>
                    <Route path='/starships' element={<StarshipsPage/>}/>
                    <Route path='/starships/:id' element={<StarshipsDetailsId/>}/>
                    <Route path='*' element={<NoMatch/>}/>
                </Routes>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
};
