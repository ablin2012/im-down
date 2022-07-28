import React from 'react';


class ChallengesIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            btn: null,
            participations: [],
            challenge: {}
        }
        this.handleJoin = this.handleJoin.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
    }

    componentWillReceiveProps(newState) {
        this.setState({challenge: newState.challenge, user: newState.user, participations: newState.participations.map(part => (part._id))})
    }

    handleJoin() {
        return () => {
            this.setState({btn: <button onClick={this.handleLeave()} className="option-btn joined">Joined</button>});
            this.props.addParticipation(this.props.challengeId);
        };
    }
    
    handleLeave() {
        return () => {
            this.setState({btn: <button onClick={this.handleJoin()} className="option-btn">Join!</button>});
            this.props.removeParticipation(this.props.challengeId);
        };
    }

    render() {
        let joinButton = null;
        let {challengeId} = this.props;
        if (this.state.btn) {
            joinButton = this.state.btn;
        } else if (this.state.participations.includes(challengeId)) {
            joinButton = <button onClick={this.handleLeave()} className="option-btn joined">Joined</button>
        } else {
            joinButton = <button onClick={this.handleJoin()} className="option-btn">Join!</button>
        }
        return (
            <div className='challenge-card'>
                <div className='challenge-img-container'>
                    <img src={this.props.imageUrl}></img>
                </div>
                {/* <div className='hidden-details'>
                    <p>{this.props.description}</p>
                </div> */}
                <div className='challenge-card-details'>
                    <div className='challenge-card-header'>
                        <h3 className='card-title'>{this.props.title}</h3>
                        {/* <h4 className='card-category'>{this.props.category}</h4> */}
                    </div>
                    {/* <div>
                        <p className='card-desc'>{this.props.description}</p>
                    </div> */}
                    <div className='options'>
                        {/* <p>Down for the challenge!?</p> */}
                        {joinButton}
                    </div>
                </div>
                
            </div>
        );
    }
}

export default ChallengesIndexItem;
