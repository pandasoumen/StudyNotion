import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
import "../../App.css"
import { FaStar } from "react-icons/fa"

import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 15

  useEffect(() => {
    ;(async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      )
      if (data?.success) {
        setReviews(data?.data)
      }
    })()
  }, [])

  // console.log(reviews)

  return (
    <div className="text-white">
      <div className="my-[50px] flex gap-6 overflow-x-auto pb-4">
        {reviews.map((review, i) => {
          return (
            <div
              key={i}
              className="min-h-[184px] min-w-[280px] flex-1 rounded-lg bg-richblack-800 p-4 text-[14px] text-richblack-25 md:min-w-[320px]"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    review?.user?.image
                      ? review?.user?.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                  }
                  alt=""
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                  <h2 className="text-[12px] font-medium text-richblack-500">
                    {review?.course?.courseName}
                  </h2>
                </div>
              </div>
              <p className="mt-4 font-medium text-richblack-25">
                {review?.review.split(" ").length > truncateWords
                  ? `${review?.review
                      .split(" ")
                      .slice(0, truncateWords)
                      .join(" ")} ...`
                  : `${review?.review}`}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <h3 className="font-semibold text-yellow-100">
                  {review.rating.toFixed(1)}
                </h3>
                <ReactStars
                  count={5}
                  value={review.rating}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ReviewSlider
