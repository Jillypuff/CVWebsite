import React from "react";
import About from "./PersonalInfo";
import Expertise from "./Expertise";
import LookingFor from "./LookingFor";

const Home: React.FC = () => {
  return (
    <>
      <About />
      <LookingFor />
      <Expertise />
    </>
  );
};

export default Home;
