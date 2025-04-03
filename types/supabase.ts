export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string
          language_level: string
          streak_days: number
          study_hours: number
          words_learned: number
          phone: string | null
          role: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          language_level?: string
          streak_days?: number
          study_hours?: number
          words_learned?: number
          phone?: string | null
          role?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          language_level?: string
          streak_days?: number
          study_hours?: number
          words_learned?: number
          phone?: string | null
          role?: string | null
          created_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string
          price: number
          color: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          price: number
          color: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          price?: number
          color?: string
          created_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string
          duration: number
          order_index: number
          content: Json
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description: string
          duration: number
          order_index: number
          content: Json
          created_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          description?: string
          duration?: number
          order_index?: number
          content?: Json
          created_at?: string
        }
      }
      user_courses: {
        Row: {
          id: string
          user_id: string
          course_id: string
          progress: number
          lessons_completed: number
          total_lessons: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          progress: number
          lessons_completed: number
          total_lessons: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          progress?: number
          lessons_completed?: number
          total_lessons?: number
          created_at?: string
        }
      }
      schedules: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          course_id: string
          teacher_name: string
          zoom_link: string
          date: string
          time: string
          is_deadline: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          course_id: string
          teacher_name: string
          zoom_link: string
          date: string
          time: string
          is_deadline: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          course_id?: string
          teacher_name?: string
          zoom_link?: string
          date?: string
          time?: string
          is_deadline?: boolean
          created_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          course_id: string
          completed: boolean
          score: number
          time_spent: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          course_id: string
          completed: boolean
          score: number
          time_spent: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          course_id?: string
          completed?: boolean
          score?: number
          time_spent?: number
          created_at?: string
        }
      }
    }
  }
}

