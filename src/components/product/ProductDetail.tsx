"use client";

import StarRate from "../review/StarRate";
import { fetchProduct } from "@/service/ProductAPI";
import Link from "next/link";
import { createReview, fetchReviewSummary } from "@/service/ReviewAPI";
import { totalDistValue } from "@/utils/totalDistValue";
import ReviewModal from "../ReviewModal";
import { Product, ReviewFormData, ReviewSummary } from "@/types";
import { useEffect, useState } from "react";
import ProductDetailSkeleton from "../ProductDetailSkeleton";

export default function ProductDetail() {
  const [dataProduct, setDataProduct] = useState<Product>();
  const [dataReviewSummary, setDataReviewSummary] = useState<ReviewSummary>();
  const [token, setToken] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const productId = 2;

  useEffect(() => {
    // token dari localStorage
    const t = localStorage.getItem("token");
    setToken(t);

    // fetch data product & review
    const load = async () => {
      const product = await fetchProduct(productId);
      const summary = await fetchReviewSummary(productId);
      setDataProduct(product);
      setDataReviewSummary(summary);
    };

    load();
  }, []);

  // handle review submit
  const handleReviewSubmit = async (review: ReviewFormData) => {
    if (!token) {
      alert("Silakan login dahulu.");
      return;
    }

    try {
      await createReview(productId, review, token);
      alert("Review berhasil dikirim!");
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim review");
    }
  };

  if (!dataProduct || !dataReviewSummary) {
    return <ProductDetailSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Product Image Section */}
      <div className="relative bg-gray-100">
        <div className="h-96 flex items-center justify-center overflow-hidden">
          <img
            src={dataProduct.imageUrl}
            alt={dataProduct.name}
            className="object-contain"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl lg:max-w-full mx-auto lg:mx-6 px-6 py-6 lg:px-0">
        {/* Product Title & Rating */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{dataProduct.name}</h1>
          <p className="text-xl font-semibold text-gray-700">
            Rp {dataProduct.price?.toLocaleString("id-ID")}
          </p>
          <div className="flex items-center gap-1 my-4">
            <StarRate rating={dataProduct.overallRating} />
            <span className="text-gray-400 text-[11px]">
              {dataProduct.totalReviews} REVIEWS
            </span>
          </div>
          <p className="text-gray-500 leading-relaxed max-w-2xl">
            {dataProduct.description}
          </p>
        </div>

        {/* Size */}
        <div className="flex flex-col">
          <button className="text-sm justify-start w-fit pb-2 text-gray-700">
            AVAILABLE SIZE
          </button>
          <div>
            {dataProduct.sizes.map((size, i) => (
              <button
                key={i}
                className="text-sm w-10 py-2 mr-2 text-center text-gray-900 border border-gray-900 hover:outline hover:outline-gray-900 hover:outline-offset-4"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t-2 border-gray-300 my-3" />

        {/* Reviews Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              REVIEWS ({dataReviewSummary.totalReviews})
            </h2>
            <Link
              href="/reviews"
              className="text-green-700 font-semibold hover:underline"
            >
              View More &gt;
            </Link>
          </div>

          {/* Average Rating */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <StarRate rating={dataReviewSummary.overallRating} />
            </div>
          </div>

          {/* Size Distribution */}
          <div className="space-y-3 mb-8">
            {Object.entries(dataReviewSummary.fitDistribution).map(
              ([key, value]) => (
                <div key={key} className="flex items-center gap-4">
                  <span className="w-24 text-sm text-gray-900 font-medium">{key}</span>
                  <div className="flex-1 bg-gray-300 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-green-700 h-full"
                      style={{
                        width: `${
                          (value /
                            totalDistValue(dataReviewSummary.fitDistribution)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <span className="w-12 text-sm text-gray-600 text-right">
                    {Math.round(
                      (value /
                        totalDistValue(dataReviewSummary.fitDistribution)) *
                        100
                    )}
                    %
                  </span>
                </div>
              )
            )}
          </div>

          <div className="border-t border-gray-300 my-8" />
        </div>
      </div>

      {/* Review Modal */}
      {/* <ReviewModal 
        isOpen={true}
        onClose={() => {}}
        onSubmit={handleReviewSubmit}
      /> */}
    </div>
  );
}
