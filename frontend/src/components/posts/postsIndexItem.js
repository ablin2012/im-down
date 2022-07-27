import React from "react";
import './post.css';

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
        if (this.state.challenge && this.state.user) {
            return (
                <div className="post-item">
                    <div className="post-item-header">
                        <div className="user-icon"></div>
                        <div className="header-info">
                            <p>{this.state.user.username}</p>
                            <p>{this.props.type}</p>
                            <p>{this.state.challenge.title}</p>
                        </div>
                    </div>
                    <h3>{this.props.text}</h3>
                    <div className="post-image"></div>
                </div>
            )
        } else {
            return (null)
        }
    }
}

export default PostIndexItem;