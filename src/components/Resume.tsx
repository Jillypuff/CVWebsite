import ResumePDF from "../data/Resumé.pdf";

const Resume = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Resume</h2>
      <div className="ratio ratio-4x3">
        <iframe
          src={ResumePDF}
          title="Jesper Lindberg CV"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        ></iframe>
      </div>
      <div className="mt-3 text-center">
      <a href={ResumePDF} target="_blank" rel="noopener noreferrer">
        Open in new window
      </a>
      </div>
    </div>
  );
};

export default Resume;
