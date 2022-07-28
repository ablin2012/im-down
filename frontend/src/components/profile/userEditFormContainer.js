import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { updateCurrentUser, fetchUser, sendFriendRequest } from '../../actions/userActions';
import UserEditForm from './userEditForm'
import { closeModal } from './../../actions/modalActions'
import { clearErrors } from './../../actions/sessionActions';
// import { sendFriendRequest } from '../../util/usersApiUtil';

const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.session.user,
        errors: state.errors.session,
        user: state.users.index[state.session.user.id],
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateCurrentUser: data => dispatch(updateCurrentUser(data)),
        closeModal: () => dispatch(closeModal()),
        clearErrors: () => dispatch(clearErrors()),
        fetchUser: (id) => dispatch(fetchUser(id)),
        sendFriendRequest: (id) => dispatch(sendFriendRequest(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserEditForm));
