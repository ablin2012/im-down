import { connect } from 'react-redux';
import { updateChallenge, fetchChallenge } from '../../actions/challengeActions';
import ChallengeEditForm from './challengeEditForm';
import { closeModal } from '../../actions/modalActions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownState) => {
    return {
        currentUser: state.session.user,
        newChallenge: state.challenges.new,
        challenge: state.challenges.index[ownState.location.pathname.match(/\/challenges\/+([^\/]+)/)[1]]
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateChallenge: (id, data) => dispatch(updateChallenge(id, data)),
        closeModal: () => dispatch(closeModal()),
        fetchChallenge: (id) => dispatch(fetchChallenge(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChallengeEditForm));
