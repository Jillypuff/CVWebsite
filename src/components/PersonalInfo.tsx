import React from "react";

const About: React.FC = () => {
  return (
    <section className="container py-5">
      <div className="row align-items-center justify-content-center">
        <div className="col-md-4 text-center mb-4 mb-md-0">
          <img
            src="/images/profile.jpg"
            alt="Jesper Lindberg"
            className="img-fluid rounded shadow"
            style={{ maxHeight: "300px" }}
          />
        </div>

        <div className="col-md-7">
          <h2 className="display-5 mb-3">Jesper Lindberg</h2>
          <p className="lead">
            I am a passioned developer with a background in computer science and
            programming with a strong enthusiasm for creating innovative
            solutions. I have experience working with various programming
            languages and technologies. I love solving problems and always
            strive to improve my skills.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
