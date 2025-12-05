import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { fetchReviews, fetchReviewSummary } from "@/service/ReviewAPI";
import StarRate from "@/components/review/StarRate";
import { totalDistValue } from "@/utils/totalDistValue";
import CardReview from "@/components/review/CardReview";

export default async function ReviewsPage() {
  const dataReviews = await fetchReviews(2);
  const dataReviewSummary = await fetchReviewSummary(2);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10 text-gray-900">
        <div className="flex items-center justify-between p-2.5 max-w-2xl lg:max-w-full mx-auto lg:ml-6">
          <Link href="/" className="p-2 hover:bg-gray-100 rounded">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">
            Reviews ({dataReviewSummary.totalReviews})
          </h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Rating Overview */}
      <div className="border-b border-gray-200 p-4 max-w-2xl lg:max-w-full mx-auto lg:mx-6 text-gray-900">
        <div className="flex items-start gap-6 mb-6">
          <div className="text-5xl w-16 text-center font-bold">
            {dataReviewSummary.overallRating.toFixed(1)}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-1">
              <StarRate rating={dataReviewSummary.overallRating} />
            </div>
            <p className="text-sm text-gray-600">
              Based on {dataReviewSummary.totalReviews} reviews
            </p>
          </div>
        </div>

        {/* Fit Scale */}
        <h3 className="font-bold mb-4">Fit Scale</h3>
        <div className="space-y-4">
          {Object.entries(dataReviewSummary.fitDistribution).map(
            ([key, value]) => (
              <div key={key} className="flex items-center gap-4">
                <span className="w-24 text-sm font-medium">{key}</span>
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
      </div>

      {/* Review List */}
      <div className="space-y-8 mt-6 lg:mx-6">
        {dataReviews.data.map((review) => (
          <div key={review.id} className="border-b-2 border-gray-300 pb-2">
            <CardReview review={review} />
          </div>
        ))}
      </div>
    </div>
  );
}
