import React from "react";
import { Link } from "react-router-dom";
import { shortenStr } from "../../util/miscUtil";

class ChallengeCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {challenge} = this.props
        const img = (challenge.imageUrl) ? (
            <img className="challenge-icon-img" src={challenge.imageUrl} />
        ) : (null)
        return (
            <Link to={`/challenges/${challenge._id}`}>
                <div className="challenge-icon">
                    <div className="icon-img-container">
                        {img}
                    </div>
                    <div className="challenge-icon-text">
                        <p>{shortenStr(challenge.title, 30)}</p>
                    </div>
                </div>
            </Link>
        )
    }
}

export default ChallengeCard;