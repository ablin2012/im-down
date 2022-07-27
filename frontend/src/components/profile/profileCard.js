import React from "react";
import './profile.css'

class ProfileCard extends React.Component {
    render () {
        const profilePic = (this.props.currentUser.imageUrl) ? (
            <img className="icon card" src={this.props.currentUser.imageUrl} />
        ): (null)
        return (
            <div className="profile-card">
                <div className="profile-card-head">
                    <div className="user-icon card">
                        {profilePic}
                    </div>
                </div>
                <div className="profile-card-body">
                    <h3 className="highlight">{this.props.currentUser.username}</h3>
                    <div className="data-container">
                        <div className="data-names">
                            <div className="data-text">Challenges Complete</div>
                            <div className="data-text">Longest Streak</div>
                            <div className="data-text">Current Streak</div>
                            <div className="data-text">Friends</div>
                        </div>
                        <div className="data-values">
                            <div className="data-text">val</div>
                            <div className="data-text">val</div>
                            <div className="data-text">val</div>
                            <div className="data-text">val</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileCard;