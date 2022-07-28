import { connect } from 'react-redux';

import { fetchChallenge } from '../../actions/challengeActions';
import { fetchUser, fetchUserAchievements, fetchUserParticipations } from '../../actions/userActions';
import UserShow from './userShow';
import "./userShow.scss"

const mapStateToProps = (state, ownProps) => {
    return {
        participations: state.users.participations,
        currentUser: state.session.user,
        achievements: state.users.achievements,
        user: state.users.index[ownProps.match.params.user_id],
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchUserParticipations: id => dispatch(fetchUserParticipations(id)),
        // fetchChallenge: (challengeId) => dispatch(fetchChallenge(challengeId)),
        // fetchUserAchievements: id => dispatch(fetchUserAchievements(id)),
        fetchUser: id => dispatch(fetchUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);