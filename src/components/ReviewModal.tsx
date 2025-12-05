"use client";

import type React from "react";

import { useState } from "react";
import { X, Star, Upload, Trash2 } from "lucide-react";
import { FitType, ReviewFormData } from "@/types";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: ReviewFormData) => void;
}

const VALID_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const VALID_VIDEO_TYPES = ["video/mp4", "video/quicktime"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_FILES = 5;

const MEASUREMENT_RANGES = {
  waist: { min: 50, max: 150 },
  bust: { min: 60, max: 150 },
  hips: { min: 60, max: 160 },
};

const validateFile = (file: File): { valid: boolean; error?: string } => {
  const isImage = VALID_IMAGE_TYPES.includes(file.type);
  const isVideo = VALID_VIDEO_TYPES.includes(file.type);

  if (!isImage && !isVideo) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: jpg, png, webp for images or mp4, mov for videos`,
    };
  }

  if (isImage && file.size > MAX_IMAGE_SIZE) {
    return { valid: false, error: `Image "${file.name}" exceeds 5MB limit` };
  }

  if (isVideo && file.size > MAX_VIDEO_SIZE) {
    return { valid: false, error: `Video "${file.name}" exceeds 50MB limit` };
  }

  return { valid: true };
};

export default function ReviewModal({
  isOpen,
  onClose,
  onSubmit,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [content, setContent] = useState("");
  const [fit, setFit] = useState<FitType | "">("");
  const [waist, setWaist] = useState("");
  const [bust, setBust] = useState("");
  const [hips, setHips] = useState("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({}); // Add error state

  // clear error required
  const clearError = (field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  // handle media change
  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFilesList = Array.from(files);

    if (mediaFiles.length + newFilesList.length > MAX_FILES) {
      setErrors({
        ...errors,
        media: `Maximum ${MAX_FILES} files allowed`,
      });
      return;
    }

    let hasError = false;
    newFilesList.forEach((file) => {
      const validation = validateFile(file);
      if (!validation.valid) {
        setErrors({
          ...errors,
          media: validation.error || "Invalid file",
        });
        hasError = true;
      }
    });

    if (hasError) return;

    newFilesList.forEach((file) => {
      setMediaFiles((prev) => [...prev, file]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.media;
      return newErrors;
    });
  };

  // remove media file
  const removeMediaFile = (index: number) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
    setMediaPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // validate measurement
  const validateMeasurement = (
    field: "waist" | "bust" | "hips",
    value: string
  ): boolean => {
    if (!value) return true;
    const numValue = Number.parseInt(value);
    const range = MEASUREMENT_RANGES[field];
    if (numValue < range.min || numValue > range.max) {
      setErrors((prev) => ({
        ...prev,
        [field]: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } must be between ${range.min}-${range.max} cm`,
      }));
      return false;
    }
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
    return true;
  };

  // handle measurement change
  const handleMeasurementChange = (
    field: "waist" | "bust" | "hips",
    value: string,
    setter: (value: string) => void
  ) => {
    setter(value);
    if (value) {
      validateMeasurement(field, value);
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // handle submit review
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    // required rating
    if (rating === 0) {
      newErrors.rating = "Please select a rating";
    }

    // required content
    if (content.trim().length < 10) {
      newErrors.content = "Comment must be at least 10 characters";
    } else if (content.trim().length > 1000) {
      newErrors.content = "Comment must not exceed 1000 characters";
    }

    // required fit
    if (!fit) {
      newErrors.fit = "Please select how it fits";
    }

    // required measurement
    if (!waist) {
      newErrors.waist = "Waist measurement is required";
    }
    if (!bust) {
      newErrors.bust = "Bust measurement is required";
    }
    if (!hips) {
      newErrors.hips = "Hips measurement is required";
    }

    // range validation
    if (waist && !validateMeasurement("waist", waist)) {
      // Error already set
    }
    if (bust && !validateMeasurement("bust", bust)) {
      // Error already set
    }
    if (hips && !validateMeasurement("hips", hips)) {
      // Error already set
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }

    const parsedWaist = Number.parseInt(waist);
    const parsedBust = Number.parseInt(bust);
    const parsedHips = Number.parseInt(hips);

    onSubmit({
      rating,
      content: content.trim(),
      waist: parsedWaist,
      bust: parsedBust,
      hips: parsedHips,
      fit: fit,
      media: mediaFiles,
    });

    // Reset form
    setRating(0);
    setContent("");
    setFit("");
    setWaist("");
    setBust("");
    setHips("");
    setMediaFiles([]);
    setMediaPreviews([]);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 text-gray-900 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-2xl font-bold">Write a Review</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Rating Section */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    setRating(star);
                    clearError("rating");
                  }}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating)
                        ? "fill-amber-400 text-amber-400"
                        : errors.rating ? "text-red-300" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                {rating} out of 5 stars
              </p>
            )}
            {errors.rating && (
              <p className="text-sm text-red-500 mt-2">{errors.rating}</p>
            )}
          </div>

          {/* Content Section */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-semibold mb-2"
            >
              Comment <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => {
                const value = e.target.value;
                setContent(value);

                if (value.trim().length >= 10 && value.trim().length <= 1000) {
                  clearError("content");
                }
              }}
              placeholder="Share your experience with this product..."
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none ${
                errors.content
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-amber-400"
              }`}
              rows={4}
            />
            <p
              className={`text-xs mt-1 ${
                content.length < 10 || content.length > 1000
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              {content.length} / 1000 characters (minimum 10)
            </p>
            {errors.content && (
              <p className="text-sm text-red-500 mt-2">{errors.content}</p>
            )}
          </div>

          {/* Fit Section */}
          <div>
            <label htmlFor="fit" className="block text-sm font-semibold mb-2">
              How does it fit?
            </label>
            <select
              id="fit"
              value={fit}
              onChange={(e) => {
                setFit(e.target.value as FitType | "");
                clearError("fit");
              }}
              className={`w-full px-3 py-2 border ${
                errors.fit
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-amber-400"
              } rounded-lg focus:outline-none focus:ring-2  cursor-pointer`}
            >
              <option value="" disabled>
                Select fit
              </option>
              <option value={FitType.SMALL}>Runs Small</option>
              <option value={FitType.TRUE}>True to Size</option>
              <option value={FitType.LARGE}>Runs Large</option>
            </select>
            {errors.fit && (
              <p className="mt-1 text-xs text-red-500">{errors.fit}</p>
            )}
          </div>

          {/* Measurements Section */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              Measurements
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="waist"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  Waist (cm) <span className="text-gray-500">50-150</span>
                </label>
                <input
                  id="waist"
                  type="number"
                  value={waist}
                  onChange={(e) =>
                    handleMeasurementChange("waist", e.target.value, setWaist)
                  }
                  placeholder="e.g., 78"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.waist
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-amber-400"
                  }`}
                />
                {errors.waist && (
                  <p className="text-xs text-red-500 mt-1">{errors.waist}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="bust"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  Bust (cm) <span className="text-gray-500">60-150</span>
                </label>
                <input
                  id="bust"
                  type="number"
                  value={bust}
                  onChange={(e) =>
                    handleMeasurementChange("bust", e.target.value, setBust)
                  }
                  placeholder="e.g., 88"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.bust
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-amber-400"
                  }`}
                />
                {errors.bust && (
                  <p className="text-xs text-red-500 mt-1">{errors.bust}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="hips"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  Hips (cm) <span className="text-gray-500">60-160</span>
                </label>
                <input
                  id="hips"
                  type="number"
                  value={hips}
                  onChange={(e) =>
                    handleMeasurementChange("hips", e.target.value, setHips)
                  }
                  placeholder="e.g., 110"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.hips
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-amber-400"
                  }`}
                />
                {errors.hips && (
                  <p className="text-xs text-red-500 mt-1">{errors.hips}</p>
                )}
              </div>
            </div>
          </div>

          {/* Media Upload Section */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Upload Images/Videos (Optional - Max {MAX_FILES} files)
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Images: jpg, png, webp (max 5MB each) | Videos: mp4, mov (max 50MB
              each)
            </p>
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors cursor-pointer ${
                errors.media
                  ? "border-red-500 hover:border-red-400"
                  : "border-gray-300 hover:border-amber-400"
              }`}
            >
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.mp4,.mov"
                onChange={handleMediaChange}
                className="hidden"
                id="media-upload"
                multiple
              />
              <label htmlFor="media-upload" className="cursor-pointer block">
                <div className="space-y-2">
                  <Upload className="w-6 h-6 mx-auto text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    {mediaFiles.length} / {MAX_FILES} files selected
                  </p>
                </div>
              </label>
            </div>
            {errors.media && (
              <p className="text-sm text-red-500 mt-2">{errors.media}</p>
            )}

            {/* Media Previews */}
            {mediaPreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {mediaPreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeMediaFile(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      aria-label="Remove media"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-amber-400 text-black font-semibold py-3 rounded-lg hover:bg-amber-500 transition-colors"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
