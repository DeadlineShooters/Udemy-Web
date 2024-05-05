
const LinkButton = ({ href, text, icon }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
        className="flex items-center justify-center px-3 mt-2 border border-black text-black hover:bg-gray-300 focus:outline-none"
        style={{ width: '200px', height: '48px' }}
    >
        {icon}
      <span className="ml-2 font-bold">{text}</span>
    </a>
  );
  
  export default LinkButton;
  