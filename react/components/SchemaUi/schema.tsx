import React from "react";

const SchemaPropsDefault = {
  titleItem: 'Configuração do Schema',
  activeItem: true,
  textProps: {
    titleItem: 'Texto Exemplo Carol',
    passwordItem: 'senha123',
    descriptionItem: 'Uma breve descrição.',
  },
  dataProps: {
    dataTimeItem: '2025-01-01T00:00:00',
    dataItem: '2025-01-01',
  },
  selectProps: {
    selectItem: '#000',
    colorItem: '#ff0000',
    radioItem: 'Opção 1',
    reference: 'option #0',
  },
  restrictProps: {
    secret: 'supersecreta',
    disabledItem: 'desabilitado',
    readonlyItem: 'somenteLeitura',
    readonlyItem2: 'somenteLeitura2',
  },
  arrayItem: [
    { __editorItemTitle: 'Item 1', title: 'Item 1' },
    { __editorItemTitle: 'Item 2', title: 'Item 2' },
  ],
  showMoreConfig: true
};

const SchemaUiItemProps = {
  title: 'Configuração do schema',
  type: 'object',
  widget: {
    classNames: 'bg-near-white ba b--light-gray ph3 mb3',
  },
  required: ['passwordItem'],
  definitions: {
    largeEnum: {
      enum: [
        "option #0",
        "option #1",
        "option #2",
        "option #3",
        "option #4",
        "option #5",
      ]
    },
  },
  properties: {
    classeItem: {
      type: 'string',
      title: 'Teste de Classe',
      widget: {
        classNames: 'bg-white-30 ba b--light-gray ph3 mb3',
      },
    },
    showMoreConfig: {
      title: 'Mostrar mais Configurações com dependencies',
      type: 'boolean',
      enum: [true, false],
      widget: {
        classNames: 'bg-black-30 ba b--light-gray ph3 mb3',
      },
    },
  },
  dependencies: {
    showMoreConfig: {
      oneOf: [
        {
          properties: {
            showMoreConfig: {
              enum: [true],
              title: 'Mostrar mais Configurações',
              type: 'boolean',
              widget: {
                classNames: 'bg-danger--faded ba b--light-gray ph3 mb3',
              }
            },
            numberItem: {
              title: 'Campo de Numero',
              type: 'number',
              default: 8,
              description: 'Esse campo é apenas para números'
            },
            numberIntegerItem: {
              title: 'Campo de Numero Inteiro Com Range',
              type: 'integer',
              default: 10,
              minimum: 10,
              maximum: 100,
              multipleOf: 10,
              widget: {
                "ui:widget": "range",
              }
            },
          },
        },
        {
          properties: {
            showMoreConfig: {
              enum: [false],
              title: 'Mostrar mais Configurações',
              type: 'boolean',
              widget: {
                classNames: 'bg-danger--faded ba b--light-gray ph3 mb3',
              },
              alert: {
                title: "Aviso",
                type: "string",
                description: "Para ativar mais configurações, ative o campo acima.",
                widget: {
                  'ui:field': ({ schema }: { schema: any }) => {
                    return <h4 className="ma0 f5 near-black"><strong className="yellow">Atenção: </strong>{schema?.description}</h4>;
                  },
                },
              },
            },
          }
        }
      ],
    },
  },
  default: SchemaPropsDefault
};


export { SchemaUiItemProps, SchemaPropsDefault }
