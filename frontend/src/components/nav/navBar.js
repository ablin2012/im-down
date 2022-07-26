import React from 'react';
import { Link } from 'react-router-dom'
import './navbar.css'


class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        }
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    updateSearch() {
        return e => {
            this.props.parentCallback(e.currentTarget.value)
        }
    }

    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div className='nav-main-wrap'>
                    <div className='challenge-button-container'>
                        <button onClick={() => this.props.openModal('createChallenge')}>Create Challenge</button>
                    </div>
                    <div className="search-bar-container">
                        <span className="material-symbols-outlined" id="search-icon">
                            search
                        </span>
                        <input 
                            onChange={this.updateSearch()}
                            className="search-bar" 
                            type="text" 
                            placeholder="Search" />
                    </div>
                    <div className='session-links-current'>
                        
                        <Link to={'/challenges'}>Challenges</Link>
                        <Link to={'/profile'}>Profile</Link>
                        {/* <Link to={'/new_challenge'}>Create a Challenge</Link> */}
                        
                        <button className='logout-button' onClick={this.logoutUser}>Logout</button>
                    </div>
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
        console.log("nav-challenges", this.props.challenges)
        return (
            <div className='nav-bar'>
                <div className='nav-logo-wrap'>
                    <h1>ImDown!</h1>
                </div>
                {this.getLinks()}
            </div>
        );
    }
}

export default NavBar;