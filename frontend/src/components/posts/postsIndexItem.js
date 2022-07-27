import React from "react";
import './post.css';
import { Link } from "react-router-dom";

class PostIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            challenge: {},
            user: {}
        }
    }

    componentWillMount() {
        this.props.fetchChallenge(this.props.challengeId);
        this.props.fetchUser(this.props.userId);
    }

    componentWillReceiveProps(newState) {
        this.setState({challenge: newState.challenge, user: newState.user})
    }

    render() {
        let {imageUrl, challengeId, userId} = this.props;
        if (this.state.challenge && this.state.user) {

            const profilePic = (this.state.user.imageUrl) ? (
                <img className="icon" src={this.state.user.imageUrl} />
            ) : (null)
            const image = (imageUrl) ? (
                <div className="post-image-container">
                    <img className="post-image" src={this.props.imageUrl} />
                </div>
            ) : (null)

            return (
                <div className="post-item photo">
                    <div className="post-item-header">
                        <div className="user-icon">
                            {profilePic}
                        </div>
                        <div className="header-info">
                            <div className="header-top">
                                <Link to={`/users/${userId}`} >
                                    <div className="username">{this.state.user.username}</div>
                                </Link>
                                <i className="fas fa-caret-right"></i>
                                <Link to={`/challenges/${challengeId}`} >
                                    <div className="challenge">{this.state.challenge.title}</div>
                                </Link>
                            </div>
                            <div className="header-bottom">
                                <p className="post-type">{this.props.type.toUpperCase()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="post-text">
                        <h3>{this.props.text}</h3>
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