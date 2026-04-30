import React from "react"

// import { getAllCourses } from "../../services/operations/courseDetailsAPI"
import CourseCard from "./Course_Card"

function CourseSlider({ Courses }) {
  return (
    <>
      {Courses?.length ? (
        <div className="flex gap-6 overflow-x-auto pb-4">
          {Courses?.map((course, i) => (
            <div key={i} className="min-w-[280px] flex-1 md:min-w-[340px]">
              <CourseCard course={course} Height={"h-[250px]"} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider
