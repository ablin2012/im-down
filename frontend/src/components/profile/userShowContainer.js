import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchUserChallenges } from '../../actions/challengeActions';
import { fetchUser, fetchUserAchievements, fetchUserParticipations } from '../../actions/userActions';
import UserShow from './userShow';

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
        // fetchUserAchievements: id => dispatch(fetchUserAchievements(id)),
        fetchUser: id => dispatch(fetchUser(id)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserShow));