import Lecture from "./Lecture";

const Section = ({ title, lectures, isLastSection }) => {
  console.log(lectures[0]);
  return (
    <div className={`section ${isLastSection ? "border-b border-gray-300" : ""}`}>
      <h2 className={`pl-8 py-3 font-bold border border-gray-300`}>{title}</h2>
      <div className={`lectures p-5  border-gray-300 border-l border-r `}>
        {lectures.map((lecture) => (
          <Lecture key={lecture._id} title={lecture.name} duration={lecture.video.duration} />
        ))}
      </div>
    </div>
  );
};

export default Section;
