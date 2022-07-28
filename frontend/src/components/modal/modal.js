import React from 'react';
import { closeModal } from '../../actions/modalActions';
import { connect } from 'react-redux';
import ChallengeFormContainer from '../challenges/challengeFormContainer';
import UserEditFormContainer from '../profile/userEditFormContainer'
import './modal.css'

const Modal = ({modal, closeModal}) => {
    if(!modal) {
        return null
    }

    let component;
    let divName;

    switch (modal) {
        case 'createChallenge':
            component = <ChallengeFormContainer />
        divName = "challenge-form-container"
            break;
        case 'updateCurrentUser':
            component = <UserEditFormContainer />
            divName = "challenge-form-container"
            break;
        default:
            return null;
    }

    return (
        <div className='modal-background' onClick={closeModal}>
            <div className={divName} onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        modal: state.ui.modal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)