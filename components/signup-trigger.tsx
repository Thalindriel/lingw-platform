"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CourseSignupForm } from "@/components/course-signup-form"

export function SignupTrigger({ course }: { course: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)} className="bg-primary hover:bg-primary/90">
  Записаться
</Button>
      <CourseSignupForm open={open} onClose={() => setOpen(false)} courseTitle={course} />
    </>
  )
}
