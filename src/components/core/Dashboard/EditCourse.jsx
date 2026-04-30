import { useParams } from "react-router-dom"

import AddCourse from "./AddCourse"

export default function EditCourse() {
  const { courseId } = useParams()

  return (
    <div className="space-y-4 text-richblack-5">
      <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-4">
        <h1 className="text-2xl font-semibold">Edit Course</h1>
        <p className="mt-2 text-sm text-richblack-300">
          Editing support for course <span className="font-medium">{courseId}</span>
          {" "}uses the existing course form below.
        </p>
      </div>

      <AddCourse />
    </div>
  )
}
