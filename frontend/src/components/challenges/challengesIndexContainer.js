import { connect } from 'react-redux';
import { addParticipation, fetchChallenges, removeParticipation } from '../../actions/challengeActions';
import { fetchUserParticipations } from '../../actions/userActions';
import ChallengesIndex from './challengesIndex';

const mapStateToProps = (state) => {
    return {
        challenges: Object.values(state.challenges.all),
        participations: state.users.participations,
        currentUser: state.session.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchChallenges: () => dispatch(fetchChallenges()),
        fetchUserParticipations: id => dispatch(fetchUserParticipations(id)),
        addParticipation: (id) => dispatch(addParticipation(id)),
        removeParticipation: (id) => dispatch(removeParticipation(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengesIndex);
