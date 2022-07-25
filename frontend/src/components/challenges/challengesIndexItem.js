import React from 'react';

class ChallengesIndexItem extends React.Component {
    render() {
        return (
            <div>
                <h3>{this.props.title}</h3>
                <h4>{this.props.description}</h4>
            </div>
        );
    }
}

export default ChallengesIndexItem;
