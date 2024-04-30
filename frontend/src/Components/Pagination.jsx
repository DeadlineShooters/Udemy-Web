import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="w-full flex items-center justify-between">
      <p className="text-lg">
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to <span>{currentPage === pageCount ? count : currentPage * PAGE_SIZE}</span> of <span>{count}</span> results
      </p>

      <div className="flex gap-2">
        <button
          className={`bg-gray-200 text-gray-700 rounded px-4 py-2 flex items-center justify-center transition duration-300 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300 hover:text-gray-800"
          }`}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <HiChevronLeft className="h-6 w-6" />
          <span>Previous</span>
        </button>

        <button
          className={`bg-gray-200 text-gray-700 rounded px-4 py-2 flex items-center justify-center transition duration-300 ${
            currentPage === pageCount ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300 hover:text-gray-800"
          }`}
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span>
          <HiChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
