import React from 'react';
import axios, { post } from 'axios';
// import ChallengesIndexItem from './challengesIndexItem';
import './../challenges/challengeModal.css'


class UserEditForm extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.currentUser)
        console.log(this.props.user)
        this.state = {
            username: this.props.user.username,
            email: this.props.user.email,
            password: "",
            password2: "",
            passwordConfirm: "",
            imageFile: null,
            imageUrl: null,
            url: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({ newChallenge: nextProps.newChallenge.title });
    // }

    componentWillUnmount() {
        this.props.clearErrors()
        this.props.fetchUser(this.props.currentUser.id)
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData() 
        formData.append("imageUrl",this.state.imageFile)
        formData.append("username",this.state.username)
        formData.append("email",this.state.email)
        formData.append("password",this.state.password)
        formData.append("password2",this.state.password2)
        formData.append("passwordConfirm",this.state.passwordConfirm)

        this.props.updateCurrentUser(formData)
        .then((res) => {
          if (res.user) {
                this.props.clearErrors()
                this.props.fetchUser(this.props.currentUser.id)
                this.props.closeModal()
            }
           return null
        })
            

    }

    handleFile(e) {
        // events has built in currentTarget and files methods
        const file = e.currentTarget.files[0]
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({imageFile: file, imageUrl: fileReader.result})
        }

        if (file) {
            fileReader.readAsDataURL(file) //the readAsDataURL initiates the beginning of reading of the file
        }
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    renderErrors(field) {
        if (!this.props.errors) { return null }
        return (
            <ul className='session-errors'>
                {Object.keys(this.props.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {error === field ? this.props.errors[error] : null}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        if (this.props.currentUser._id !== this.props.user.id) {return null}
        const previewImg = this.state.imageUrl ? <div className="image-preview"><img src={this.state.imageUrl} /></div> : null;
        const uploadBox = (
            <div className='dotted-border'>
                <div className='input-container'>
                    <label className='img-input-label' htmlFor='image-input'>
                        <span className="material-symbols-outlined">
                            file_upload
                        </span>
                        <p>Upload a profile picture here</p>
                    </label>
                    <input type="file"
                        id="image-input"
                        className="image-upload-box"
                        onChange={this.handleFile} />
                    {previewImg}
                </div>
            </div>
        )

        return (
            <div className='challenge-form-modal'>
                <div className='challenge-form-head'>
                    <h2>Update user information</h2>
                    </div>
                <form className='challenge-form' onSubmit={this.handleSubmit}>
                    <div className='challenge-form-body'>
                        <div className='img-upload-container'>
                            {this.state.imageUrl ? previewImg : uploadBox}
                        </div>
                        <div className='challenge-form-inputs'>
                            {this.renderErrors("username")}
                            <input className='challenge-input'
                                type="text"
                                value={this.state.username}
                                onChange={this.update('username')}
                                placeholder="New username"
                                />
                            {this.renderErrors("email")}
                            <input className='challenge-input'
                                type="text"
                                value={this.state.email}
                                onChange={this.update('email')}
                                placeholder="New email"
                            />
                            {this.renderErrors("password")}
                            <input className='challenge-input'
                                type="password"
                                value={this.state.password}
                                onChange={this.update('password')}
                                placeholder="New password"
                            />
                            {this.renderErrors("password2")}
                            <input className='challenge-input'
                                type="password"
                                value={this.state.password2}
                                onChange={this.update('password2')}
                                placeholder="Confirm new password"
                            />
                            {this.renderErrors("passwordConfirm")}
                            <input className='challenge-input'
                                type="password"
                                value={this.state.passwordConfirm}
                                onChange={this.update('passwordConfirm')}
                                placeholder="Current password"
                            />
                            
                            <div className='button-container'>
                                <input className="save-challenge" type="submit" value="Submit" />
                            </div>
                        </div>

                    </div>
                </form>
                <br />
            </div>
        )
    }
}

export default UserEditForm;
