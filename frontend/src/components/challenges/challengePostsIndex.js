import React from "react";
import { withRouter } from 'react-router-dom';
import ChallengePostsIndexItem from "./challengePostsIndexItem";

class ChallengePostsIndex extends React.Component {

    constructor(props){
        super(props)
    }

    render() {
        const {challengePosts} = this.props

        if (!challengePosts) return null

        if (challengePosts.length === 0) {
            return (<div>There are no Posts</div>)
        } else {
            return (
                <div className="post-index">
                    <h2>All Posts</h2>
                    {challengePosts.map(post => (
                        <ChallengePostsIndexItem key={post._id}
                            text={post.text}
                            type={post.type}
                            userId={post.user}
                            challengeId={post.challenge}
                            imageUrl={post.imageUrl}
                            fetchChallenge={this.props.fetchChallenge}
                            fetchUser={this.props.fetchUser}
                        />
                    ))}
                </div>
            )
        }
        // return <></>
    }
}

export default withRouter(ChallengePostsIndex)