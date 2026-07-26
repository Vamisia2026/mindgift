export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      age_mapping: {
        Row: {
          group_key: string
          max_age: number
          min_age: number
        }
        Insert: {
          group_key: string
          max_age: number
          min_age: number
        }
        Update: {
          group_key?: string
          max_age?: number
          min_age?: number
        }
        Relationships: []
      }
      bond_modifiers: {
        Row: {
          modifier: number
          modifier_key: string
        }
        Insert: {
          modifier: number
          modifier_key: string
        }
        Update: {
          modifier?: number
          modifier_key?: string
        }
        Relationships: []
      }
      budget_bases: {
        Row: {
          max_budget: number
          min_budget: number
          relationship_key: string
        }
        Insert: {
          max_budget: number
          min_budget: number
          relationship_key: string
        }
        Update: {
          max_budget?: number
          min_budget?: number
          relationship_key?: string
        }
        Relationships: []
      }
      levels: {
        Row: {
          id: string
          macro_area_id: string
          question: string
          sort_order: number
        }
        Insert: {
          id: string
          macro_area_id: string
          question: string
          sort_order: number
        }
        Update: {
          id?: string
          macro_area_id?: string
          question?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "levels_macro_area_id_fkey"
            columns: ["macro_area_id"]
            isOneToOne: false
            referencedRelation: "macro_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      macro_area_eligible_age_groups: {
        Row: {
          age_group: string
          macro_area_id: string
        }
        Insert: {
          age_group: string
          macro_area_id: string
        }
        Update: {
          age_group?: string
          macro_area_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "macro_area_eligible_age_groups_age_group_fkey"
            columns: ["age_group"]
            isOneToOne: false
            referencedRelation: "age_mapping"
            referencedColumns: ["group_key"]
          },
          {
            foreignKeyName: "macro_area_eligible_age_groups_macro_area_id_fkey"
            columns: ["macro_area_id"]
            isOneToOne: false
            referencedRelation: "macro_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      macro_area_eligible_relationships: {
        Row: {
          macro_area_id: string
          relationship_key: string
        }
        Insert: {
          macro_area_id: string
          relationship_key: string
        }
        Update: {
          macro_area_id?: string
          relationship_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "macro_area_eligible_relationships_macro_area_id_fkey"
            columns: ["macro_area_id"]
            isOneToOne: false
            referencedRelation: "macro_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "macro_area_eligible_relationships_relationship_key_fkey"
            columns: ["relationship_key"]
            isOneToOne: false
            referencedRelation: "budget_bases"
            referencedColumns: ["relationship_key"]
          },
        ]
      }
      macro_areas: {
        Row: {
          id: string
          sort_order: number
          title: string
        }
        Insert: {
          id: string
          sort_order: number
          title: string
        }
        Update: {
          id?: string
          sort_order?: number
          title?: string
        }
        Relationships: []
      }
      occasion_multipliers: {
        Row: {
          multiplier: number
          occasion_key: string
        }
        Insert: {
          multiplier: number
          occasion_key: string
        }
        Update: {
          multiplier?: number
          occasion_key?: string
        }
        Relationships: []
      }
      option_variants: {
        Row: {
          id: string
          option_id: string
          sort_order: number
          variant_text: string
        }
        Insert: {
          id: string
          option_id: string
          sort_order: number
          variant_text: string
        }
        Update: {
          id?: string
          option_id?: string
          sort_order?: number
          variant_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "option_variants_option_id_fkey"
            columns: ["option_id"]
            isOneToOne: false
            referencedRelation: "options"
            referencedColumns: ["id"]
          },
        ]
      }
      options: {
        Row: {
          id: string
          label: string
          level_id: string
          sort_order: number
          tag: string
        }
        Insert: {
          id: string
          label: string
          level_id: string
          sort_order: number
          tag: string
        }
        Update: {
          id?: string
          label?: string
          level_id?: string
          sort_order?: number
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "options_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          category: string
          created_at: string
          id: string
          text: string
          weight: number
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          text: string
          weight?: number
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          text?: string
          weight?: number
        }
        Relationships: []
      }
      results: {
        Row: {
          category: string
          created_at: string
          id: string
          link: string | null
          recommendation: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          link?: string | null
          recommendation: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          link?: string | null
          recommendation?: string
        }
        Relationships: []
      }
      screening_options: {
        Row: {
          base_tier: string | null
          id: string
          label: string
          modifier_key: string | null
          multiplier_key: string | null
          question_id: string
          sort_order: number
          target: string | null
          value: string
        }
        Insert: {
          base_tier?: string | null
          id: string
          label: string
          modifier_key?: string | null
          multiplier_key?: string | null
          question_id: string
          sort_order: number
          target?: string | null
          value: string
        }
        Update: {
          base_tier?: string | null
          id?: string
          label?: string
          modifier_key?: string | null
          multiplier_key?: string | null
          question_id?: string
          sort_order?: number
          target?: string | null
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "screening_options_base_tier_fkey"
            columns: ["base_tier"]
            isOneToOne: false
            referencedRelation: "budget_bases"
            referencedColumns: ["relationship_key"]
          },
          {
            foreignKeyName: "screening_options_modifier_key_fkey"
            columns: ["modifier_key"]
            isOneToOne: false
            referencedRelation: "bond_modifiers"
            referencedColumns: ["modifier_key"]
          },
          {
            foreignKeyName: "screening_options_multiplier_key_fkey"
            columns: ["multiplier_key"]
            isOneToOne: false
            referencedRelation: "occasion_multipliers"
            referencedColumns: ["occasion_key"]
          },
          {
            foreignKeyName: "screening_options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "screening_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      screening_questions: {
        Row: {
          backend_field: string | null
          id: string
          input_type: string
          max_value: number | null
          min_value: number | null
          question: string
          sort_order: number
        }
        Insert: {
          backend_field?: string | null
          id: string
          input_type: string
          max_value?: number | null
          min_value?: number | null
          question: string
          sort_order: number
        }
        Update: {
          backend_field?: string | null
          id?: string
          input_type?: string
          max_value?: number | null
          min_value?: number | null
          question?: string
          sort_order?: number
        }
        Relationships: []
      }
      survey_results: {
        Row: {
          created_at: string
          id: string
          journey: Json
          product_link_uk: string | null
          product_link_us: string | null
          recommendation: Json
          screening: Json
          sheets_synced_at: string | null
          tags: Json
        }
        Insert: {
          created_at?: string
          id?: string
          journey?: Json
          product_link_uk?: string | null
          product_link_us?: string | null
          recommendation?: Json
          screening: Json
          sheets_synced_at?: string | null
          tags?: Json
        }
        Update: {
          created_at?: string
          id?: string
          journey?: Json
          product_link_uk?: string | null
          product_link_us?: string | null
          recommendation?: Json
          screening?: Json
          sheets_synced_at?: string | null
          tags?: Json
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
