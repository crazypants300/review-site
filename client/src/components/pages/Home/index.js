import React, { useEffect, useState } from 'react';
import './style.css'
// componenets
import { Review } from '../../Review';
import { Hero } from '../../Hero';
import AutoComplete from '../../Autocomplete';

import { GET_REVIEWS } from '../../../utils/query';
import { useQuery } from '@apollo/client';


const Home = () => {

  const [userData, setUserData] = useState([]);
  const { loading, error, data } = useQuery(GET_REVIEWS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  console.log(data);

  return (
    <div className="homepage mb-8">
      <Hero></Hero>
      <div className='container mt-2'>
        {data.reviews.map(review => {
          console.log(review);
          return (
            <Review key={review._id} location={review.location} reviewText={review.reviewText} username={review.username} rating={review.rating} />
          )
        })}
      </div>
    </div>
  );
}

export default Home;