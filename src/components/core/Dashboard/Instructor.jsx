import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { getInstructorData } from "../../../services/operations/profileAPI"

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-5">
      <p className="text-sm text-richblack-300">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-richblack-5">{value}</p>
    </div>
  )
}

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadInstructorData = async () => {
      setLoading(true)
      const result = await getInstructorData(token)
      setCourses(Array.isArray(result) ? result : [])
      setLoading(false)
    }

    loadInstructorData()
  }, [token])

  const totalCourses = courses.length
  const totalStudents = courses.reduce(
    (sum, course) => sum + (course?.studentsEnroled?.length || 0),
    0
  )
  const totalRevenue = courses.reduce(
    (sum, course) =>
      sum + (course?.price || 0) * (course?.studentsEnroled?.length || 0),
    0
  )

  return (
    <div className="text-richblack-5">
      <h1 className="text-3xl font-semibold">Instructor Dashboard</h1>
      <p className="mt-2 text-richblack-300">
        Welcome back{user?.firstName ? `, ${user.firstName}` : ""}.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <StatCard label="Total Courses" value={totalCourses} />
        <StatCard label="Total Students" value={totalStudents} />
        <StatCard label="Estimated Revenue" value={`Rs. ${totalRevenue}`} />
      </div>

      <div className="mt-8 rounded-xl border border-richblack-700 bg-richblack-800 p-6">
        <h2 className="text-xl font-semibold">Course Snapshot</h2>
        {loading ? (
          <p className="mt-4 text-richblack-300">Loading your dashboard...</p>
        ) : courses.length === 0 ? (
          <p className="mt-4 text-richblack-300">
            No instructor courses found yet.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {courses.slice(0, 5).map((course) => (
              <div
                key={course._id}
                className="flex flex-col justify-between gap-2 rounded-lg border border-richblack-700 bg-richblack-900 p-4 md:flex-row md:items-center"
              >
                <div>
                  <p className="font-medium text-richblack-5">
                    {course.courseName}
                  </p>
                  <p className="text-sm text-richblack-300">
                    {course?.studentsEnroled?.length || 0} students enrolled
                  </p>
                </div>
                <p className="text-sm text-yellow-50">Rs. {course?.price || 0}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
