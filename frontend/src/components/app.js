import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/routeUtil';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navBarContainer';

import MainPage from './main/mainPage';
import LoginFormContainer from './session/loginFormContainer';
import SignupFormContainer from './session/signupFormContainer';
import ChallengesIndexContainer from './challenges/challengesIndexContainer';
import ProfileContainer from './profile/profileContainer';
import ChallengeForm from './challenges/challengeForm';


const App = () => (
    <div>
        <NavBarContainer />
        <Switch>
            <AuthRoute exact path="/" component={MainPage} />
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />

            <ProtectedRoute exact path="/challenges" component={ChallengesIndexContainer}/>
            <ProtectedRoute exact path="/profile" component={ProfileContainer} />
            <ProtectedRoute exact path="/profile" component={ChallengeForm} />
        </Switch>
    </div>
);

export default App;