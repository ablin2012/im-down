import React from "react";
import { Link } from "react-router-dom";
import './challengeShow.scss'

class ChallengePostsIndexItem extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        this.props.fetchUser(this.props.userId)
            .then(rep => this.setState({user: rep.user.data}))
    }


    render() {
        const { imageUrl, userId } = this.props;
        
        if (!this.state.user) return null

        const profilePic = (this.state.user.imageUrl) ? (
            <img className="icon" src={this.state.user.imageUrl} />
        ) : (null)

        const image = (imageUrl) ? (
            <div className="post-image-container">
                <img className="post-image" src={imageUrl} />
            </div>
        ) : (null)
        return (
            <div className="chal-post-item photo">
                <div className="chal-post-item-header">
                    <div className="chal-user-info">
                        <div className="chal-user-icon">
                            {profilePic} 
                        </div>
                        
                    </div>
                    <div className="chal-header-info">
                        <div className="chal-header-top">
                            <Link to={`/users/${userId}`} >
                                <div className="chal-username">{this.state.user.username}</div>
                            </Link>
                            <p className="chal-post-type">{this.props.type.toUpperCase()}</p>
                        </div>
                        <div className="chal-post-text">
                            <h3>{this.props.text}</h3>
                        </div>
                    </div>
                </div>
                {image}
            </div>
        )
    }
}

export default ChallengePostsIndexItem