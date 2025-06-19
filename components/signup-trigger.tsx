"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CourseSignupForm } from "@/components/course-signup-form"

interface SignupTriggerProps {
  course: string
  slug?: string
  darkMode?: boolean
  prefillName?: string
  prefillEmail?: string
  prefillPhone?: string
}

export function SignupTrigger({
  course,
  slug = "trial",
  darkMode = false,
  prefillName,
  prefillEmail,
  prefillPhone,
}: SignupTriggerProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} className="bg-primary hover:bg-primary/90 text-white">
        Записаться
      </Button>
      <CourseSignupForm
        open={open}
        onClose={() => setOpen(false)}
        courseTitle={course}
        courseSlug={slug}
        darkMode={darkMode}
        prefillName={prefillName}
        prefillEmail={prefillEmail}
        prefillPhone={prefillPhone}
      />
    </>
  )
}
