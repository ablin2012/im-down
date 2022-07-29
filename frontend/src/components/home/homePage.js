import React from "react";
import { withRouter } from 'react-router-dom';
import PostIndexContainer from '../posts/postsIndexContainer';
import ProfileCardContainer from '../profile/profileCardContainer';
import './home.css';
import ChallengeCard from "../challenges/challengeCard";

import NavBarContainer from '../nav/navBarContainer';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            challenges: [],
            participations: [],
            friendships:[]
        }
        this.handleCallback = this.handleCallback.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    componentWillMount() {
        this.props.fetchUserChallenges(this.props.currentUser.id);
        this.props.fetchUserParticipations(this.props.currentUser.id);
        this.props.fetchUserAchievements(this.props.currentUser.id);
        this.props.fetchUserFriendships(this.props.currentUser.id);
    }

    componentWillReceiveProps(newState) {
        let parts = [];
        if (newState.participations) {
            parts = newState.participations.map(parts => (parts.challenge._id))
        }

        console.log("CHECK NEWSTATE PARTICIPATIONS", newState.participations)
        console.log("parts", parts)
        this.setState({ challenges: newState.challenges, participations: parts, friendships: newState.friendships})

    }
    
    handleCallback = (navSearchData) => this.setState({'filter': navSearchData})

    handleSearch() {
        if(this.state.filter === "") {
            return this.state.challenges
        } else {
            return this.state.challenges.filter(card => card.title.match(new RegExp(this.state.filter, "i")) || card.description.match(new RegExp(this.state.filter, "i")))
        }
    }

    render() {
        console.log(this.state)
        let icon;
        if (this.props.currentUser.imageUrl) {
            icon = (<img className="icon" src={this.props.currentUser.imageUrl} />)
        } else {
            icon = (<div className="letter-icon">{this.props.currentUser.username.slice(0,1)}</div>)
        }
        console.log("CHECK STATE PARTICIPATIONS", this.state.participations)
        console.log("CHECK STATE FRIENDSHIPS", this.state.friendships)
        return (
            <>
                <header>
                    <NavBarContainer parentCallback={this.handleCallback} />
                </header>
                <div className="home-page">
                    <div className="sticky-bar">
                        <ProfileCardContainer participations={this.state.participations} createdChallenges={this.state.challenges} friendships={this.state.friendships}/>
                        <div className="category-links">
                            <div className="category-links-body">
                                <h3 className="highlight">My Categories</h3>
                                <div className="category-links-list">
                                    <small className="link-item">Fitness</small>
                                    <small className="link-item">Food</small>
                                    <small className="link-item">Learning</small>
                                    <small className="link-item">Fun</small>
                                    <small className="link-item">Creative</small>
                                    <small className="link-item">Travel</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="false-input-container">
                            <div className="user-icon">
                                {icon}
                            </div>
                            <button className="false-input" onClick={() => this.props.openModal('createChallenge')}>Start a challenge</button>
                        </div>
                        <PostIndexContainer participations={this.state.participations} friendships={this.state.friendships}/>
                    </div>
                    <div className="sticky-bar scrollable">
                        <h3>My Current Challenges</h3>
                        {this.state.participations.map((challenge) => (
                            <ChallengeCard key={challenge._id} challenge={challenge} />
                        ))}
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(HomePage);