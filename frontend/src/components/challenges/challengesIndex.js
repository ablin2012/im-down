import React from 'react';
import { withRouter } from 'react-router-dom';
import './challenge.css'
import NavBarContainer from '../nav/navBarContainer';
import { Link } from 'react-router-dom';

import ChallengesIndexItem from './challengesIndexItem';

class ChallengesIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            challenges: [],
            filter: "",
            participations: []
        }
        this.handleCallback = this.handleCallback.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.categorizeChallenge = this.categorizeChallenge.bind(this)
    }

    componentWillMount() {
        this.props.fetchChallenges();
        this.props.fetchUserParticipations(this.props.currentUser.id);
    }

    componentWillReceiveProps(newState) {
        let parts = [];
        if (newState.participations) {
            parts = newState.participations.map(parts => (parts.challenge))
        }
        this.setState({ challenges: newState.challenges, participations: parts});
    }

    handleCallback = (navSearchData) => this.setState({'filter': navSearchData})
    
    handleSearch() {
        if(this.state.filter === "") {
            return this.state.challenges
        } else {
            return this.state.challenges.filter(challenge => 
                challenge.title.match(new RegExp(this.state.filter, "i")) || 
                challenge.description.match(new RegExp(this.state.filter, "i")) ||
                challenge.category.match(new RegExp(this.state.filter, "i")))
    }
    }

    categorizeChallenge(category) {
        const categorizedArr = this.handleSearch().filter(challenge => challenge.category.match(new RegExp(category, "i")))
        
        return (
            categorizedArr.map(challenge => (
                <Link to={`/challenges/${challenge._id}`} key={challenge._id} >
                    <ChallengesIndexItem
                        challengeId={challenge._id}
                        title={challenge.title}
                        description={challenge.description}
                        category={challenge.category}
                        imageUrl={challenge.imageUrl}
                        participations={this.state.participations}
                        addParticipation={this.props.addParticipation}
                        removeParticipation={this.props.removeParticipation} />
                </Link>
            ))
        )
    }

    render() {
        const categories = ["fitness", "learning", "travel", "cooking", "fun", "self-care", "creative"]
        if (this.state.challenges.length === 0) {
            return (
                <div className='body-wrap'>
                    <div>There are no Challenges</div>
                </div>
                )
        } else {
            return (
                <>
                    <header>
                        <NavBarContainer parentCallback={this.handleCallback}/>
                    </header>
                    <div className='body-wrap'>
                        <div className='challenge-cards-container'>
                            <div className='challenges-header'>
                                <h2>Discover your next challenge!</h2>
                                
                            </div>
                            {/* carousel */}
                            <div className='categorized-challenges-container'> 
                                {categories.map((category, idx) => (
                                    <div className="category-wrap" key={idx}>
                                        <div>
                                            <h1>{`${category}`[0].toUpperCase() + `${category}`.substring(1)}</h1>
                                        </div>
                                        <div className='categorized-challenges' id={`${category}`} >
                                            { this.categorizeChallenge(`${category}`)}
                                        </div>
                                        
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
}

export default withRouter(ChallengesIndex);
