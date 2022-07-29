import React from "react";
import { withRouter } from 'react-router-dom';
import PostIndexItem from "./postsIndexItem";

class PostsIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            challenges: {},
            users: {},
            participations: [],
            friendships:[]
        }
    }
    
    componentWillMount() {
        this.props.fetchPosts();
    }

    componentWillReceiveProps(newState) {
        this.setState({ 
            challenges: newState.challenges, 
            users: newState.users, 
            participations: newState.participations,
            friendships: newState.friendships
        });

        //implement post filter for friend and own posts on home page
       
        if (newState.friendships){
            const friendIds = newState.friendships.map((friendship) => {
                if (friendship.user1 === newState.currentUser.id){
                    return friendship.user2
                }else if (friendship.user2 === newState.currentUser.id){
                    return friendship.user1
                }
            })
    
            const filteredPosts = newState.posts.filter((post)=> {
                return (friendIds.includes(post.user._id) || post.user._id === newState.currentUser.id)
            })
    
            this.setState({posts: filteredPosts})
        }
    }

    render() {
        if (!this.state.friendships){
            return null
        }
        if (this.state.posts.length === 0) {
            return (<div>There are no Posts</div>)
        } else {
            
            return (
                <div className="post-index">
                    <h2>All Posts</h2>
                    {this.state.posts.map(post => (
                        <PostIndexItem key={post._id} 
                            post={post}
                            text={post.text} 
                            type={post.type}
                            userId={post.user} 
                            challengeId={post.challenge}
                            imageUrl={post.imageUrl}
                            // fetchChallenge={this.props.fetchChallenge}
                            // fetchUser={this.props.fetchUser}
                            challenge={this.state.challenges[post.challenge]}
                            user={this.state.users[post.user]}
                            addParticipation={this.props.addParticipation}
                            removeParticipation={this.props.removeParticipation}
                            participations={this.state.participations}
                            />
                    ))}
                </div>
            )
        }
    }
}

export default withRouter(PostsIndex);