import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/routeUtil';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navBarContainer';

import MainPage from './main/mainPage';
import LoginFormContainer from './session/loginFormContainer';
import SignupFormContainer from './session/signupFormContainer';
import ChallengesIndexContainer from './challenges/challengesIndexContainer';
import ProfileContainer from './profile/profileContainer';
import ChallengeForm from './challenges/challengeForm';
import PostsIndexContainer from './posts/postsIndexContainer';

import Modal from './modal/modal';


const App = () => (
    <div className='main-wrap'>
        <Modal />
        <header>
            <NavBarContainer />
        </header>
        <Switch>
            <AuthRoute exact path="/" component={MainPage} />
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />

            <Route exact path="/challenges" component={ChallengesIndexContainer}/>
            <ProtectedRoute exact path="/posts" component={PostsIndexContainer} />
            <ProtectedRoute exact path="/profile" component={ProfileContainer} />
            {/* <ProtectedRoute exact path="/challenge_form" component={ChallengeForm} /> */}
        </Switch>
    </div>
);

export default App;