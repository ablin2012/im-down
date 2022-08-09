import React from "react";
import { Link } from "react-router-dom";
import './challengeShow.scss'

class ChallengePostsIndexItem extends React.Component {
    constructor(props){
        super(props)
        // this.state = {
        //     user: undefined
        // }
    }

    // componentDidMount() {
    //     this.props.fetchUser(this.props.userId)
    //         .then(rep => {
    
    //             this.setState({user: rep.user.data})})
    
    // }

    // componentWillReceiveProps(newState) {
    //     this.setState({ user: newState.user })
    // }

    render() {
        const { imageUrl, user, type} = this.props;
        
        const typeDisplay = (type === 'complete') ? (
            <p className="chal-post-type">{this.props.type.toUpperCase()}</p>
        ) : (
            null
        )

        if (user === undefined) return null
        const profilePic =  <img className="icon" src={user.imageUrl || window.defaultUserImgURL} />


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
                            <Link to={`/users/${user._id}`} >
                                <div className="chal-username">{user.username}</div>
                            </Link>
                            {typeDisplay}
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