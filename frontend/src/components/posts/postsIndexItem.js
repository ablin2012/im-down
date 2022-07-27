import React from "react";

class PostIndexItem extends React.Component {
    render() {
        return (
            <div>
                <h3>{this.props.text}</h3>
            </div>
        )
    }
}

export default PostIndexItem;