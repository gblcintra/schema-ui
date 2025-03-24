import React from 'react';
import { SchemaPropsDefault, SchemaUiItemProps } from './schema';
export interface SchemaUiProps {
  titleItem: string;
  activeItem: boolean;
  [key: string]: any;
}

const SchemaUi = ({ titleItem, activeItem, ...props }: SchemaUiProps) => {
  if (!activeItem) return null;
  const schema = SchemaUi.schema;
  const schemaProperties = schema.properties || {};
  const dependencies = schema.dependencies || {};

  let dynamicProperties = { ...schemaProperties };

  Object.entries(dependencies).forEach(([dependentField, dependencyCondition]: any) => {
    const dependencyMet = dependencyCondition.oneOf?.some((condition: any) => {
      return (
        condition.properties[dependentField]?.enum?.includes(props[dependentField])
      );
    });

    if (dependencyMet) {
      const additionalProperties = dependencyCondition.oneOf.find(
        (condition: any) =>
          condition.properties[dependentField]?.enum?.includes(props[dependentField])
      )?.properties;

      if (additionalProperties) {
        dynamicProperties = { ...dynamicProperties, ...additionalProperties };
      }
    }
  });

  const renderField = (key: string, schemaField: any, value: any) => {
    if (!schemaField || !schemaField.type) {
      return null;
    }

    if (schemaField.type === 'object') {
      return (
        <div key={key} className="mb2 pa4 bg-white ba b--light-gray br2 overflow-auto">
          <strong>{schemaField.title || key}:</strong>
          <div className="pl3">
            {Object.entries(value).map(([subKey, subValue]) =>
              renderField(subKey, schemaField.properties![subKey], subValue)
            )}
          </div>
        </div>
      );
    } else if (Array.isArray(value)) {
      return (
        <div key={key} className="mb2 pa2 bg-white ba b--light-gray br2 overflow-auto">
          <strong>{schemaField.title || key}:</strong>
          {value.map((item, index) => (
            <div key={`${key}-${index}`} className="pl3">
              {renderField(`${key}-${index}`, schemaField.items!, item)}
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <p key={key} className="mb2 pa2 bg-white ba b--light-gray br2 overflow-auto" data-type={schemaField.type}>
          <strong>{schemaField.title || key}:</strong> {String(value)}
        </p>
      );
    }
  };

  return (
    <div className="ma7 pa4 bg-light-gray br3 shadow-1 mw6 center">
      <h3 className="f4 fw6 near-black mb3">{titleItem}</h3>
      <div className="flex flex-column gap2 overflow-auto">
        {Object.entries(dynamicProperties).map(([key, schemaField]: [string, any]) => {
          const value = props[key];
          if (value !== undefined) {
            return renderField(key, schemaField, value);
          }
          return null;
        })}
      </div>
    </div>
  );
};
SchemaUi.defaultProps = SchemaPropsDefault
SchemaUi.schema = SchemaUiItemProps;

export default SchemaUi;
