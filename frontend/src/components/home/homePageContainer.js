import { connect } from 'react-redux';
import HomePage from './homePage';
import {openModal} from '../../actions/modalActions';
import {fetchUserChallenges} from '../../actions/challengeActions';

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user,
        challenges: Object.values(state.challenges.user)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        openModal: modal => dispatch(openModal(modal)),
        fetchUserChallenges: userId => dispatch(fetchUserChallenges(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);