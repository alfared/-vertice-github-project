import React from "react";
import Github from "../../components/github";

const Dashboard = () => {
  return (
    <>
      <div className="github-container">
        <div className="github-container__title">
          Explore repositories on Github
        </div>
        <Github />
      </div>
    </>
  );
};

export default Dashboard;
