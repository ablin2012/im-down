import { connect } from 'react-redux';
import { fetchPosts } from "../../actions/postActions";
import PostsIndex from "./postsIndex";
import { fetchChallenge, fetchChallenges } from '../../actions/challengeActions';
import { fetchUser } from '../../actions/userActions';

const mapStateToProps = (state) => {
    return {
        posts: Object.values(state.posts.all),
        challenges: state.challenges.index,
        users: state.users.index
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        fetchChallenge: (id) => dispatch(fetchChallenge(id)),
        fetchUser: (id) => dispatch(fetchUser(id)),
        fetchChallenges: () => dispatch(fetchChallenges())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex);