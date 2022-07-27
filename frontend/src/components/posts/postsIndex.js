import React from "react";
import { withRouter } from 'react-router-dom';
import PostIndexItem from "./postsIndexItem";
import NavBarContainer from "../nav/navBarContainer";
import '../challenges/challenge.css';
import './post.css';

class PostIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            filters: ""
        }
        this.handleCallback = this.handleCallback.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }
    
    componentWillMount() {
        this.props.fetchPosts();
    }

    componentWillReceiveProps(newState) {
        this.setState({ posts: newState.posts });
    }

    handleCallback = (navSearchData) => this.setState({'filter': navSearchData})

    handleSearch() {
        if(this.state.filter === "") {
            return this.state.challenges
        } else {
            return this.state.challenges.filter(card => card.title.match(new RegExp(this.state.filter, "i")) || card.description.match(new RegExp(this.state.filter, "i")))
        }
    }

    render() {
        if (this.state.posts.length === 0) {
            return (<div>There are no Posts</div>)
        } else {
            return (
                <>
                    <header>
                        <NavBarContainer parentCallback={this.handleCallback}/>
                    </header>
                    <div className='body-wrap'>
                        <h2>All Posts</h2>
                        {this.state.posts.map(post => (
                            <PostIndexItem key={post._id} text={post.text} type={post.type} />
                        ))}
                    </div>
                </>
            )
        }
    }
}

export default withRouter(PostIndex);