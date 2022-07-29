import React from 'react'
import { withRouter } from 'react-router-dom';
import NavBarContainer from '../nav/navBarContainer';
import { Link } from 'react-router-dom';

import ChallengesIndexItem from './challengesIndexItem';

class CategoryIndex extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            challenges: [],
            filter: ""
        }
    }

    componentDidMount() {
        this.props.fetchChallenges();
    }

    componentWillReceiveProps(newState) {
        this.setState({ challenges: newState.challenges });
    }

    handleCallback = (navSearchData) => this.setState({ 'filter': navSearchData })

    handleSearch() {
        if (this.state.filter === "") {
            return this.state.challenges
        } else {
            return this.state.challenges.filter(challenge =>
                challenge.title.match(new RegExp(this.state.filter, "i")) ||
                challenge.description.match(new RegExp(this.state.filter, "i")) ||
                challenge.category.match(new RegExp(this.state.filter, "i")))
        }
    }

    categorizeChallenge(category) {
        const categorizedArr = this.handleSearch().filter(challenge => challenge.category.match(new RegExp(category, "i")))

        return (
            categorizedArr.map(challenge => (
                <Link to={`/challenges/${challenge._id}`} key={challenge._id} >
                    <ChallengesIndexItem
                        title={challenge.title}
                        description={challenge.description}
                        category={challenge.category}
                        imageUrl={challenge.imageUrl} />
                </Link>
            ))
        )
    }

    render(){

        const category = this.props.match.params.category

        if (this.state.challenges.length === 0) return null

        return (
            <>
                <header>
                    <NavBarContainer parentCallback={this.handleCallback} />
                </header>
                <div className='body-wrap'>
                    <div className='challenge-cards-container'>
                        <div className='challenges-header'>
                            <h2>Discover your next challenge!</h2>

                        </div>
                        {/* carousel */}
                        <div className='categorized-challenges-container'>
                            <div className='category-index-container'>
                                <div>
                                    <h1>{category.toUpperCase() + category.substring(1)}</h1>
                                </div>
                                {this.categorizeChallenge(category)}
                            </div>
                            {/* {categories.map((category, idx) => (
                                <div className="category-wrap" key={idx}>
                                    <div>
                                        <h1>{`${category}`[0].toUpperCase() + `${category}`.substring(1)}</h1>
                                    </div>
                                    <div className='categorized-challenges' id={`${category}`} >
                                        {this.categorizeChallenge(`${category}`)}
                                    </div>

                                </div>
                            ))} */}

                        </div>
                    </div>
                </div>
            </>
        );
    }
}


export default withRouter(CategoryIndex)