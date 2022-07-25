import { connect } from 'react-redux';
import { fetchUserChallenges } from '../../actions/challengeActions';
import Profile from './profile';

const mapStateToProps = (state) => {
    return {
        challenges: Object.values(state.challenges.user),
        currentUser: state.session.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserChallenges: id => dispatch(fetchUserChallenges(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
