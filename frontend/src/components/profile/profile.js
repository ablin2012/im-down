import React from 'react';
import ChallengesIndexItem from '../challenges/challengesIndexItem';
import { withRouter } from 'react-router-dom'

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            challenges: []
        }
    }

    componentWillMount() {
        // console.log(this.props.currentUser.id)
        // this.props.fetchUserChallenges(this.props.currentUser.id);
        console.log(this.props)
        this.props.history.push(`/users/${this.props.currentUser.id}`)
    }

    componentWillReceiveProps(newState) {
        this.setState({ challenges: newState.challenges });
    }

    render() {
        if (this.state.challenges.length === 0) {
            return (<div>This user has no challenges</div>)
        } else {
            return (
                <div>
                    <h2>All of This User's Challenges</h2>
                    {this.state.challenges.map(challenge => (
                        <ChallengesIndexItem 
                            key={challenge._id} 
                            title={challenge.title}
                            description={challenge.description} />
                    ))}
                </div>
            );
        }
    }
}

export default withRouter(Profile);
