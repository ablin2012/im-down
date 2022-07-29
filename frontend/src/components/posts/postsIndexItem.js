import React from "react";
import './post.css';
import { Link } from "react-router-dom";
import { shortenStr } from "../../util/miscUtil";

class PostIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            challenge: {},
            user: {},
            participations: [],
            nullBtn: null,
        }
        this.handleJoin = this.handleJoin.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
    }

    // componentWillMount() {
    //     this.props.fetchChallenge(this.props.challengeId);
    //     this.props.fetchUser(this.props.userId);
    // }

    componentWillReceiveProps(newState) {
        this.setState({challenge: newState.posts.challenge, user: newState.posts.user, participations: newState.participations.map(part => (part._id))})
    }

    componentDidMount() {
        if (this.props.post){
            this.setState({challenge: this.props.post.challenge, user: this.props.post.user})
        }
    }

    handleJoin() {
        return () => {
            this.setState({nullBtn: <button onClick={this.handleLeave()} className="join-btn joined">Joined</button>});
            this.props.addParticipation(this.props.challengeId);
        };
    }
    
    handleLeave() {
        return () => {
            this.setState({nullBtn: <button onClick={this.handleJoin()} className="join-btn">Join the Challenge!</button>});
            this.props.removeParticipation(this.props.challengeId);
        };
    }

    render() {


        let {imageUrl, challengeId, userId, participations} = this.props;
        let joinButton = null;
        if (this.state.challenge && this.state.user) {
            const profilePic = (this.state.user.imageUrl) ? (
                <img className="icon" src={this.state.user.imageUrl} />
            ) : (null)
            const userLetter = (this.state.user.username) ? (
                <div className="letter-icon">{this.state.user.username.slice(0,1)}</div>
            ) : (null)
            const profPic = (profilePic) ? (
                profilePic
            ) : (
                userLetter
            )
            const image = (imageUrl) ? (
                <div className="post-image-container">
                    <img className="post-image" src={this.props.imageUrl} />
                </div>
            ) : (null)
            const type = (this.props.type === 'complete') ? (
                <p className="post-type">CHALLENGE {this.props.type.toUpperCase()}</p>
            ) : (null)
            const title = (this.state.challenge.title) ? (
                shortenStr(this.state.challenge.title, 30)
            ) : ( null )
            if (this.props.type === 'create') {
                if (this.state.participations.includes(challengeId)) {
                    joinButton = <button onClick={this.handleLeave()} className="join-btn joined">Joined</button>
                } else if (this.state.nullBtn) {
                    joinButton = this.state.nullBtn;
                } else {
                    joinButton = <button onClick={this.handleJoin()} className="join-btn">Join the Challenge!</button>
                }
            }
            return (
                <div key ={this.props.post._id} className="post-item photo">
                    <div className="post-item-header">
                        <div className="user-icon">
                            {profPic}
                        </div>
                        <div className="header-info">
                            <div className="header-top">
                                <Link to={`/users/${userId}`} >
                                    <div className="username">{this.state.user.username}</div>
                                </Link>
                                <i className="fas fa-caret-right"></i>
                                <Link to={`/challenges/${challengeId}`} >
                                    <div className="challenge">{title}</div>
                                </Link>
                            </div>
                            <div className="header-bottom">
                                {type}
                            </div>
                        </div>
                    </div>
                    <div className="post-text">
                        <h3>{this.props.text}</h3>
                        {joinButton}
                    </div>
                    {image}
                </div>
            )
        } else {
            return (null)
        }
    }
}

export default PostIndexItem;