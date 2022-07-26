import React from 'react';
import { withRouter } from 'react-router-dom';
import './challenge.css'
import NavBarContainer from '../nav/navBarContainer';

import ChallengesIndexItem from './challengesIndexItem';

class ChallengesIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            challenges: [],
            filter: ""
        }
        this.handleCallback = this.handleCallback.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    componentWillMount() {
        this.props.fetchChallenges();
    }

    componentWillReceiveProps(newState) {
        this.setState({ challenges: newState.challenges });
        // this.handleCallback()
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
        
        if (this.state.challenges.length === 0) {
            return (<div className='body-wrap'>
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
                            <h2>All Challenges</h2>
                            {this.handleSearch().map(challenge => (
                                <ChallengesIndexItem 
                                    key={challenge._id} 
                                    title={challenge.title}
                                    description={challenge.description}
                                    category={challenge.category} />
                            ))}
                        </div>
                    </div>
                </>
            );
        }
    }
}

export default withRouter(ChallengesIndex);
