import Lecture from "./Lecture";

const Section = ({ title, lectures, isLastSection }) => (
  <div className={`section ${isLastSection ? "border-b border-gray-300" : ""}`}>
    <h2 className="font-bold border border-gray-300 pl-8 py-3" style={{ backgroundColor: "#f8f9fb" }}>
      {title}
    </h2>
    <div className="lectures p-5 border-l border-gray-300 border-r">
      {lectures.map((lecture, index) => (
        <Lecture key={index} {...lecture} />
      ))}
    </div>
  </div>
);

export default Section;
