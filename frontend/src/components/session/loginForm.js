import React from 'react';
import { withRouter } from 'react-router-dom';
import './session.css'
import NavBarContainer from '../nav/navBarContainer';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
        this.loginDemo = this.loginDemo.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser === true) {
            this.props.history.push('/challenges');
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
            password: this.state.password
        };

        this.props.login(user);
    }

    loginDemo(e) {
        e.preventDefault();

        let user = {
            email: 'demo.user@imdown.com',
            password: '123123'
        }

        this.props.login(user);
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
            <div>
            <header>
                <NavBarContainer />
            </header>
            <div className='body-wrap'>
                <div className='session-background'>
                    <form className='session-form' onSubmit={this.handleSubmit}>
                        <div className='session-form-body'>
                            <h1>Log In</h1>
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
                                type="password"
                                value={this.state.password}
                                onChange={this.update('password')}
                                placeholder="Password"
                            />
                            {this.renderErrors("password")}
                            <br />
                            <input className='session-button purple' type="submit" value="Log In" />
                            <button className="session-button blue" onClick={this.loginDemo}>Login as Demo User</button>
                            {/* {this.renderErrors()} */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}

export default withRouter(LoginForm);