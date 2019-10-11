import React, { Component } from 'react'; 
import './stars.scss';

class Stars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: parseInt(this.props.rating)
    }

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      rating: parseInt(nextProps.rating)
    }, () => {
    });
  }

  render() {
  
    const rating = this.state.rating;
    
    return (
      <div>
        <input onChange={this.props.onRatingChange} checked={rating === 5} type="radio" id="star5" name="rating" value={5} />
        <label htmlFor="star5" title="5 stars">
          <span className="icon">
            <i className="fas fa-star"></i>
          </span>
        </label>

        <input onChange={this.props.onRatingChange} checked={rating === 4} type="radio" id="star4" name="rating" value={4} />
        <label htmlFor="star4" title="4 stars">
          <span className="icon">
            <i className="fas fa-star"></i>
          </span>
        </label>

        <input onChange={this.props.onRatingChange} checked={rating === 3} type="radio" id="star3" name="rating" value={3} />
        <label htmlFor="star3" title="3 stars">
          <span className="icon">
            <i className="fas fa-star"></i>
          </span>
        </label>

        <input onChange={this.props.onRatingChange} checked={rating === 2} type="radio" id="star2" name="rating" value={2} />
        <label htmlFor="star2" title="2 stars">
          <span className="icon">
            <i className="fas fa-star"></i>
          </span>
        </label>

        <input onChange={this.props.onRatingChange} checked={rating === 1} type="radio" id="star1" name="rating" value={1} />
        <label htmlFor="star1" title="1 star">
          <span className="icon">
            <i className="fas fa-star"></i>
          </span>
        </label>
      </div>
    )
  }
}




export default Stars;