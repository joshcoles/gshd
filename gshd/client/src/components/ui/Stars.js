import React, { Component } from 'react'; 

class Stars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: this.props.rating
    }

  }

  render() {
  
    const rating = this.state.rating;

    console.log(rating);

    return (
      <fieldset onChange={this.props.onRatingChange} className={`${this.props.mutable ? 'mutable' : 'immutable'}`}>
          <input defaultChecked={rating === 5} type="radio" id="star5" name="rating" value={5} />
          <label htmlFor="star5" title="5 stars">
            <span className="icon">
              <i className="fas fa-star"></i>
            </span>
          </label>

          <input defaultChecked={rating === 4} type="radio" id="star4" name="rating" value={4} />
          <label htmlFor="star4" title="4 stars">
            <span className="icon">
              <i className="fas fa-star"></i>
            </span>
          </label>

          <input defaultChecked={rating === 3} type="radio" id="star3" name="rating" value={3} />
          <label htmlFor="star3" title="3 stars">
            <span className="icon">
              <i className="fas fa-star"></i>
            </span>
          </label>

          <input defaultChecked={rating === 2} type="radio" id="star2" name="rating" value={2} />
          <label htmlFor="star2" title="2 stars">
            <span className="icon">
              <i className="fas fa-star"></i>
            </span>
          </label>

          <input defaultChecked={rating === 1} type="radio" id="star1" name="rating" value={1} />
          <label htmlFor="star1" title="1 star">
            <span className="icon">
              <i className="fas fa-star"></i>
            </span>
          </label>
      </fieldset>
    )
  }
}




export default Stars;