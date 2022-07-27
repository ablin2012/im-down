import { connect } from "react-redux";
import ProfileCard from "./profileCard";

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps)(ProfileCard);