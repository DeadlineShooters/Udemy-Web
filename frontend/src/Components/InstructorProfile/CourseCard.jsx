import { Rating } from "@material-tailwind/react";


const courseImage =
	"https://res.cloudinary.com/dk6q93ryt/image/upload/v1696217092/samples/smile.jpg";

const CourseCard = (instructorInfo) => {
    return (
        <div className="w-full">
            <img src={courseImage} alt="" />
            <p className="font-bold"><span>[NEW] </span>Ultimate AWS Certified Cloud Practitioner CLF-C02</p>
            <p className="text-xs text-neutral-500">Stephane Maarek | AWS Certified Cloud...</p>
            <div>4.7
                <div style={{ fontSize: '2px' }}> {/* Applied custom CSS for smaller font size */}
                    <Rating value={4} />
                </div>
                <span className="text-xs text-neutral-500">(197,359)</span>
            </div>
            <div className="text-xs text-neutral-500	">15 total hours - 281 lectures - Beginner</div>
            <div className="font-bold">đ399,000 đ2,199,000</div>
            <div className="inline text-xs px-2 py-1 bg-amber-200 font-bold">Bestseller</div>
        </div>
    );
}

export default CourseCard;