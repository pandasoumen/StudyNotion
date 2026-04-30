import React, { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { useSelector } from "react-redux"

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth)
  const [enrolledCourses, setEnrolledCourses] = useState(null)

  useEffect(() => {
    const loadEnrolledCourses = async () => {
      try {
        const response = await getUserEnrolledCourses(token)
        setEnrolledCourses(response)
      } catch (error) {
        console.log("Unable to Fetch Enrolled Courses")
      }
    }

    loadEnrolledCourses()
  }, [token])

  return (
    <div className="text-white">
      <div>Enrolled Courses</div>
      {!enrolledCourses ? (
        <div>Loading...</div>
      ) : !enrolledCourses.length ? (
        <p>You have not enrolled in any course yet</p>
      ) : (
        <div>
          <div>
            <p>Course Name</p>
            <p>Durations</p>
            <p>Progress</p>
          </div>
          {enrolledCourses.map((course) => (
            <div key={course._id}>
              <div>
                <img src={course.thumbnail} alt={course.courseName} />
                <div>
                  <p>{course.courseName}</p>
                  <p>{course.courseDescription}</p>
                </div>
              </div>

              <div>{course?.totalDuration}</div>

              <div>
                <p>Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EnrolledCourses
