"use client";

import { FaThumbsUp } from "react-icons/fa";
import StarRate from "./StarRate";
import { useState } from "react";
import { Review } from "@/types";

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
        <div>
          {review.media.map((media, index) => (
            <img
              key={index}
              src={media.url}
              alt={`Review Image ${index}`}
              onClick={() => setImageView(media.url)}
            />
          ))}
        </div>
      )}
      <div>
        {imageView && (
          <div onClick={() => setImageView(null)}>
            <div>
              <img src={imageView} alt="Full Preview" />
            </div>
          </div>
        )}
      </div>

      {/* bulan, tanggal dan tahun dari review */}
      <div className="text-sm text-gray-500">
        {new Date(review.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </div>
  );
};

export default CardReview;
