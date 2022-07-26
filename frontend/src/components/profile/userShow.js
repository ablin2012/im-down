import React from 'react';
import { withRouter } from 'react-router-dom'
import { fetchCUOutgoingFR } from '../../actions/userActions';
import NavBarContainer from './../nav/navBarContainer';
class UserShow extends React.Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         challenges: [],
    //         achievements: []
    //     }
    // }

    componentDidMount() {
        // console.log(this.props.currentUser.id)
        // console.log(this.props.match.params)
        this.props.fetchUser(this.props.match.params.user_id)
    }

    // componentWillReceiveProps(newState) {
    //     console.log('um', newState);
    //     this.setState({ challenges: newState.challenges, achievements: newState.user.achievements });
    // }

    linkToChallenge(challengeId){
        return () => this.props.history.push(`/challenges/${challengeId}`)
    }

    renderAchievement(achievement){
        console.log("rendering achievement - achievements", this.props.achievements)
        if (!achievement.challenge) {return null}
        return (
        <div className="user-achievement-item" key={achievement._id} onClick={this.linkToChallenge(achievement.challenge._id)}>
            <img className="user-achievement-image" src={achievement.imageUrl||  window.defaultAchievementImgURL} alt="achievement-image"/>
            <p>
                {achievement.challenge.title ||= ""}
            </p>
        </div>

        )
    }

    renderParticipation(participation){
        console.log("rendering achievement - challenges", this.props.participation)
        if (!participation.challenge) {return null}
        return (
        <div className="user-participation-item" key={participation._id} onClick={this.linkToChallenge(participation.challenge._id)}> 
            <img className="user-participation-image" src={participation.challenge.imageUrl || ""} alt="participation-image"/>
            <p>
                {participation.challenge.title ||= ""}
            </p>
        </div>

        )
    }

    render() {
        
        if (!this.props.user || !this.props.achievements || !this.props.participations) {
            return null
        } else {
            const { user, achievements, participations, friendships, currentUser, openModal, sendFriendRequest, unsendFriendRequest, CUOutgoingFR, fetchCUOutgoingFR } = this.props
            let { username, imageUrl } = user
            
            console.log("participations",participations)
            
            
            imageUrl ||= ""
            const effectiveParticipations = participations.filter((participation) => {
                return (
                    participation.challenge && !participation.complete && new Date(participation.challenge.endDate) > new Date(new Date() - (24+9) * 60 * 60 * 1000)
                )
            }).sort(function(a, b){return new Date(a.challenge.endDate) - new Date(b.challenge.endtDate)})

            const isFriend = friendships.filter(friendship => (friendship.user1 === currentUser.id || friendship.user2 === currentUser.id )).length > 0

            const sentFriendRequest = CUOutgoingFR.filter(FR => FR.receiver === user._id).length > 0

            console.log("isfriend", isFriend)
            console.log("sentFriendRequest", sentFriendRequest)
            console.log("CUOutgoingFR", CUOutgoingFR)
            console.log("user._id", user._id)

            console.log("effectiveParticipations",effectiveParticipations)
            console.log(currentUser)
            console.log(achievements)
            console.log(friendships)
            // console.log("this is all achievements" , achievements)
            return (
                <>
                    <header>
                        <NavBarContainer parentCallback={this.handleCallback}/>
                    </header>

                    <div className="user-show-container">
                        <div className="user-header">
                            <img className="user-profile-image" src={ imageUrl ? imageUrl : window.defaultUserImgURL}/>
                            <div className="user-profile-info">
                                <div className='user-profile-info-sub'>
                                    <div className="user-profile-username">{username}</div>
                                    {
                                        currentUser.id === user._id? (
                                        <button className="edit-profile-button" onClick={() => openModal('updateCurrentUser')}>Edit Profile</button> 
                                        ): isFriend? (
                                        <button className="friend-button inactive">Friend</button> 
                                        ): sentFriendRequest? (
                                            <button className="unsend-friend-request-button" onClick={() => unsendFriendRequest(user._id).then(() => fetchCUOutgoingFR())}>Unsend Friend Request</button> 
                                            ): (
                                        <button className="add-friend-button" onClick={() => sendFriendRequest(user._id).then(() => fetchCUOutgoingFR())}>Add Friend</button> 
                                        )
                                    }
                                </div>
                                <div className='user-profile-info-sub'>
                                    <div> <span className="bold">{effectiveParticipations.length}</span>{` Current Challenge${effectiveParticipations.length>1 ? "s" : ""}`}</div>
                                    <div> <span className="bold">{achievements.length}</span>{` Achievement${achievements.length>1 ? "s" : ""}`}</div>
                                    <div> <span className="bold">{friendships.length}</span>{` Friend${friendships.length>1 ? "s" : ""}`}</div>
                                </div>
                            </div>
                        </div>
                        {effectiveParticipations.length>0 ? 
                        <>
                            <h2 className="section-header">Current challenges</h2>
                            <div className="user-participations-container">{
                                effectiveParticipations.map((participation) => this.renderParticipation(participation))
                            }</div>
                        </> : <h2 className="section-header">No current challenges</h2>
                        }
                        {achievements.length>0 ? 
                        <>
                            <h2 className="section-header">Achievements</h2>
                            <div className="user-achievements-container">{
                                achievements.map((achievement) => this.renderAchievement(achievement))
                            }</div>
                        </> :  <h2 className="section-header">No achievements</h2>
                        }

                    </div>
                </>
            );
        }
    }
}

export default withRouter(UserShow);
