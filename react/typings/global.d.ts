import type { ComponentType } from 'react'

declare global {

  /* =========================
   JSON Schema Types
  ========================= */

  type JSONSchemaProperty = {
    type?: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'null' | 'integer'
    title?: string
    description?: string
    properties?: Record<string, JSONSchemaProperty>
    items?: JSONSchemaProperty
    enum?: unknown[]
    default?: unknown
    minimum?: number
    maximum?: number
    multipleOf?: number
    format?: string
    readOnly?: boolean
  }

  type JSONSchemaDependencyCondition = {
    properties: Record<string, JSONSchemaProperty>
  }

  type JSONSchemaDependency = {
    oneOf?: JSONSchemaDependencyCondition[]
  }

  type JSONSchema = {
    properties?: Record<string, JSONSchemaProperty>
    dependencies?: Record<string, JSONSchemaDependency>
  }

  /* =========================
   Component Props
  ========================= */

  interface SchemaUiProps {
    titleItem: string
    activeItem: boolean
    [key: string]: unknown
  }

  /* =========================
   RJSF Core Types
  ========================= */

  type OnChange = (val: unknown) => void

  type SchemaFieldProps = {
    name: string
    schema: unknown
    uiSchema?: unknown
    formData?: unknown
    registry: Registry
    onChange?: (value: unknown) => void
  }

  interface Registry {
    fields: {
      SchemaField: ComponentType<SchemaFieldProps>
    }
  }

  /* =========================
   External API Types
  ========================= */

  type Category = {
    id: number
    name: string
    hasChildren: boolean
    children?: Category[]
  }

  /* =========================
   Widget Props
  ========================= */

  type WidgetProps<T = unknown> = {
    schema: {
      title?: string
      description?: string
      enum?: string[]
      items?: {
        enum?: string[]
      }
    }
    value: T
    onChange: OnChange
    registry: Registry
  }
}
