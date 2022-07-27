import React from "react";
import './post.css';

class PostIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            challenge: {}
        }
    }

    componentWillMount() {
        console.log(this.props.challengeId);
        this.props.fetchChallenge(this.props.challengeId);
    }

    componentWillReceiveProps(newState) {
        console.log('butt', newState);
        this.setState({challenge: newState.challenge})
    }

    render() {
        // console.log('state', this.state)
        // console.log(this.props);
        if (this.state.challenge) {
            return (
                <div className="post-item">
                    <div className="post-item-header">
                        <div className="user-icon"></div>
                        <div className="header-info">
                            <p>username</p>
                            <p>{this.props.userId}</p>
                            <p>{this.props.type}</p>
                            <p>{this.props.challengeId}</p>
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