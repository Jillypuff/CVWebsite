import React from "react";
import { GuessThePicture } from "../components/GuessThePicture";

const Projects: React.FC = () => {
  return (
    <div>
      <h1>Projects</h1>
      <section>
        <h2>Guess the Picture Game - Work in progress</h2>
        <GuessThePicture />
      </section>
      {/* other projects... */}
    </div>
  );
};

export default Projects;
