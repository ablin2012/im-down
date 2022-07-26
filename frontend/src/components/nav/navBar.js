import React from 'react';
import { Link } from 'react-router-dom'
import './navbar.css'


class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div className='session-links-current'>
                    <Link to={'/challenges'}>All Challenges</Link>
                    <Link to={'/profile'}>Profile</Link>
                    {/* <Link to={'/new_challenge'}>Create a Challenge</Link> */}
                    <button onClick={() => this.props.openModal('createChallenge')}>Create Challenge</button>
                    <button className='logout-button' onClick={this.logoutUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <div className='session-links'>
                    <button className='nav-button'>
                        <Link to={'/signup'}>Signup</Link>
                    </button>
                    <button className='nav-button'>
                    <Link to={'/login'}>Login</Link>
                    </button>
                </div>
            );
        }
    }

    render() {
        return (
            <div className='nav-bar'>
                <h1>ImDown!</h1>
                {this.getLinks()}
            </div>
        );
    }
}

export default NavBar;