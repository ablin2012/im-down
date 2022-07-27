import { connect } from 'react-redux';
import ChallengeShow from './challengeShow';
import { fetchChallenge } from '../../actions/challengeActions';
import { fetchChallengePost } from '../../actions/postActions';

const mapStateToProps = (state, ownProps) => {
    
    return {
        challenge: state.challenges[ownProps.match.params.challengeId],
        challengePosts: state.posts.all
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchChallenge: (challengeId) => dispatch(fetchChallenge(challengeId)),
        fetchChallengePosts: (challengeId) => dispatch(fetchChallengePost(challengeId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeShow)