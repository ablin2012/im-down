import React from "react";
import { withRouter } from 'react-router-dom';
import PostIndexContainer from '../posts/postsIndexContainer';
import './home.css';

import NavBarContainer from '../nav/navBarContainer';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.handleCallback = this.handleCallback.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
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
        return (
            <>
                <header>
                    <NavBarContainer parentCallback={this.handleCallback} />
                </header>
                <div className="home-page">
                    <h1>Home</h1>
                    <PostIndexContainer />
                </div>
            </>
        )
    }
}

export default withRouter(HomePage);