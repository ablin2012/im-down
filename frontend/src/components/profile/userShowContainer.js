import { connect } from 'react-redux';

import { fetchChallenge } from '../../actions/challengeActions';
import { fetchUser, fetchUserAchievements, fetchUserParticipations, sendFriendRequest, unsendFriendRequest, fetchCUOutgoingFR, fetchCUIncomingFR } from '../../actions/userActions';
import UserShow from './userShow';
import "./userShow.scss"
import { openModal } from './../../actions/modalActions';

const mapStateToProps = (state, ownProps) => {
    return {
        participations: state.users.participations,
        currentUser: state.session.user,
        achievements: state.users.achievements,
        user: state.users.index[ownProps.match.params.user_id],
        friendships: state.users.friendships,
        CUIncomingFR: state.users.CUIncomingFR,
        CUOutgoingFR: state.users.CUOutgoingFR,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchUserParticipations: id => dispatch(fetchUserParticipations(id)),
        // fetchChallenge: (challengeId) => dispatch(fetchChallenge(challengeId)),
        // fetchUserAchievements: id => dispatch(fetchUserAchievements(id)),
        fetchUser: id => dispatch(fetchUser(id)),
        openModal: modal => dispatch(openModal(modal)),
        sendFriendRequest: id => dispatch(sendFriendRequest(id)),
        unsendFriendRequest: id => dispatch(unsendFriendRequest(id)),
        fetchCUOutgoingFR: () => dispatch(fetchCUOutgoingFR()),
        fetchCUIncomingFR: () => dispatch(fetchCUIncomingFR())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);