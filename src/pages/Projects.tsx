import Project from "../components/Project";
import { GuessThePicture } from "../components/GuessThePicture";

const Projects = () => {
  return (
    <div className="bg-gray-200 mt-3 min-h-screen py-12">
      <h1 className="text-4xl font-bold text-center mb-10">Projects</h1>

      <Project title="Guess the picture game">
        <p>Guess what you see in the picture. The earlier you get it the better!</p>
        <p><i>(I only have a few images but it's a working prototype.)</i></p>
        <GuessThePicture />
      </Project>

      <Project title="Placeholder Project">
        <p>Placeholder for future projects</p>
      </Project>
    </div>
  );
};

export default Projects;
