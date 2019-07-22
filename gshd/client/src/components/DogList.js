import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Gshd = (props) => (
  <li>{props.gshd.gshd_title}<Link to={`/edit-dog/${props.gshd._id}`}>Edit</Link></li>

)

class DogList extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      gshds: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/gshds/')
      .then(response => {
        this.setState({
          gshds: response.data
        })
      })
      .catch(error => console.log(error));
  }

  dogList() {
    return this.state.gshds.map((gshd, index) => 
        <Gshd gshd={gshd} key={index} />
      )
  }

  render() {

    // const gshds = this.state.gshds.map((gshd) => 
    //   <li key={gshd._id}>{gshd.gshd_title}</li>
    // );
    console.log(this.state.gshds)
    return (
      <div>
        <h1>DogList</h1>
        <ul>
         {/* {
           this.state.gshds.map((gshd) => 
            <li key={gshd._id}>{gshd.gshd_title}</li>
          )
        } */}
        {
          this.dogList()
        }
        </ul>
      </div>
    )
  }
}

export default DogList;
