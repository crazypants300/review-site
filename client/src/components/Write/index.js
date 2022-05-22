import React, { useState } from "react";
import AutoComplete from "../Autocomplete";
import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../../utils/mutations";
import { ImageUpload } from '../ImageUpload';
import { GET_REVIEWS } from "../../utils/query";

// review form
export default function Write() {
  const [addReview, { loading, error, reset }] = useMutation(ADD_REVIEW, {
    refetchQueries: [
      GET_REVIEWS, // DocumentNode object parsed with gql
      'GetReviews' // Query name
    ]
  });
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);
  const [location, setLocation] = useState("");

  const [searchInputVal, setSearchInputVal ] = useState("");

  const [submitButtonValue, setSubmitButtonValue] = useState("Submit");
  if (loading) {
    console.log('loading...');
    setSubmitButtonValue('Submitting...')
  };
  if (error) return `Submission error! ${error.message}`;

  const handleLocationChange = (e) => {
    console.log(e.target.value);
    setLocation(e.target.value);
  };

  const handleReviewChange = (e) => {
    console.log(e.target.value);
    setReviewText(e.target.value);
  };

  const handleRatingChange = (e) => {
    console.log(e.target.value);
    setRating(parseInt(e.target.value));
  };

  const handleAddReview = () => {
    // reset input values
    const searchInputEl = document.querySelector('.searchInput');
    const addReviewTextEl = document.querySelector('.addReviewText');
    const ratingEl = document.querySelector('.reviewRating');

    searchInputEl.value = '';
    addReviewTextEl.value = '';
    ratingEl.value = 1;
    setSubmitButtonValue('Submit');

    const addReviewEl = document.querySelector('.write-container');
    addReviewEl.classList.toggle('is-hidden');


  };

  const handleImageUpload = async (e) => {
    e.preventDefault();

    const imageInput = document.querySelector('#image-input');

    const files = imageInput.files;
    //console.log(files);

    setSubmitButtonValue('Submitting...')
    const uploadUrlArray = await fetch(`/s3URL/${files.length}`).then(res => res.json());
    //console.log(uploadUrlArray.url);

    let imageUrls = [];

    for (let i = 0; i < uploadUrlArray.url.length; i++) {
      //console.log(url);
      const url = uploadUrlArray.url[i];

      await fetch(url, {
        method: "PUT",
        header: {
          "Content-Type": "multipart-form-data"
        },
        body: files[i]
      });

      const imageUrl = url.split('?')[0];
      imageUrls.push(imageUrl);
      //console.log(imageUrls);
      // console.log('=================');
      // console.log(imageUrl);
    }
    return imageUrls;
  }


  return (
    <div className="write-position is-hidden write-bg write-container mobile-p">
      <div className='is-flex is-justify-content-space-between'>
        <h1 className="title mobile-title">Add Review</h1>
        <button className='delete' onClick={handleAddReview}></button>
      </div>

      <form
        className="is-flex is-flex-direction-column"
        onSubmit={async (e) => {
          //e.preventDefault();
          console.log(loading);
          const imageUrls = await handleImageUpload(e);
          console.log(imageUrls);
          addReview({ variables: { reviewText, rating, location, imageUrls } });
          console.log(loading);
          // use reset so it doesnt remove the whole addreview element
          reset();
          handleAddReview();
        }}
      >
        <div className='mb-1'>
          <AutoComplete change={handleLocationChange} />
        </div>

        <textarea
          className="addReviewText textarea mb-1"
          onChange={handleReviewChange}
          placeholder="Add review text here..."
        ></textarea>
        <select className="select reviewRating" id="stars" onChange={handleRatingChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <ImageUpload></ImageUpload>
        <button type="submit" className="button">
          {submitButtonValue}
        </button>
      </form>

    </div>
  );
}
