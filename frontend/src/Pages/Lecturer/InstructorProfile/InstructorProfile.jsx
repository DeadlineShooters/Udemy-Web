import React from 'react';

const InstructorProfile = () => {
  return (
    <div className='main w-full border border-black mt-12 px-5'>
      <div className="border border-black mx-auto container relative pr-16 pb-6">
        <div className='instructor-image absolute right-0 top-0'>
        </div>
        <div className='instructor-social-links right-0 top-50'>
        </div>
        <div className='instructor-info'>
          <div className='font-bold text-slate-500'>INSTRUCTOR</div>
          <h1 className='text-4xl font-bold'>Stephane Maarek | AWS Certified Cloud Practitioner,Solutions Architect,Developer</h1>
          <h2 className='font-bold py-2'>Best Selling Instructor, 10x AWS Certified, Kafka Guru</h2>
          <div>
            <div className='inline text-xs px-2 py-1 bg-indigo-300 font-bold'>Udemy Instructor Partner</div>
          </div>
          <div className="instructor-stats flex mt-4">
            <div>
              <div className='mb-2 font-bold text-slate-500'>Total students</div>
              <div className='text-2xl font-bold'>2,439,390</div>
            </div>
            <div className='ml-6'>
              <div className='mb-2 font-bold text-slate-500'>Reviews</div>
              <div className='text-2xl font-bold'>762,622</div>
            </div>
          </div>
      
          <h2 className='pt-12 pb-4 font-bold text-xl'>About me</h2>
          <div>
            <div>
              <p>Stephane is a solutions architect, consultant and software developer that has a particular interest in all things related to Big Data, Cloud & API. He's also a many-times best seller instructor on Udemy for his courses in AWS and Apache Kafka.</p>
              <p className='mt-2 font-bold'>[See FAQ below to see in which order you can take my courses]</p>
              <p className='mt-2'>Stéphane is recognized as an AWS Hero and is an AWS Certified Solutions Architect Professional & AWS Certified DevOps Professional. He loves to teach people how to use the AWS properly, to get them ready for their AWS certifications, and most importantly for the real world.</p>
              <p className='mt-2'>He also loves Apache Kafka. He sits on the 2019 Program Committee organizing the Kafka Summit in New York, London and San Francisco. He is also an active member of the Apache Kafka community, authoring blogs on Medium and a guest blog for Confluent.</p>
              <p className='mt-2'>During his spare time he enjoys cooking, practicing yoga, surfing, watching TV shows, and traveling to awesome destinations!</p>
              <p className='mt-2'>&nbsp;</p>
              <p className='mt-2 font-bold'>FAQ: In which order should you learn?...</p>
              <p className='mt-2'><b>AWS Cloud:</b> Start with AWS Certified Solutions Architect Associate, then move on to AWS Certified Developer Associate and then AWS Certified SysOps Administrator. Afterwards you can either do AWS Certified Solutions Architect Professional or AWS Certified DevOps Professional, or a specialty certification of your choosing.</p>
              <p className='mt-2'>&nbsp;</p>
              <p className='mt-2'><b>Apache Kafka:</b> Start with Apache Kafka for Beginners, then you can learn Connect, Streams and Schema Registry if you're a developer, and Setup and Monitoring courses if you're an admin. Both tracks are needed to pass the Confluent Kafka certification.</p>
            </div>
            <div className='text-sm font-bold text-purple-700'>
              Show less
            </div>
          </div>
        </div>
        <div className='instructor-courses'>
          <h2>My courses (66)</h2>
          <div className="courses"></div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;