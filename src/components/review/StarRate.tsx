import { FaStar } from "react-icons/fa";

const StarRate = ({rating}: {
    rating: number;
}) => {
    return (
        <>
            {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={`w-5 h-5 ${i < rating ? "fill-amber-400 text-amber-400" : "fill-gray-300 text-gray-300"}`}
                />
              ))}
        </>
    )
}

export default StarRate;