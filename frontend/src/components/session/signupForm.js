import React from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearedErrors = false;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.signedIn === true) {
            this.props.history.push('/login');
        }

        this.setState({ errors: nextProps.errors })
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let user = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.signup(user, this.props.history);
    }

    renderErrors(field) {
        return (
            <ul className='session-errors'>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {error === field ? this.state.errors[error] : null}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div className="session-background">
                <form className='session-form' onSubmit={this.handleSubmit}>
                    <div className="session-form-body">
                        <h1>Sign up!</h1>
                        <br />
                        <input className='session-input'
                            type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                        />
                        {this.renderErrors("email")}
                        <br />
                        <input className='session-input'
                             type="text"
                            value={this.state.username}
                            onChange={this.update('username')}
                            placeholder="Username"
                        />
                        {this.renderErrors("username")}
                        <br />
                        <input className='session-input'
                             type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                        />
                        {this.renderErrors("password")}
                        <br />
                        <input className='session-input'
                            type="password"
                            value={this.state.password2}
                            onChange={this.update('password2')}
                            placeholder="Confirm Password"
                        />
                        {this.renderErrors("password2")}
                        <br />
                        <input className='session-button' type="submit" value="Submit" />
                        
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(SignupForm);
