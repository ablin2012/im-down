import { connect } from 'react-redux';
import { logout } from '../../actions/sessionActions';
import { openModal } from '../../actions/modalActions';

import NavBar from './navBar';

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
    openModal: modal => dispatch(openModal(modal)),
    logout: () => dispatch(logout()) 
})

export default connect(mapStateToProps, 
mapDispatchToProps)(NavBar);