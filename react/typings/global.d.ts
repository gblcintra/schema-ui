import { ReactNode } from "react";
declare global {

  type OnChange = (val: any) => void

  type RegisteredComponent<P = any> = ComponentType<P> & {
    SchemaField?: {
      defaultProps?: {
        autoFocus?: boolean
        disabled?: boolean
        registry?: Registry
        readonly?: boolean
        uiSchema?: {
          'ui:widget'?: string
        }
        formData?: string
        name?: string
        onChange?: OnChange
      }
    }
  }
  interface Registry {
    [key: string]: RegisteredComponent
  }

}
