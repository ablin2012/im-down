import { connect } from 'react-redux';
import { createChallenge } from '../../actions/challengeActions';
import ChallengeForm from './challengeForm'

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user,
        newChallenge: state.challenges.new
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createChallenge: data => dispatch(createChallenge(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeForm);
