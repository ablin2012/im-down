import React from 'react';
import { withRouter } from 'react-router-dom';

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
                <div>
                    <h2>All Challenges</h2>
                    {this.state.challenges.map(challenge => (
                        <ChallengesIndexItem key={challenge._id} text={challenge.title} />
                    ))}
                </div>
            );
        }
    }
}

export default withRouter(ChallengesIndex);
