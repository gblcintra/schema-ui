import React from 'react';
import { SchemaPropsDefault, SchemaUiItemProps } from './schema';

const SchemaUi = ({ titleItem, activeItem, ...props }: SchemaUiProps) => {
  if (!activeItem) return null

  const schema = SchemaUi.schema as JSONSchema
  const schemaProperties = schema.properties ?? {}
  const dependencies = schema.dependencies ?? {}

  let dynamicProperties: Record<string, JSONSchemaProperty> = {
    ...schemaProperties,
  }

  Object.entries(dependencies).forEach(
    ([dependentField, dependencyCondition]) => {
      const dependencyMet = dependencyCondition.oneOf?.some(condition => {
        const enumValues =
          condition.properties[dependentField]?.enum ?? []

        return enumValues.includes(props[dependentField])
      })

      if (dependencyMet) {
        const matchedCondition = dependencyCondition.oneOf?.find(
          condition =>
            condition.properties[dependentField]?.enum?.includes(
              props[dependentField]
            )
        )

        if (matchedCondition?.properties) {
          dynamicProperties = {
            ...dynamicProperties,
            ...matchedCondition.properties,
          }
        }
      }
    }
  )

  const renderField = (
    key: string,
    schemaField: JSONSchemaProperty,
    value: unknown
  ): React.ReactNode => {
    if (!schemaField?.type) return null

    if (schemaField.type === 'object' && typeof value === 'object' && value !== null) {
      return (
        <div key={key} className="mb2 pa4 bg-white ba b--light-gray br2 overflow-auto">
          <strong>{schemaField.title || key}:</strong>
          <div className="pl3">
            {Object.entries(value as Record<string, unknown>).map(
              ([subKey, subValue]) =>
                renderField(
                  subKey,
                  schemaField.properties?.[subKey] as JSONSchemaProperty,
                  subValue
                )
            )}
          </div>
        </div>
      )
    }

    if (schemaField.type === 'array' && Array.isArray(value)) {
      return (
        <div key={key} className="mb2 pa2 bg-white ba b--light-gray br2 overflow-auto">
          <strong>{schemaField.title || key}:</strong>
          {value.map((item, index) => (
            <div key={`${key}-${index}`} className="pl3">
              {renderField(
                `${key}-${index}`,
                schemaField.items as JSONSchemaProperty,
                item
              )}
            </div>
          ))}
        </div>
      )
    }

    return (
      <p
        key={key}
        className="mb2 pa2 bg-white ba b--light-gray br2 overflow-auto"
        data-type={schemaField.type}
      >
        <strong>{schemaField.title || key}:</strong> {String(value)}
      </p>
    )
  }

  return (
    <div className="ma7 pa4 bg-light-gray br3 shadow-1 mw6 center">
      <h3 className="f4 fw6 near-black mb3">{titleItem}</h3>
      <div className="flex flex-column gap2 overflow-auto">
        {Object.entries(dynamicProperties).map(([key, schemaField]) => {
          const value = props[key]
          if (value !== undefined) {
            return renderField(key, schemaField, value)
          }
          return null
        })}
      </div>
    </div>
  )
}

/* =========================
   SCHEMA Props
========================= */
SchemaUi.defaultProps = SchemaPropsDefault
SchemaUi.schema = SchemaUiItemProps;

export default SchemaUi;
