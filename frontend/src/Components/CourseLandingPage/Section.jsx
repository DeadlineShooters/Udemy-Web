import Lecture from "./Lecture";

const Section = ({ title, lectures, isLastSection }) => (
  <div className={`section ${isLastSection ? "border-b border-gray-300" : ""}`}>
    <h2 className="font-bold border border-gray-300 pl-8 py-3" style={{ backgroundColor: "#f8f9fb" }}>
      {title}
    </h2>
    <div className="lectures p-5 border-l border-gray-300 border-r">
      {lectures.map((lecture) => (
        <Lecture key={lecture._id} title={lecture.name} duration={lecture.video.duration} />
      ))}
    </div>
  </div>
);

export default Section;
