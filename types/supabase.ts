export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          email: string
          first_name: string | null
          last_name: string | null
          ai_requests_count: number
          subscription_tier: string
          storage_used: number
          video_analysis_count: number
          last_login: string | null
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          first_name?: string | null
          last_name?: string | null
          ai_requests_count?: number
          subscription_tier?: string
          storage_used?: number
          video_analysis_count?: number
          last_login?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          ai_requests_count?: number
          subscription_tier?: string
          storage_used?: number
          video_analysis_count?: number
          last_login?: string | null
        }
      }
    }
  }
} 