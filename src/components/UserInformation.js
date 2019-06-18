import React from "react";
import PropTypes from "prop-types";

const UserInformation = ({ userInfo }) => {
  return (
    <div>
      <div className="flex flex-row mb1" style={{ display: "flex" }}>
        <img
          style={{ maxWidth: "100px", maxHeight: "100px" }}
          src={userInfo.user_avatar}
          alt="User Avatar"
        />
        <div className="ml2 flex flex-column">
          <span className="f4 b mb1">{`${userInfo.first_name} ${
            userInfo.last_name
          }`}</span>
          <span className="f6 f5-l">
            Total Check-ins: {userInfo.stats.total_checkins}
          </span>
          <span className="f6 f5-l">Loaded Check-ins: {userInfo.totalCheckins}</span>
          <span className="f6 f5-l">Beers: {userInfo.stats.total_beers}</span>
          <span className="f6 f5-l">Badges: {userInfo.stats.total_badges}</span>
        </div>
      </div>
      <hr className="black br1" />
    </div>
  );
};

UserInformation.propTypes = {
  userInfo: PropTypes.object.isRequired
};

export default UserInformation;
