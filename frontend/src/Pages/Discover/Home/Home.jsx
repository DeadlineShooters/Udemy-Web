import React, { useState, useRef, useEffect } from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import { RenderStars } from "../../../Components/StarRatings";
import PreLoader from "../../../Components/PreLoader";

import axios from "axios";
import "react-multi-carousel/lib/styles.css";
import "./Home.css";
import { convertDecimal128ToNumber } from "../../../Components/Utils/Utils";

const responsive = {
  xl: {
    breakpoint: { max: 3000, min: 1280 },
    items: 5,
    slidesToSlide: 4,
  },
  lg: {
    breakpoint: { max: 1280, min: 1024 },
    items: 4,
    slidesToSlide: 3,
  },
  md: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 2,
  },
  sm: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
    slidesToSlide: 1,
  },
  none: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const Home = () => {
  const [courses, setCourses] = useState(null);
  const [categories, setCategories] = useState(null);
  const [categoryInd, setCategoryInd] = useState(null);
  const refContainer = useRef();
  const [containerWidth, setContainerWidth] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setContainerWidth(refContainer.current.offsetWidth);

    const handleResize = () => {
      setContainerWidth(refContainer.current.offsetWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (refContainer.current) {
      setContainerWidth(refContainer.current.offsetWidth);
      document.documentElement.style.setProperty("--containerWidth", `${containerWidth}px`);
    }
  }, [containerWidth]);

	useEffect(() => {
		if (categories) {
			categories.forEach((category) => {
				axios
					.get(`http://localhost:5000/courses/?category=${category.id}`)
					.then((response) => {
						if (response.data.success) {
							setCourses((prevCourses) => ({
								...prevCourses,
								[category.name]: response.data.courses,
							}));
						}
					})
					.catch((error) => {
						console.error('Error:', error);
					}).finally(() => {
						setTimeout(() => {
							setLoading(false);
						}, 1000);
					});
			});
		}
	}, [categories]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/courses/categories")
      .then((response) => {
        if (response.data.success) {
          setCategories(response.data.categories);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <div
        className="relative"
        onMouseLeave={() => {
          setCategoryInd(null);
        }}
      >
        <ul class="md:flex justify-center shadow-md flex-wrap max-h-12 overflow-hidden hidden">
          {categories &&
            categories.map((category, ind) => (
              <a
                href={`/courses/${category.id}`}
                className="group relative m-0 py-3 px-4"
                key={category._id}
                onMouseEnter={() => {
                  setCategoryInd(ind);
                }}
              >
                {category.name}
                <div
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-8 border-solid border-transparent border-b-[#2d2f31] ${
                    categoryInd != null && categoryInd === ind ? "block" : "hidden"
                  } `}
                ></div>
              </a>
            ))}
        </ul>
        <ul
          class="w-full z-9999 absolute bg-[#2d2f31] text-white md:flex justify-center shadow-md flex-wrap max-h-12 overflow-hidden"
          onMouseEnter={() => {
            setCategoryInd(categoryInd);
          }}
        >
          {categoryInd !== null &&
            categories[categoryInd].subCategories.slice(0, 6).map((subCategory) => (
              <a href={`/courses/${categories[categoryInd].id}`} className="m-0 py-3 px-4" key={subCategory.id}>
                {subCategory}
              </a>
            ))}
        </ul>
      </div>

      <div className="flex justify-center">
        <div className="max-w-[1340px] relative pb-12">
          <img src="https://img-c.udemycdn.com/notices/web_carousel_slide/image/db24b94e-d190-4d5a-b1dd-958f702cc8f5.jpg" alt="" />
          <div className="absolute left-12 top-6 lg:left-20 lg:top-16 bg-white hidden md:block md:w-80 lg:w-96 xl:w-[26rem] p-6 shadow-md">
            <h1 className="font-bold text-3xl lg:text-4xl mb-3">Learning that gets you</h1>
            <span className="text-base lg:text-lg pb-3 block">Skills for your present (and your future). Get started with us.</span>
          </div>
        </div>
      </div>
      <div ref={refContainer} className="px-8 max-w-[1340px] mx-auto">
        <span className="font-bold text-3xl text-gray-800 mb-8 block">What to learn next</span>
        {!loading && categories ? (
          categories.map((category) =>
            courses && courses[category.name] && courses[category.name].length > 0 ? (
              <div className="mb-12">
                <span className="font-bold text-2xl text-gray-800 block mb-4">
                  Top courses in{" "}
                  <a href={`courses/${category.id}`} className="text-[#5624d0] underline">
                    {category.name}
                  </a>
                </span>
                <Carousel containerClass="" itemClass="m-2 itemClassHome" responsive={responsive}>
                  {courses[category.name].map((course) => (
                    <Link to={`/course/${course._id}`}>
                      <div class="">
                        <img class="object-cover object-center w-full aspect-[16/9]" src={course.thumbNail.secureURL} alt="" />
                        <div class="flex flex-col gap-1 pt-1.5">
                          <h3 class="h-10 font-bold text-gray-900 line-clamp-2 leading-tight">{course.name}</h3>
                          <p class="text-xs truncate text-gray-500">
                            {course.instructor.firstName} {course.instructor.lastName}
                          </p>
                          <div class="flex gap-1 items-center">
                            <span class="text-gray-900 font-bold text-sm">{course.avgRating}</span>
                            <div class="flex gap-0.5">{RenderStars({ rating: course.avgRating })}</div>
                            <span class="text-gray-500 font-medium text-xs inline-block align-middle">({course.totalStudent.toLocaleString()})</span>
                          </div>
                          <div class="text-gray-500 text-xs align-middle">
                            {course.totalLength} total hours • {course.totalLecture} lectures
                          </div>
                          <div class="flex items-center space-x-2">
                            {course.price === 0 ? (
                              <span class="font-bold text-gray-900 ">Free</span>
                            ) : (
                              <>
                                <span class="font-bold text-gray-900 ">
                                  <span class="underline">đ</span>
                                  {(course.price * 0.8).toLocaleString()}
                                </span>
                                <span class="text-gray-500 line-through">
                                  <span class="underline">đ</span>
                                  {course.price.toLocaleString()}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </Carousel>
              </div>
            ) : null
          )
        ) : (
          <PreLoader />
        )}
      </div>
    </>
  );
};

export default Home;
