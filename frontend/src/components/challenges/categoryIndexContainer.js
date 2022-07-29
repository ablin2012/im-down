import { connect } from 'react-redux';
import { fetchChallenges } from '../../actions/challengeActions';
import CategoryIndex from './categoryIndex';

const mapStateToProps = (state) => {
    return {
        challenges: Object.values(state.challenges.all)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchChallenges: () => dispatch(fetchChallenges())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryIndex)