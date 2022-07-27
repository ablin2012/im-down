import React from "react";
import { withRouter } from 'react-router-dom';
import PostIndexItem from "./postsIndexItem";

class PostIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            challenges: {},
            users: {},
        }
    }
    
    componentWillMount() {
        this.props.fetchPosts();
        // this.props.fetchChallenges();
    }

    componentWillReceiveProps(newState) {
        // console.log('newstate', newState)
        // newState.challenges.map(challenge => {
        //     this.state.challenges[challenge._id] = challenge
        // })
        this.setState({ posts: newState.posts, challenges: newState.challenges});
        // this.setState({ challenges: newState.challenges});
    }

    render() {
        // console.log(this.state);
        if (this.state.posts.length === 0) {
            return (<div>There are no Posts</div>)
        } else {
            return (
                <div className="post-index">
                    <h2>All Posts</h2>
                    {this.state.posts.map(post => (
                        <PostIndexItem key={post._id} 
                            text={post.text} 
                            type={post.type}
                            userId={post.user} 
                            challengeId={post.challenge}
                            fetchChallenge={this.props.fetchChallenge}
                            challenge={this.state.challenges[post.challenge]}
                            />
                    ))}
                </div>
            )
        }
    }
}

export default withRouter(PostIndex);