import { connect } from 'react-redux';
import ChallengeShow from './challengeShow';
import { fetchChallenge, getChallengeParticipants } from '../../actions/challengeActions';
import { fetchChallengePost } from '../../actions/postActions';
import { fetchUser } from '../../actions/userActions';
import { composePost } from '../../actions/postActions';

const mapStateToProps = (state, ownProps) => {
    
    return {

        challenge: state.challenges.index[ownProps.match.params.challengeId],
        challengePosts: state.posts.challenge,
        currentUser: state.session.user,
        users: state.users,
        challengeParticipants: state.challenges.participants
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchChallenge: (challengeId) => dispatch(fetchChallenge(challengeId)),
        fetchChallengePosts: (challengeId) => dispatch(fetchChallengePost(challengeId)),
        fetchUser: (id) => dispatch(fetchUser(id)),
        composePost: (post, challengeId) => dispatch(composePost({post, challengeId})),
        getChallengeParticipants: (challengeId) => dispatch(getChallengeParticipants(challengeId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeShow)