import { connect } from 'react-redux';
import { fetchPosts } from "../../actions/postActions";
import PostsIndex from "./postsIndex";
import { fetchChallenge, fetchUserChallenges, addParticipation} from '../../actions/challengeActions';
import { fetchUser } from '../../actions/userActions';

const mapStateToProps = (state) => {
    return {
        posts: Object.values(state.posts.all),
        challenges: state.challenges.index,
        users: state.users.index,
        currentUser: state.session.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        fetchChallenge: (id) => dispatch(fetchChallenge(id)),
        fetchUser: (id) => dispatch(fetchUser(id)),
        addParticipation: (id) => dispatch(addParticipation(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex);