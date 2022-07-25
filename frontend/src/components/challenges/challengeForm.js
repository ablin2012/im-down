import React from 'react';
import ChallengesIndexItem from './challengesIndexItem';

class ChallengeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            newChallenge: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ newChallenge: nextProps.newChallenge.text });
    }

    handleSubmit(e) {
        e.preventDefault();
        let challenge = {
            title: this.state.title,
            description: this.state.description
        };

        this.props.createChallenge(challenge);
        this.setState({ title: '', description: '' })
    }

    update() {
        return e => this.setState({
            text: e.currentTarget.value
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text"
                            value={this.state.title}
                            onChange={this.update()}
                            placeholder="Name your challenge..."
                        />
                        <input type="text"
                            value={this.state.description}
                            onChange={this.update()}
                            placeholder="Provide a brief description of the challenge..."
                        />

                        <input type="submit" value="Submit" />
                    </div>
                </form>
                <br />
                <ChallengesIndexItem title={this.state.newChallenge} />
            </div>
        )
    }
}

export default ChallengeForm;
