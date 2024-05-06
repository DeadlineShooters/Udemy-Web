import React, { useState, useEffect } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Pagination({ totalCourseNum, onSelectPage }) {
  const [active, setActive] = useState(1);
  const [totalPagesNum, setTotalPagesNum] = useState(0);
  const pagesToShow = 5; // Maximum number of pages to show

  useEffect(() => {
    // For demonstration, I'm setting total pages to 10
    // const pages = 10;
    // alert(totalCourseNum)
    setTotalPagesNum(Math.ceil(totalCourseNum / 6));
  }, []);

  const getItemProps = (index) => ({
    color: "gray",
    onClick: () => setActive(index),
    className:
      active === index
        ? "rounded-full bg-gray-500 flex justify-center text-white"
        : "rounded-full text-black bg-gray-300 flex justify-center",
  });

  const next = () => {
    if (active === totalPagesNum) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  const getPageNumbers = () => {
    const halfPagesToShow = Math.floor(pagesToShow / 2);
    let startPage = Math.max(1, active - halfPagesToShow);
    let endPage = Math.min(totalPagesNum, startPage + pagesToShow - 1);

    // Adjust startPage and endPage when near the beginning or end of the page list
    if (totalPagesNum - active < halfPagesToShow) {
      endPage = totalPagesNum;
      startPage = Math.max(1, endPage - pagesToShow + 1); // Ensure startPage is within valid range
    } else if (active <= halfPagesToShow) {
      startPage = 1;
      endPage = Math.min(totalPagesNum, startPage + pagesToShow - 1); // Adjust endPage accordingly
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };


  return (
    <div className="flex justify-center gap-4 mb-8">
      <Button variant="text" className="flex items-center gap-2 rounded-full" onClick={prev} disabled={active === 1}>
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-2">
        {getPageNumbers().map((pageNumber) => (
          <IconButton key={pageNumber} {...getItemProps(pageNumber)}>
            {pageNumber}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={active === totalPagesNum}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
