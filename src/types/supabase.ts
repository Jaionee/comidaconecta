export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          role: 'commerce' | 'ngo' | 'admin'
          name: string
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role: 'commerce' | 'ngo' | 'admin'
          name: string
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'commerce' | 'ngo' | 'admin'
          name?: string
          phone?: string | null
          updated_at?: string
        }
      }
      commerces: {
        Row: {
          id: string
          user_id: string
          business_name: string
          business_type: 'bakery' | 'restaurant' | 'grocery' | 'supermarket' | 'hotel' | 'catering' | 'other'
          address: string
          city: string
          contact_person: string
          phone: string
          email: string
          business_hours: string | null
          description: string | null
          logo_url: string | null
          status: 'pending' | 'active' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          business_name: string
          business_type: 'bakery' | 'restaurant' | 'grocery' | 'supermarket' | 'hotel' | 'catering' | 'other'
          address: string
          city: string
          contact_person: string
          phone: string
          email: string
          business_hours?: string | null
          description?: string | null
          logo_url?: string | null
          status?: 'pending' | 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
        Update: {
          business_name?: string
          business_type?: 'bakery' | 'restaurant' | 'grocery' | 'supermarket' | 'hotel' | 'catering' | 'other'
          address?: string
          city?: string
          contact_person?: string
          phone?: string
          email?: string
          business_hours?: string | null
          description?: string | null
          logo_url?: string | null
          status?: 'pending' | 'active' | 'inactive'
          updated_at?: string
        }
      }
      ngos: {
        Row: {
          id: string
          user_id: string
          organization_name: string
          organization_type: 'ngo' | 'soup-kitchen' | 'association' | 'food-bank' | 'social-resource' | 'other'
          address: string
          city: string
          contact_person: string
          phone: string
          email: string
          accepted_food_types: string[]
          pickup_hours: string | null
          description: string | null
          logo_url: string | null
          status: 'pending' | 'active' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          organization_name: string
          organization_type: 'ngo' | 'soup-kitchen' | 'association' | 'food-bank' | 'social-resource' | 'other'
          address: string
          city: string
          contact_person: string
          phone: string
          email: string
          accepted_food_types?: string[]
          pickup_hours?: string | null
          description?: string | null
          logo_url?: string | null
          status?: 'pending' | 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
        Update: {
          organization_name?: string
          organization_type?: 'ngo' | 'soup-kitchen' | 'association' | 'food-bank' | 'social-resource' | 'other'
          address?: string
          city?: string
          contact_person?: string
          phone?: string
          email?: string
          accepted_food_types?: string[]
          pickup_hours?: string | null
          description?: string | null
          logo_url?: string | null
          status?: 'pending' | 'active' | 'inactive'
          updated_at?: string
        }
      }
      donations: {
        Row: {
          id: string
          commerce_id: string
          title: string
          description: string
          food_type: 'bakery' | 'fruits-vegetables' | 'prepared-food' | 'packaged' | 'menu' | 'other'
          quantity_text: string
          estimated_servings: number
          image_url: string | null
          pickup_address: string
          pickup_deadline: string
          status: 'available' | 'reserved' | 'collected' | 'cancelled' | 'expired'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          commerce_id: string
          title: string
          description: string
          food_type: 'bakery' | 'fruits-vegetables' | 'prepared-food' | 'packaged' | 'menu' | 'other'
          quantity_text: string
          estimated_servings: number
          image_url?: string | null
          pickup_address: string
          pickup_deadline: string
          status?: 'available' | 'reserved' | 'collected' | 'cancelled' | 'expired'
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string
          food_type?: 'bakery' | 'fruits-vegetables' | 'prepared-food' | 'packaged' | 'menu' | 'other'
          quantity_text?: string
          estimated_servings?: number
          image_url?: string | null
          pickup_address?: string
          pickup_deadline?: string
          status?: 'available' | 'reserved' | 'collected' | 'cancelled' | 'expired'
          updated_at?: string
        }
      }
      reservations: {
        Row: {
          id: string
          donation_id: string
          ngo_id: string
          status: 'reserved' | 'collected' | 'cancelled'
          reserved_at: string
          collected_at: string | null
          commerce_confirmed_at: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          donation_id: string
          ngo_id: string
          status?: 'reserved' | 'collected' | 'cancelled'
          reserved_at?: string
          collected_at?: string | null
          commerce_confirmed_at?: string | null
          notes?: string | null
        }
        Update: {
          status?: 'reserved' | 'collected' | 'cancelled'
          collected_at?: string | null
          commerce_confirmed_at?: string | null
          notes?: string | null
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
