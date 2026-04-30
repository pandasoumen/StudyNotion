import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true)
      const result = await fetchInstructorCourses(token)
      setCourses(Array.isArray(result) ? result : [])
      setLoading(false)
    }

    loadCourses()
  }, [token])

  return (
    <div className="text-richblack-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">My Courses</h1>
          <p className="mt-2 text-richblack-300">
            Review the courses you have already created.
          </p>
        </div>
        <Link
          to="/dashboard/add-course"
          className="w-fit rounded-lg bg-yellow-50 px-4 py-2 font-medium text-richblack-900"
        >
          Add Course
        </Link>
      </div>

      <div className="mt-8 rounded-xl border border-richblack-700 bg-richblack-800">
        <div className="grid grid-cols-[2fr_120px_120px] gap-4 border-b border-richblack-700 px-6 py-4 text-sm uppercase tracking-wide text-richblack-300">
          <p>Course</p>
          <p>Price</p>
          <p>Students</p>
        </div>

        {loading ? (
          <p className="px-6 py-8 text-richblack-300">Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="px-6 py-8 text-richblack-300">
            You have not created any courses yet.
          </p>
        ) : (
          courses.map((course) => (
            <div
              key={course._id}
              className="grid grid-cols-[2fr_120px_120px] gap-4 border-b border-richblack-700 px-6 py-4 last:border-b-0"
            >
              <div>
                <p className="font-medium text-richblack-5">{course.courseName}</p>
                <p className="mt-1 text-sm text-richblack-300 line-clamp-2">
                  {course.courseDescription}
                </p>
              </div>
              <p className="text-sm text-richblack-100">Rs. {course?.price || 0}</p>
              <p className="text-sm text-richblack-100">
                {course?.studentsEnroled?.length || 0}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
