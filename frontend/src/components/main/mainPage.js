import React from 'react';
import { withRouter } from 'react-router-dom';
import NavBarContainer from "../nav/navBarContainer";
import './main.scss'
import { Link } from 'react-router-dom';



class MainPage extends React.Component {

    render() {
        return (
            <>
                {/* <header>
                    <NavBarContainer parentCallback={this.handleCallback} />
                </header> */}
                <div className='body-wrap'>
                    <div className='splash-container'>
                        <div className='splash-background'>
                            <div className='splash-overlay'>
                                <div className='splash-text-container'>
                                    {/* <h1>You don't have to be great to start, but you have to start to be great</h1> */}
                                    <h1>Interact with over 200,000 users looking for their next challenge and taking action</h1>
                                    <Link to="/signup"><h2>Join Today</h2></Link>
                                    <h3>Exciting challenges lie ahead and a great community of users who are <span>DOWN</span> to take on the challenges with you</h3>
                                    <h4>Already a member? Login in <Link to="/login"><span>here</span></Link></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer>
                </footer>
            </>
        );
    }
}

export default MainPage;