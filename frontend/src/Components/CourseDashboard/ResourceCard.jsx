import React from "react";
import { Button } from "@material-tailwind/react";
import { Image } from "cloudinary-react";


export default function ResourceCard({ props }) {
  const {
    imgSrc,
    title,
    desciption, 
    getStartedUrl,
  } = props
  return (
    <div className="w-full py-4 px-12 drop-shadow-md border-2 bg-white flex justify-between">
      <div className="flex">
        <div className="flex justify-center items-center w-2/5">
          <img src={imgSrc} alt="" className="object-cover w-52 h-52" />
        </div>
        <div className="pt-4 w-3/5 pl-4">
          <h3 className="mb-8 text-2xl">{title}</h3>
          <p className="mb-8">{desciption}</p>
          <a href={getStartedUrl} className="text-purple-700 underline underline-offset-4">Get Started</a>
        </div>
      </div>
    </div>
  );
};



// export default function ResourceCard({ imageSource, title, description }) {
//   return (
//     <div className="relative bg-white shadow-md overflow-hidden">
//       <img
//         className="w-full h-48 object-cover rounded-t-lg"
//         src={imageSource}
//         alt={title}
//       />
//       <div className="p-6 relative">
//         <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//           {title}
//         </h5>
//         <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
//           {description}
//         </p>
//         <div className="mt-6 flex items-center justify-end">
//           <a
//             className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md focus:outline-none"
//           >
//             Get started
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };
