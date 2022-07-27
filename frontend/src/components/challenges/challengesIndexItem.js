import React from 'react';


class ChallengesIndexItem extends React.Component {
    render() {
        return (
            <div className='challenge-card'>
                <div className='challenge-img-container'>
                    <img src={this.props.imageUrl}></img>
                </div>
                {/* <div className='hidden-details'>
                    <p>{this.props.description}</p>
                </div> */}
                <div className='challenge-card-details'>
                    <div className='challenge-card-header'>
                        <h3 className='card-title'>{this.props.title}</h3>
                        {/* <h4 className='card-category'>{this.props.category}</h4> */}
                    </div>
                    {/* <div>
                        <p className='card-desc'>{this.props.description}</p>
                    </div> */}
                    <div className='options'>
                        {/* <p>Down for the challenge!?</p> */}
                        <button>Join!</button>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default ChallengesIndexItem;
