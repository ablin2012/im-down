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
    }

    componentWillReceiveProps(newState) {
        this.setState({ posts: newState.posts, challenges: newState.challenges, users: newState.users});
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
                            imageUrl={post.imageUrl}
                            fetchChallenge={this.props.fetchChallenge}
                            fetchUser={this.props.fetchUser}
                            challenge={this.state.challenges[post.challenge]}
                            user={this.state.users[post.user]}
                            />
                    ))}
                </div>
            )
        }
    }
}

export default withRouter(PostIndex);