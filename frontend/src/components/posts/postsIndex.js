import React from "react";
import { withRouter } from 'react-router-dom';
import PostIndexItem from "./postsIndexItem";

class PostIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }
    
    componentWillMount() {
        this.props.fetchPosts();
    }

    componentWillReceiveProps(newState) {
        this.setState({ posts: newState.posts });
    }

    render() {
        if (this.state.posts.length === 0) {
            return (<div>There are no Posts</div>)
        } else {
            return (
                <div>
                    <h2>All Posts</h2>
                    {this.state.posts.map(post => (
                        <PostIndexItem key={post._id} text={post.text} type={post.type} />
                    ))}
                </div>
            )
        }
    }
}

export default withRouter(PostIndex);