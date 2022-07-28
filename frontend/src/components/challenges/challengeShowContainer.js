import { connect } from 'react-redux';
import ChallengeShow from './challengeShow';
import { fetchChallenge } from '../../actions/challengeActions';
import { fetchChallengePost } from '../../actions/postActions';
import { fetchUser } from '../../actions/userActions';
import { composePost } from '../../actions/postActions';

const mapStateToProps = (state, ownProps) => {
    
    return {
        challenge: state.challenges[ownProps.match.params.challengeId],
        challengePosts: state.posts.challenge,
        currentUser: state.session.user,
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchChallenge: (challengeId) => dispatch(fetchChallenge(challengeId)),
        fetchChallengePosts: (challengeId) => dispatch(fetchChallengePost(challengeId)),
        fetchUser: (id) => dispatch(fetchUser(id)),
        composePost: (post, challengeId) => dispatch(composePost({post, challengeId}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeShow)