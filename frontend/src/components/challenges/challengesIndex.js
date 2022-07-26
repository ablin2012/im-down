import React from 'react';
import { withRouter } from 'react-router-dom';
import './challenge.css'

import ChallengesIndexItem from './challengesIndexItem';

class ChallengesIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            challenges: []
        }
    }

    componentWillMount() {
        this.props.fetchChallenges();
    }

    componentWillReceiveProps(newState) {
        this.setState({ challenges: newState.challenges });
    }

    render() {
        if (this.state.challenges.length === 0) {
            return (<div>There are no Challenges</div>)
        } else {
            return (
                <div className='challenge-cards-container'>
                    <h2>All Challenges</h2>
                    
                    {this.state.challenges.map(challenge => (
                        <ChallengesIndexItem 
                            key={challenge._id} 
                            title={challenge.title}
                            description={challenge.description}
                            category={challenge.category} />
                    ))}
                </div>
            );
        }
    }
}

export default withRouter(ChallengesIndex);
