// react
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// component root
import NavTabs from '../NavTabs/index';
import Footer from '../Footer/index';

// pages
import Home from '../pages/Home/index';
import Login from '../pages/Login/index';
import Signup from '../pages/Signup/index';
import Write from '../pages/Write/index';

// style sheet
import './style.css';



function ReviewContainer() {
  return (

      <Router>
        <div>
          <NavTabs></NavTabs>
          <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/write" component={Write} />
            <Route render={() => <h1>Wrong page!</h1>} />
          </main>
          <Footer></Footer>
        </div>
      </Router>

  );
}

export default ReviewContainer;