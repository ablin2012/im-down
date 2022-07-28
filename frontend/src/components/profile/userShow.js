import React from 'react';
import ChallengesIndexItem from '../challenges/challengesIndexItem';

class UserShow extends React.Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         challenges: [],
    //         achievements: []
    //     }
    // }

    componentDidMount() {
        // console.log(this.props.currentUser.id)
        // console.log(this.props.match.params)
        this.props.fetchUserParticipations(this.props.match.params.user_id);
        this.props.fetchUser(this.props.match.params.user_id)

    }

    // componentWillReceiveProps(newState) {
    //     console.log('um', newState);
    //     this.setState({ challenges: newState.challenges, achievements: newState.user.achievements });
    // }

    renderAchievement(achievement){
        console.log("rendering achievement - achievements", this.props.achievements)
        if (!achievement.challenge) {return null}
        return (
        <div className="achievement-item-container" key={achievement._id}>
            <div>
                {achievement.challenge.title ||= ""}
            </div>
            <img src={achievement.imageUrl|| ""}/>
        </div>

        )
    }

    renderParticipation(participation){
        console.log("rendering achievement - challenges", this.props.participation)
        if (!participation.challenge) {return null}
        return (
        <div className="participation-item-container" key={participation._id}> 
            <div>
                {participation.challenge.title ||= ""}
            </div>
            <img src={participation.imageUrl || ""}/>
        </div>

        )
    }

    render() {
        
        if (!this.props.user || !this.props.achievements || !this.props.participations) {
            return null
        } else {
            const { user, achievements, participations } = this.props
            let { username, imageUrl } = user
            
            console.log("participations",participations)
            
            imageUrl ||= ""
            const effectiveParticipations = participations.filter((participation) => {
                // debugger
                return (
                    participation.challenge && !participation.complete && new Date(participation.challenge.endDate) < new Date(new Date() + (24+9) * 60 * 60 * 1000)
                )
            })

            console.log("effectiveParticipations",effectiveParticipations)
            // console.log("this is all achievements" , achievements)
            return (
                <div>
                    <img src={imageUrl}/>
                    <div>{username}</div>
                    {
                        achievements.map((achievement) => this.renderAchievement(achievement))
                    }

                    {
                        effectiveParticipations.map((participation) => this.renderParticipation(participation))
                    }

                </div>
            );
        }
    }
}

export default UserShow;
