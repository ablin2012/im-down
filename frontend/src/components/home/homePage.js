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
            challenges: []
        }
        this.handleCallback = this.handleCallback.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    componentWillMount() {
        this.props.fetchUserChallenges(this.props.currentUser.id);
    }

    componentWillReceiveProps(newState) {
        this.setState({ challenges: newState.challenges})
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
        let icon;
        if (this.props.currentUser.imageUrl) {
            icon = (<img className="icon" src={this.props.currentUser.imageUrl} />)
        } else {
            icon = (<div className="letter-icon">{this.props.currentUser.username.slice(0,1)}</div>)
        }
        return (
            <>
                <header>
                    <NavBarContainer parentCallback={this.handleCallback} />
                </header>
                <div className="home-page">
                    <div className="sticky-bar">
                        <ProfileCardContainer />
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
                        <PostIndexContainer />
                    </div>
                    <div className="sticky-bar scrollable">
                        <h3>My Challenges</h3>
                        {this.state.challenges.map((challenge) => (
                            <ChallengeCard challenge={challenge} />
                        ))}
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(HomePage);