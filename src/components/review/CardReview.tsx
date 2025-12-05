"use client";

import { FaThumbsUp } from "react-icons/fa";
import StarRate from "./StarRate";
import { useState } from "react";
import { Review } from "@/types";
import {X, Maximize2} from "lucide-react";

const CardReview = ({ review }: { review: Review }) => {
  const [dataReview, setDataReview] = useState(review);
  const [likedReviews, setLikedReviews] = useState<Set<number>>(new Set());

  const [reviewFullView, setReviewFullView] = useState(false);
  const [imageView, setImageView] = useState<string | null>(null);

  const reviewText = review.content || "";
  const longReviewText = reviewText.length > 150;

  const handleLikeClick = (reviewId: number) => {
    const isLiked = likedReviews.has(reviewId);
    const newLikedReviews = new Set(likedReviews);

    if (isLiked) {
      newLikedReviews.delete(reviewId);
    } else {
      newLikedReviews.add(reviewId);
    }

    setLikedReviews(newLikedReviews);

    setDataReview((prev) => ({
      ...prev,
      helpfulCount: isLiked ? prev.helpfulCount - 1 : prev.helpfulCount + 1,
    }));
  };
  return (
    <div className="mx-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          {/* menambah avatar user */}
          <img
            src={review.user.avatarUrl}
            alt={review.user.name}
            className="rounded-full size-8"
          />

          <div>
            {/* beri icon 5 bintang */}
            <p className="text-gray-900">{review.user.name}</p>

            {/* data body size contoh: 165cm 65kg 88/78/110 cm */}
            <p className="text-[11px] text-gray-400">
              {review.userMeasurement.bust} / {review.userMeasurement.waist} /{" "}
              {review.userMeasurement.hips} CM
            </p>
          </div>
        </div>

        {/* tombol icon like dan lable review review */}
        <div className="flex flex-row items-center gap-1 text-gray-700">
          <button
            onClick={() => handleLikeClick(dataReview.id)}
            className="flex items-center gap-1 text-sm font-semibold hover:opacity-70 transition-opacity"
          >
            <FaThumbsUp
              className={`w-5 h-5 ${
                likedReviews.has(dataReview.id)
                  ? "fill-amber-400 text-amber-400"
                  : "text-gray-400"
              }`}
            />
            {`(${dataReview.helpfulCount})`}
          </button>
        </div>
      </div>

      <div className="flex py-2">
        <StarRate rating={review.rating} />
      </div>

      {/* text review dari user */}
      <div className="text-gray-900">
        {reviewFullView ? reviewText : reviewText.substring(0, 150)}
        {!reviewFullView && longReviewText && "..."}

        {longReviewText && (
          <button onClick={() => setReviewFullView(!reviewFullView)}>
            {reviewFullView ? "Show Less" : " Read More"}
          </button>
        )}
      </div>

      {/* field gambar dari product review */}
      {review.media && review.media.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-3 no-scrollbar">
          {review.media.map((media, index) => {
            const isVideo = media.url.endsWith(".mp4") || media.url.endsWith(".mov"); 
            
            return (
              <div 
                key={index} 
                className="relative flex-shrink-0 group cursor-pointer w-20 h-20 rounded-lg overflow-hidden border border-gray-200"
                onClick={() => setImageView(media.url)}
              >
                {isVideo ? (
                   <video src={media.url} className="w-full h-full object-cover" />
                ) : (
                   <img
                    src={media.url}
                    alt={`Review ${index}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                )}
                
                {/* Icon saat diarahkan mouse */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                   <Maximize2 className="w-5 h-5 text-white drop-shadow-md" />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal Full Screen Clicked Image */} 
      {imageView && (
        <div 
          className="relative bg-white p-2 rounded-lg shadow-2xl max-w-3xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}  
        >
          {/* Button Close (X) */}
          <button 
             className="absolute -top-3 -right-3 p-1.5 bg-gray-700 text-white rounded-full hover:bg-gray-600 shadow-md transition-transform hover:scale-110 z-10"
               onClick={() => setImageView(null)}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Full Image */}
          <img 
            src={imageView} 
            alt="Full Preview" 
            className="max-w-full max-h-[80vh] object-contain rounded-md shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
};

export default CardReview;