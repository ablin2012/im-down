import React from "react";
import './profile.css';
import { Link } from "react-router-dom";

class ProfileCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            participations: [],
            achievements: [],
            createdChallenges: [],
            friendships: []
        }
    }

    componentWillReceiveProps(newState) {
        console.log('profilecard', newState)
        this.setState({createdChallenges: newState.createdChallenges, participations: newState.participations, friendships: newState.friendships })
    }
    render () {
        if (!this.state.friendships){return null}
        const profilePic = (this.props.currentUser.imageUrl) ? (
            <img className="icon card" src={this.props.currentUser.imageUrl} />
        ): (null)
        console.log("PROFIL CARD PARTICIPATION STATE", this.state.participations)
        console.log("PROFIL CARD PARTICIPATION PROP", this.props.participations)
        return (
            <div className="profile-card">
                <div className="profile-card-head">
                    <div className="user-icon card">
                        <Link to={`/users/${this.props.currentUser.id}`}>
                            {profilePic}
                        </Link>
                    </div>
                </div>
                <div className="profile-card-body">
                    <Link to={`/users/${this.props.currentUser.id}`}>
                        <h3 className="highlight">{this.props.currentUser.username}</h3>
                    </Link>
                    <div className="data-container">
                        <div className="data-names">
                            <div className="data-text">Challenges Complete</div>
                            <div className="data-text">Challenges Created</div>
                            <div className="data-text">Current Challenges</div>
                            <div className="data-text">Friends</div>
                        </div>
                        <div className="data-values">
                            <div className="data-text achieved">{this.state.achievements.length}</div>
                            <div className="data-text created">{this.state.createdChallenges.length}</div>
                            <div className="data-text participating">{this.state.participations.length}</div>
                            <div className="data-text friends">{this.state.friendships.length}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileCard;