import { FitType, PaginatedResponse, Review, ReviewFormData, ReviewSummary } from "@/types";

export const fetchReviews = async (productId: number): Promise<PaginatedResponse<Review>> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/reviews`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        throw new Error("Failed to fetch data reviews")
    }

    return response.json();
}

export const fetchReviewSummary = async (productId: number): Promise<ReviewSummary> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/reviews/summary`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        throw new Error("Failed to fetch data reviews summary")
    }

    return response.json();
}

export const createReview = async (
  productId: number,
  data: ReviewFormData,
  token: string,
) => {
  const formData = new FormData();
  formData.append('rating', String(data.rating));
  formData.append('content', data.content);
  formData.append('waist', String(data.waist));
  formData.append('bust', String(data.bust));
  formData.append('hips', String(data.hips));
  formData.append('fit', data.fit);

  if (data.media) {
    data.media.forEach((file) => {
      formData.append('media', file);
    });
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reviews/products/${productId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );
  return response.json();
};