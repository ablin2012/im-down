import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchUserChallenges } from '../../actions/challengeActions';
// import { fetchUser, fetchUserAchievements } from '../../actions/userActions';
import UserShow from './userShow';

const mapStateToProps = (state, ownProps) => {
    return {
        challenges: Object.values(state.challenges.user),
        achivements: Object.values(state.achivements),
        currentUser: state.session.user,
        user: state.users[ownProps.match.params.user_id],
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchUserChallenges: id => dispatch(fetchUserChallenges(id)),
        // fetchUserAchievements: id => dispatch(fetchUserAchievements(id)),
        // fetchUser: id => dispatch(fetchUser(id)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserShow));