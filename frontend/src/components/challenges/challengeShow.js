import React from "react";
import { withRouter } from 'react-router-dom';
import NavBarContainer from "../nav/navBarContainer";
import './challengeShow.scss'
import ChallengePostsIndexContainer from "./challengePostsIndexContainer";

class ChallengeShow extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            imageUrl: null,
            imageFile: null,
            postText: "",
            postType: "update",
            participations: [],
            btn: null,
            challenge: {}
        }
        this.dateParser = this.dateParser.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleJoin = this.handleJoin.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this)
    }

    componentDidMount() {
        // console.log('show', this.props)
        this.props.fetchChallenge(this.props.match.params.challengeId)
            .then(this.props.fetchChallengePosts(this.props.match.params.challengeId))
            // .then(this.props.getChallengeParticipants(this.props.match.params.challengeId))
            // .then(() => {this.props.fetchChallengePosts(this.props.challenge.id)})
        
        this.props.fetchUser(this.props.currentUser.id)
        this.props.fetchUserParticipations(this.props.currentUser.id);
    }

    componentWillReceiveProps(newState) {
        let parts = [];
        if (newState.participations) {
            parts = newState.participations.map(part => (part.challenge._id))
        }
        this.setState({participations: parts, challenge: newState.challenge})
        // this.props.getChallengeParticipants(this.props.match.params.challengeId) keep this out
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.challengeId !== this.props.match.params.challengeId) {
            this.props.fetchChallenge(this.props.match.params.challengeId)
                .then(this.props.fetchChallengePosts(this.props.match.params.challengeId))
                .then(this.props.getChallengeParticipants(this.props.match.params.challengeId))
                .then(this.props.fetchUser(this.props.currentUser.id))
        }
    }

    dateParser(date){
        const dateStr = date.slice(0, 10)
        const dateSplit = dateStr.split('-')
        const newDateStr = new Date(dateSplit[0], dateSplit[1], dateSplit[2])
        const parsedDateStr = newDateStr.toDateString()
        return parsedDateStr.slice(parsedDateStr.indexOf(" ") + 1)
    }

    handleFile(e) {
        const file = e.currentTarget.files[0]
        const fileReader = new FileReader();
        
        fileReader.onloadend = () => {
            this.setState({ imageFile: file, imageUrl: fileReader.result })
        }
        if (file) {
            fileReader.readAsDataURL(file) //the readAsDataURL initiates the beginning of reading of the file
        }
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData()
        formData.append("imageUrl", this.state.imageFile)
        formData.append("user", this.props.currentUser.id)
        formData.append("text", this.state.postText)
        formData.append("type", this.state.postType)
        formData.append("challenge", this.props.challenge._id)

        this.props.composePost(formData, this.props.challenge._id)
        .then((res) => 
            this.props.fetchChallenge(this.props.match.params.challengeId)
            .then(this.props.fetchChallengePosts(this.props.match.params.challengeId))
        )
    }

    handleCheckbox(e) {
        e.preventDefault()

        if (e.target.checked) {
            this.setState({ ["postType"]: "complete" })
        }
    }

    handleJoin() {
        return () => {
            this.setState({btn: <button onClick={this.handleLeave()} className="join-button joined">Joined</button>});
            this.props.addParticipation(this.state.challenge._id);
        };
    }
    
    handleLeave() {
        return () => {
            this.setState({btn: <button onClick={this.handleJoin()} className="join-button">Join the Challenge!</button>});
            this.props.removeParticipation(this.state.challenge._id);
        };
    }

    render() {
        console.log('showstate',this.state)
        let joinButton = null;
        let index = null;
        const { challenge, challengePosts, currentUser, users} = this.props
        if (challenge === undefined || challengePosts === undefined || !users || !users.index[currentUser.id] || users.index[currentUser.id].imageUrl === undefined) return null;
        
        
        const userImgSrc = this.props.users.index[currentUser.id].imageUrl
        const profilePic = (userImgSrc) ? (
            <img className="icon" src={userImgSrc} />
        ) : (null)
        const postPreviewImg = this.state.imageUrl ? <div className="img-post-preview">
                    {/* <button className="remove-img-x">X</button> */}
                    <img src={this.state.imageUrl}/>
                </div> : null
        if (this.state.btn) {
            joinButton = this.state.btn;
        } else if (this.state.participations.includes(this.state.challenge._id)) {
            joinButton = <button onClick={this.handleLeave()} className="join-button joined">Joined</button>
        } else {
            joinButton = <button onClick={this.handleJoin()} className="join-button">Join the Challenge!</button>
        }
        if (this.state.participations.includes(this.state.challenge._id)) {
            index =
                        <div className="challenge-show-posts">
                            <ChallengePostsIndexContainer 
                                challengePosts={challengePosts}
                                fetchChallenge={this.props.fetchChallenge}
                                fetchUser={this.props.fetchUser}
                                />
                        </div>
        }

        return (
            <>
                <header>
                    <NavBarContainer parentCallback={this.handleCallback} />
                </header>
                <div className='body-wrap'>
                    <div className="challenge-show-container">
                        <div className="challenge-show-card">
                            <div className="show-card-img-wrap">
                                <div>
                                    <img src={challenge.imageUrl}></img>
                                </div>
                            </div>
                            <div className="show-card-details-wrap">
                                <div className="detail-line" id="show-title">
                                    <h1>{challenge.title}</h1>
                                    {joinButton}
                                </div>
                                <div className="detail-line" id="show-description">
                                    <h1>{challenge.description}</h1>
                                </div>
                                <div className="detail-line" id="show-dates">
                                    <div>
                                        <label>Start</label>
                                        <p>{this.dateParser(challenge.startDate)}</p>
                                    </div>
                                    <div>
                                        <label>End</label>
                                        <p>{this.dateParser(challenge.endDate)}</p>
                                    </div>
                                    <div>
                                        <h2>Participants:</h2>
                                        <h2>{this.props.challengeParticipants.length}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="add-post-container">
                            <form className="post-form">
                                <div className="form-header">
                                    <h1>Make a post!</h1>
                                </div>
                                <div className="form-main-input">
                                    <div className="chal-user-icon">
                                        {profilePic}
                                    </div>
                                    <div className="post-text-container">
                                        <textarea
                                            onChange={this.update('postText')}
                                            maxLength="250"
                                            placeholder="Give an update on the challenge!"/>
                                    </div>
                                </div>
                                <div className="form-buttons">
                                    <div className="post-options">
                                        <div>
                                            <label className="post-img-label" htmlFor="post-img">
                                                <span className="material-symbols-outlined">
                                                    image
                                                </span>
                                            </label>
                                            <input type="file"
                                                    id="post-img"
                                                    className="post-img-input"
                                                    onChange={this.handleFile}
                                                    />
                                        </div>
                                        <div className="complete-toggle-container">
                                            <label className="complete-label">Challenge Completed?</label>
                                            <input type="checkbox" onChange={this.handleCheckbox} />    
                                        </div>
                                    </div>
                                    <input 
                                        type="submit"
                                        onClick={this.handleSubmit}
                                        className="submit-post-button" 
                                        value="Post"/>
                                </div>
                            </form>
                            {postPreviewImg}
                        </div>

                        {index}
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(ChallengeShow)