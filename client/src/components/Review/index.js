import React from "react";
import { Route } from 'react-router-dom';
import { ImageDisplay } from "../ImageDisplay";

export const Review = ({ editId, location, rating, reviewText, username, imageUrls, setImageLinks, handleEditReview }) => {
  // const lorem =
  //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer auctor at sem sed facilisis. Vivamus congue arcu dolor, in ornare enim pulvinar a. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse fermentum lectus eget hendrerit sodales. Aliquam bibendum tortor sem, id placerat nunc fermentum.";
  let stars = "";
  for (let i = 0; i < rating; i++) {
    stars += "★";
  }

  const handleReviewClick = (e) => {
    const reviewBox = e.target.closest('.review-box');
    console.log(reviewBox.children);
    const descr = reviewBox.querySelector('.descr');
    descr.classList.toggle('rev-max-description');
  }


  const renderImages = () => {
    const imageContainer = document.querySelector('.image-position');
    imageContainer.classList.toggle('is-hidden');
    setImageLinks(imageUrls);
  }

  return (
    <div className="box review-box" id="edit-tag" data-location={location} data-rating={rating} data-review-text={reviewText} edit-id={editId}
      onClick={handleReviewClick}
    >
      <div className=" is-size-6 is-italic has-text-weight-medium">
        {location}
      </div>
      <div className="is-flex ">
        <div className="descr rev-max-description">{reviewText}</div>
      </div>
      <div>Rating {stars}</div>
      <Route exact path='/profile'>
        <div className="is-flex is-justify-content-end">
          <button className="button" onClick={handleEditReview}>Edit</button>
        </div>
      </Route>
      <div className="is-flex is-justify-content-space-between">
        {username}
        { imageUrls.length ? <img onClick={renderImages} src="https://img.icons8.com/color/48/000000/image.png"/> : null }
      </div>

    </div>
  );
};
