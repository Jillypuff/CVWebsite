import Project from "../components/Project";
import GuessThePicture from "../components/GuessThePicture";
import Bounce from "../components/Bounce";

const Projects = () => {
  return (
    <div className="bg-gray-200 mt-3 min-h-screen py-12">
      <h1 className="text-4xl font-bold text-center mb-10">Projects</h1>

      <Project title="Guess the picture game">
        <p>Guess what you see in the blurred picture. Each guess unblurs the picture a little. The earlier you get it the better!</p>
        <p><i>(I only have a few images but it's a working prototype. Also pretend that there is more than one category.)</i></p>
        <GuessThePicture />
      </Project>

      <Project title="Physics Playground">
        <p>Play around with the physics simulator.</p>
        <p><i><small>(Built togheter with AI, does not represent real physics as there is a small jitter that will always keep it going.)</small></i></p>
        <Bounce />
      </Project>
    </div>
  );
};

export default Projects;
