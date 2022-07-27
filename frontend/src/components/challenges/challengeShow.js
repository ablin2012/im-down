import React from "react";
import { withRouter } from 'react-router-dom';
import NavBarContainer from "../nav/navBarContainer";
import './challengeShow.scss'

class ChallengeShow extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
        this.dateParser = this.dateParser.bind(this)
    }

    

    componentDidMount() {
        console.log("hit state?", this.props.challenge)
        this.props.fetchChallenge(this.props.match.params.challengeId)
            .then(this.props.fetchChallengePosts(this.props.match.params.challengeId))
            
            // .then(() => {this.props.fetchChallengePosts(this.props.challenge.id)})
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.challengeId != this.props.match.params.challengeId) {
            this.props.fetchChallenge(this.props.match.params.challengeId)
                .then(this.props.fetchChallengePosts(this.props.match.params.challengeId))
        }
    }

    dateParser(date){
        const dateStr = date.slice(0, 10)
        const dateSplit = dateStr.split('-')
        const newDateStr = new Date(dateSplit[0], dateSplit[1], dateSplit[2])
        const parsedDateStr = newDateStr.toDateString()
        return parsedDateStr.slice(parsedDateStr.indexOf(" ") + 1)
    }

    render() {
        const { challenge } = this.props

        if (challenge === undefined) return null;
        
        return (
            <>
                <header>
                    <NavBarContainer parentCallback={this.handleCallback} />
                </header>
                <div className='body-wrap'>
                    <div className="challenge-show-container">
                        <div className="challenge-show-card">
                            <div className="show-card-img-wrap">
                                <div>
                                    <img src={challenge.challengeImage}></img>
                                </div>
                            </div>
                            <div className="show-card-details-wrap">
                                <div className="detail-line" id="show-title">
                                    <h1>{challenge.title}</h1>
                                    <button>Join the Challenge!</button>
                                </div>
                                <div className="detail-line" id="show-description">
                                    <h1>{challenge.description}</h1>
                                </div>
                                <div className="detail-line" id="show-dates">
                                    <div>
                                        <label>Start</label>
                                        <p>{this.dateParser(challenge.startDate)}</p>
                                    </div>
                                    <div>
                                        <label>End</label>
                                        <p>{this.dateParser(challenge.endDate)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="challenge-show-posts"></div>
                    </div>
                    
                </div>
            </>
        )
    }
}

export default withRouter(ChallengeShow)