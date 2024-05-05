import React, { Component } from 'react';

import './item-details.css';
import Spinner from '../spinner';


const Record = ({item, field, label}) => {
  return(
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  )
}

export {
  Record
}

export default class ItemDetails extends Component {

  state = {
    item: null,
    image:null,
    loading: false
  }

  componentDidMount(){
    this.updateItem();
  }

  componentDidUpdate(prevProps){
    if(this.props.itemId !== prevProps.itemId ||
      this.props.getData !== prevProps.getData ||
      this.props.getImageUrl !== prevProps.getImageUrl
      )
    {
      this.setState({loading: true})
      this.updateItem();
    } 
  }

  updateItem() {
    
    const {itemId, getData, getImageUrl} = this.props;

    if(!itemId) {
      return
    }
    getData(itemId)
      .then((item) => {
        this.setState({item, image: getImageUrl(item), loading: false})
      })
  }

  render() {

    const {item, image, loading} = this.state;

    if(!item && !loading) {
     return <span>Select a item from a list</span>
    // return <Spinner/>
    }
    if(loading) return <Spinner/>
    const {name} = item;

    // const content = loading ? <Spinner/> : <ItemView item={item} imageUrl={image} />

    return (
      <div className="person-details card">
        <img className="person-image"
        src={image}
        alt='item'/>
      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {
            React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {item});
            })
          }
          {/* <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li> */}
        </ul>
      </div>
      </div>
    )
  }
}
