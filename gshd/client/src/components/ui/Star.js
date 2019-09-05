import React from 'react'; 

const star = (props) => {

  // A number, 5-1, that represents which exact star we are working with
  const ratingNumber = props.number;

  // The default rating - taken from database if GSHD is being edited, or set to 1 if GSHD is being created
  const currentRating = props.currentRating;

  const idAndHtmlFor = `star${ratingNumber}`;
  const title = `${ratingNumber} stars`;

  return (
    <React.Fragment>
      <input defaultChecked={currentRating === ratingNumber} type="radio" id={idAndHtmlFor} name="rating" value={ratingNumber} />
      <label htmlFor={idAndHtmlFor} title={title}>
        <span className="icon">
          <i className="fas fa-star"></i>
        </span>
      </label>
    </React.Fragment>
  ); 
}

export default star;