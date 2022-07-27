import React from "react";
import { withRouter } from 'react-router-dom';
import PostIndexContainer from '../posts/postsIndexContainer';
import ProfileCardContainer from '../profile/profileCardContainer';
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
                    <div className="sticky-bar">
                        <ProfileCardContainer />
                        <div className="category-links">
                            <div className="category-links-body">
                                <h3 className="highlight">My Categories</h3>
                                <div className="category-links-list">
                                    <small className="link-item">Fitness</small>
                                    <small className="link-item">Food</small>
                                    <small className="link-item">Learning</small>
                                    <small className="link-item">Fun</small>
                                    <small className="link-item">Creative</small>
                                    <small className="link-item">Travel</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <PostIndexContainer />
                </div>
            </>
        )
    }
}

export default withRouter(HomePage);