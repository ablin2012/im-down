import { connect } from 'react-redux';
import ChallengePostsIndex from './challengePostsIndex';
import { fetchChallenge, fetchUserChallenges } from '../../actions/challengeActions';


const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps)(ChallengePostsIndex)