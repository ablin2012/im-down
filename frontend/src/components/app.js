import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/routeUtil';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navBarContainer';

import MainPage from './main/mainPage';
import LoginFormContainer from './session/loginFormContainer';
import SignupFormContainer from './session/signupFormContainer';
import ChallengesIndexContainer from './challenges/challengesIndexContainer';
import ProfileContainer from './profile/profileContainer';
import UserShowContainer from './profile/userShowContainer'
import UserEditFormContainer from './profile/userEditFormContainer'
import ChallengeForm from './challenges/challengeForm';
import PostsIndexContainer from './posts/postsIndexContainer';
import CategoryIndexContainer from './challenges/categoryIndexContainer';

import ChallengeShowContainer from './challenges/challengeShowContainer';
import ChallengeEditFormContainer from './challenges/challengeEditFormContainer';
import HomePageContainer from './home/homePageContainer';
import AboutUs from './aboutus/aboutUs';

import Modal from './modal/modal';


const App = () => (
    <div className='main-wrap'>
    <Modal />
            <Switch>
                <AuthRoute exact path="/" component={MainPage} />
                <AuthRoute exact path="/login" component={LoginFormContainer} />
                <AuthRoute exact path="/signup" component={SignupFormContainer} />


                <ProtectedRoute exact path="/challenges/:challengeId" component={ChallengeShowContainer} />
                {/* <ProtectedRoute exact path="/challenges/:challengeId" component={ChallengeEditFormContainer} /> */}
                <ProtectedRoute exact path="/home" component={HomePageContainer} />
                <Route exact path="/aboutUs" component={AboutUs} />
                <ProtectedRoute exact path="/posts" component={PostsIndexContainer} />
                <ProtectedRoute exact path="/challenges" component={ChallengesIndexContainer}/>
                <ProtectedRoute exact path="/challenges/category" component={CategoryIndexContainer}/>
                <ProtectedRoute exact path="/profile" component={ProfileContainer} />
                <ProtectedRoute exact path="/users/:user_id" component={UserShowContainer} />
                {/* <ProtectedRoute exact path="/users/current/edit" component={UserEditFormContainer} /> */}
            </Switch>

    </div>

);

export default App;