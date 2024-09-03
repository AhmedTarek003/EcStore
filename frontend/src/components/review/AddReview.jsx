import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import useAddReview from "../../hooks/review/useAddReview";

const AddReview = ({ setReview, id }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const { loading, addReview } = useAddReview();

  const addReviewHandler = async (rate) => {
    setRating(rate);
    console.log(rate);
    await addReview(rate, id);
    setReview(false);
    window.location.reload();
  };

  return (
    <div className="absolute w-full h-full bg-[#00000069] top-0 left-0 z-50">
      <IoMdClose
        className="absolute top-10 right-6 cursor-pointer"
        onClick={() => setReview(false)}
        color="red"
        size={50}
      />
      <div className="flex h-full items-center justify-center">
        {loading ? (
          <div className="loading loading-spinner"></div>
        ) : (
          [...Array(5)].map((_, idx) => {
            const currentRate = idx + 1;
            return (
              <label key={idx}>
                <input
                  type="radio"
                  className="hidden"
                  value={currentRate}
                  onChange={() => addReviewHandler(currentRate)}
                />
                <FaStar
                  size={50}
                  className="cursor-pointer"
                  color={currentRate <= (rating || hover) ? "gold" : "#ccc"}
                  onMouseEnter={() => setHover(currentRate)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AddReview;
