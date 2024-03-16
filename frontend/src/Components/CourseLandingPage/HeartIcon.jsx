import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const HeartIcon = ({ wishlistState }) => {
  const [isActive, setIsActive] = useState(wishlistState);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const heartIcon = isActive ? solidHeart : regularHeart;

  return (
    <button className="border  border-black w-12 h-12" onClick={toggleActive}>
      <FontAwesomeIcon icon={heartIcon} className="text-black " size="lg" />
    </button>
  );
};

export default HeartIcon;
