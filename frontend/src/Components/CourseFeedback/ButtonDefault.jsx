export default function ButtonDefault({ handleClick, text }) {
  return (
    <button onClick={handleClick} className="duration-300 ease-in-out hover:text-purple-600 active:bg-gray-200  active:text-purple-800 text-gray-500 text-lg font-bold text-start">
      {text}
    </button>
  );
}
