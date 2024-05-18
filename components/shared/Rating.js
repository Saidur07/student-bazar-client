import React from "react";

const Rating = ({ setRating }) => {
  return (
    <div className="rating ">
      <input
        type="radio"
        name="rating-2"
        className=" w-6 mx-1 h-6 mask mask-star-2 bg-orange-400"
        defaultChecked
        onChange={() => setRating(1)}
      />
      <input
        type="radio"
        name="rating-2"
        className="  w-6 mx-1 h-6 mask mask-star-2 bg-orange-400"
        onChange={() => setRating(2)}
      />
      <input
        type="radio"
        name="rating-2"
        className="  w-6 mx-1 h-6 mask mask-star-2 bg-orange-400"
        onChange={() => setRating(3)}
      />
      <input
        type="radio"
        name="rating-2"
        className="  w-6 mx-1 h-6 mask mask-star-2 bg-orange-400"
        onChange={() => setRating(4)}
      />
      <input
        type="radio"
        name="rating-2"
        className="  w-6 mx-1 h-6 mask mask-star-2 bg-orange-400"
        onChange={() => setRating(5)}
      />
    </div>
  );
};

export default Rating;
