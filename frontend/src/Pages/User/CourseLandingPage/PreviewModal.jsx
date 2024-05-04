import React, { forwardRef } from "react";

const PreviewModal = forwardRef(({ course, videoRef }) => {
  return (
    <div className="modal ">
      <h1 className="text-2xl font-bold mb-4">Course Preview</h1>
      <video ref={videoRef} src={course.promotionalVideo.secureURL} controls autoPlay />
    </div>
  );
});

export default PreviewModal;
