import React from "react";
import { Link } from "react-router-dom";

const LandingPage = (props) => {

    return(
        <div className="landing-button">
            <div>
            <Link to="/playerDetails"><button type="button" class="btn btn-primary btn-lg">Click To View Player List</button></Link>
            </div>
        </div>
    )
}

export default LandingPage;