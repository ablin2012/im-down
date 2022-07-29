import { connect } from 'react-redux';
import HomePage from './homePage';
import {openModal} from '../../actions/modalActions';
import {fetchUserChallenges} from '../../actions/challengeActions';
import {fetchUserAchievements, fetchUserParticipations, fetchUserFriendships} from '../../actions/userActions'

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user,
        challenges: Object.values(state.challenges.user),
        participations: state.users.participations,
        friendships: state.users.friendships,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        openModal: modal => dispatch(openModal(modal)),
        fetchUserChallenges: userId => dispatch(fetchUserChallenges(userId)),
        fetchUserAchievements: id => dispatch(fetchUserAchievements(id)),
        fetchUserParticipations: id => dispatch(fetchUserParticipations(id)),
        fetchUserFriendships: id => dispatch(fetchUserFriendships(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);