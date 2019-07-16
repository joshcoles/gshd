import React, { Component } from 'react';

class CreateDog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      location: '',
      rating: 0,
      image: ''
    }

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onRatingChange = this.onRatingChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onTitleChange(e) {
    this.setState({
      title: e.target.value
    });
  }

  onLocationChange(e) {
    this.setState({
      location: e.target.value
    });
  }

  onRatingChange(e) {
    this.setState({
      rating: e.target.value
    });
  }

  onImageChange(e) {
    this.setState({
      location: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(`
    
      Form Submitted
      ==============

      title: ${this.state.title}
      location: ${this.state.location}
      rating: ${this.state.rating}
      image: ${this.state.image}
    
    `)

    this.setState({
      title: '',
      location: '',
      rating: 0,
      image: ''
    })
  }

  render() {
    return (
      <div>
        <h1>CreateDog</h1>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="title">Enter Title</label>
          <input 
            name="title" 
            type="text" 
            placeholder="Tasty boi" 
            onChange={this.onTitleChange} 
            value={this.state.title}/>

          <label htmlFor="location">Enter Location</label>
          <input name="location" type="text" placeholder="Costco" onChange={this.onLocationChange} value={this.state.location}/>

          <label htmlFor="rating">Enter Rating out of 10</label>
          <input name="rating" type="text" placeholder="7.5" onChange={this.onRatingChange} value={this.state.rating}/>

          <label htmlFor="title">Add Image</label>
          <input name="image" type="text" placeholder="https://www.imgur.com/gshd" onChange={this.onImageChange} value={this.state.image}/>
            
          <input type="submit" value="Create Dog"/>
        </form>
      </div>
    )
  }
}

export default CreateDog;
