import React, { ReactNode } from 'react';
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

  const isImageUrl = (value: unknown): value is string => {
    if (typeof value !== 'string') return false

    return /^https?:\/\/.+\.(png|jpg|jpeg|gif|webp|svg)(\?.*)?$/i.test(value)
  }

  const renderField = (
    key: string,
    schemaField: JSONSchemaProperty,
    value: unknown
  ): ReactNode => {
    if (!schemaField?.type) return null

    const isObject =
      schemaField.type === 'object' &&
      typeof value === 'object' &&
      value !== null

    const isArray = schemaField.type === 'array' && Array.isArray(value)

    const containerClasses = 'mb3 pa3 bg-white br3 shadow-1 ba b--black-10'

    const labelString = schemaField.title || key
    if (isObject) {
      return (
        <div key={key} className={containerClasses}>
          <strong className="fw6 f6 mb2 dark-gray">{labelString}:</strong>
          <div className="pl3 bl b--light-gray">
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

    if (isArray) {
      const arrayValue = value as unknown[]
      return (
        <div key={key} className={`${containerClasses}`}>
          <strong className="fw6 f6 mb2 dark-gray">{labelString}:</strong>
          <div className="flex flex-column gap2">

            {arrayValue.map((item, index) => (
              <div key={`${key}-${index}`} className="pa2 bg-near-white br2">
                {renderField(
                  `${key}-${index}`,
                  schemaField.items as JSONSchemaProperty,
                  item
                )}
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (typeof value === 'string' && isImageUrl(value)) {
      return (
        <div key={key} className={`${containerClasses} flex justify-between items-center`} data-type={schemaField.type}>
          <div className="fw6 f6 mb2 dark-gray">
            {labelString}
          </div>

          <div className="flex flex-column items-center gap2">
            <img
              src={value}
              alt={labelString}
              className="br3 shadow-2 mb2"
              style={{
                maxWidth: '100px',
                height: 'auto',
                objectFit: 'cover',
              }}

            />

            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="f7 blue link dim"
            >
              Abrir imagem em nova aba
            </a>
          </div>
        </div>
      )
    }

    return (
      <p
        key={key}
        className={`${containerClasses} flex justify-between items-center`}
        data-type={schemaField.type}
      >
        <strong className="near-black truncate" title={String(labelString)}>{String(labelString)}:</strong> {String(value)}
      </p>
    )
  }

  return (
    <div className="ma6 pa5 bg-near-white br4 shadow-3 mw7 center">
      <h3 className="f3 fw6 near-black mb4">
        {titleItem}
      </h3>

      <div className="flex flex-column">
        {Object.entries(dynamicProperties).map(([key, schemaField]) => {
          const value = props[key]

          if (value !== undefined && value !== null) {
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
