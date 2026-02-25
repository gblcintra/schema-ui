import React from "react";

const SchemaPropsDefault = {
  titleItem: 'Configuração do Schema',
  activeItem: true,
  textProps: {
    titleItem: 'Texto Exemplo',
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
  showMoreConfig: true,
  numberItem: 8,
  numberIntegerItem: 10,
  widgetCustomText: 'Texto do Widget Customizado',
  widgetCustomSelect: 'Carregando...', // valor inicial enquanto as opções são carregadas
  widgetCustomRange: 50,
  widgetCustomRating: 3,
  widgetCustomColorPicker: '#00ff00',
  widgetCustomTextArea: 'Texto do TextArea Customizado',
  widgetCustomCheckbox: true,
  widgetCustomRadio: 'Opção A',
  widgetCustomMultiSelect: ['Opção 1', 'Opção 3'],
};

let cachedNames: string[] | null = null
let isFetching: boolean = false

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
    fieldNull: {
      title: "Texto com type Null",
      type: "null",
      description: "Campos nulos como este são ótimos para adicionar informações extras",
      widget: {
        'ui:field': ({ schema }: { schema: any }) => {
          return <h4 className="ma0 f5 near-black">{schema?.description}</h4>;
        },
      },
    },
    activeItem: {
      title: 'Ativar Item',
      type: 'boolean',
      default: true,
    },
    textProps: {
      title: 'Text Props',
      type: 'object',
      widget: {
        classNames: 'bg-black-20 ba b--light-gray ph3 mb3',
      },
      properties: {
        __blockItemTitle: {
          type: 'null',
          title: 'Configuração do schema Relacionados a string',
          description: 'https://github.com/rjsf-team/react-jsonschema-form',
          widget: {
            'ui:field': ({ schema }: { schema: any }) => {
              return <h4 className="ma0 f5 near-black">{schema?.title}</h4>;
            },
          },
        },
        titleItem: {
          type: 'string',
          title: 'Título PlaceHolder',
          description: 'Insira o texto que será exibido no botão.',
          minLength: 10,
          widget: {
            'ui:widget': 'text',
            'ui:placeholder': 'Ex.: Teste',
          },
        },
        passwordItem: {
          type: 'string',
          title: 'Senha',
          widget: {
            'ui:inputType': 'password',
            "ui:help": "Dica: Faça com que seja forte!"
          },
        },
        descriptionItem: {
          type: "string",
          title: "Bio",
          widget: {
            "ui:widget": "textarea",
            "ui:options": {
              "rows": 5,
              "maxLength": 10,
            }
          }
        },
      }
    },
    dataProps: {
      title: 'Data Props',
      type: 'object',
      widget: {
        classNames: 'bg-light-blue ba b--light-gray ph3 mb3',
      },
      properties: {
        __blockItemTitle: {
          type: 'null',
          title: 'Configuração do schema Relacionados a data',
          description: 'https://github.com/rjsf-team/react-jsonschema-form',
          widget: {
            'ui:field': ({ schema }: { schema: any }) => {
              return <h4 className="ma0 f5 near-black">{schema?.title}</h4>;
            },
          },
        },
        dataTimeItem: {
          type: 'string',
          title: 'Data Time',
          format: 'date-time',
          widget: {
            'ui:widget': 'datetime',
          },
        },
        dataItem: {
          type: 'string',
          title: 'Data',
          format: 'date',
          widget: {
            'ui:widget': 'date',
          },
        },
        altDatetime: {
          type: "string",
          format: "date-time",
          widget: {
            "ui:widget": "alt-datetime",
            "ui:options": {
              "yearsRange": [
                2023,
                2030
              ],
              "format": "MDY"
            },
          },
        },
        altDate: {
          type: "string",
          format: "date",
          widget: {
            "ui:widget": "alt-date",
            "ui:options": {
              "yearsRange": [
                2023,
                2030
              ],
              "format": "MDY"
            },
          },
        },
      }
    },
    selectProps: {
      title: 'Select Props',
      type: 'object',
      widget: {
        classNames: 'bg-silver ba b--light-gray ph3 mb3',
      },
      properties: {
        __blockItemTitle: {
          type: 'null',
          title: 'Configuração do schema Relacionados a seleções e referencias',
          description: 'https://github.com/rjsf-team/react-jsonschema-form',
          widget: {
            'ui:field': ({ schema }: { schema: any }) => {
              return <h4 className="ma0 f5 near-black">{schema?.title}</h4>;
            },
          },
        },
        selectItem: {
          title: 'Seleção de Cor',
          type: 'string',
          default: '#000',
          enumNames: ['Preto', 'Branco'],
          enum: ['#000', '#fff'],
          description: 'Por default a cor vem "Preto"',
          widget: {
            'ui:widget': 'select'
          }
        },
        colorItem: {
          title: 'Cor do titulo',
          type: 'string',
          widget: {
            'ui:widget': 'color',
          },
          default: '#666',
          description: 'Selecione a cor do texto principal do bloco',
        },
        radioItem: {
          title: 'Escolha uma opção radio',
          type: 'string',
          enum: ['Opção 1', 'Opção 2', 'Opção 3'],
          widget: {
            'ui:widget': 'radio'
          }
        },
        reference: {
          type: 'string',
          title: 'Seleção usando definitions como referencia',
          $ref: "#/definitions/largeEnum"
        },
      }
    },
    restrictProps: {
      title: 'Restrict Props',
      type: 'object',
      widget: {
        classNames: 'bg-washed-red ba b--light-gray ph3 mb3',
      },
      properties: {
        __blockItemTitle: {
          type: 'null',
          title: 'Configuração do schema Relacionados a campos restritos',
          description: 'https://github.com/rjsf-team/react-jsonschema-form',
          widget: {
            'ui:field': ({ schema }: { schema: any }) => {
              return <h4 className="ma0 f5 near-black">{schema?.title}</h4>;
            },
          },
        },
        secret: {
          type: "string",
          default: "Invisível string.",
          widget: {
            "ui:widget": "hidden"
          },
        },
        disabledItem: {
          type: 'string',
          title: 'Campo Desabilitado',
          widget: {
            'ui:disabled': true,
          },
          default: 'desabilitado',
        },
        readonlyItem: {
          type: 'string',
          title: 'Campo somente Leitura',
          widget: {
            'ui:readonly': true,
          },
          default: 'somenteLeitura',
        },
        readonlyItem2: {
          type: 'string',
          title: 'Campo somente Leitura 2',
          readOnly: true,
          default: 'somenteLeitura2',
        },
      }
    },
    arrayItem: {
      type: 'array',
      title: "Array de Itens",
      maxItems: 5, // máximo de itens que podem ser cadastrados em um array
      widget: {
        classNames: 'bg-washed-yellow ba b--light-gray ph3 mb3',
        'ui:options': {
          addable: true, // False impede de adicionar Itens
          removable: false, // false impede de apagar o item
        }
      },
      items: {
        type: 'object',
        title: "Item Array",
        widget: {
          classNames: 'bg-washed-yellow ba b--light-gray ph3 mb3'
        },
        properties: {
          __editorItemTitle: {
            title: 'Identificação do Item',
            default: 'Item',
            description: 'Max 15 caracteres',
            type: 'string',
          },
          title: {
            type: 'string',
            title: 'Titulo Teste',
            widget: {
              'ui:placeholder': 'Ex.: Teste',
            },
            description: '**Preenchimento Obrigatório**',
          },
        },
      },
    },
    uploadItem: {
      type: 'string',
      title: 'Upload de Imagem',
      widget: {
        'ui:widget': 'image-uploader',
        classNames: 'bg-white-30 ba b--light-gray ph3 mb3',
      },
    },
    uploadFile: {
      type: 'string',
      title: 'Envie um arquivo',
      widget: {
        'ui:widget': 'file'
      }
    },
    widgetCustomUploadImage: {
      type: 'string',
      title: 'Widget Upload Customizado',
      widget: {
        'ui:widget': ({
          schema,
          value,
          onChange,
          registry,
        }: { schema: any, value: any, onChange: OnChange, registry: Registry }) => {

          const SchemaField = registry.fields.SchemaField as RegisteredComponent

          return (
            <div className="custom-widget">
              <SchemaField
                name="imageChoice"
                schema={{
                  type: 'string',
                  title: schema.title,
                }}
                uiSchema={{
                  'ui:widget': 'image-uploader',
                }}
                formData={value || ''}
                registry={registry}
                onChange={(url: string) => onChange(url)}
              />
            </div>
          )
        }
      },
    },
    widgetCustomText: {
      type: 'string',
      title: 'Widget Texto Customizado',
      description: 'Esse é um exemplo de widget customizado para um campo de texto.',
      widget: {
        'ui:widget': ({
          schema,
          value,
          onChange,
          registry,
        }: { schema: any, value: any, onChange: OnChange, registry: Registry }) => {

          const SchemaField = registry.fields.SchemaField as RegisteredComponent

          return (
            <div className="custom-widget">
              <SchemaField
                name="textChoice"
                schema={{
                  type: 'string',
                  title: schema.title,
                }}
                uiSchema={{
                  'ui:widget': 'text',
                  'ui:placeholder': schema.description,
                }}
                formData={value || ''}
                registry={registry}
                onChange={(url: string) => onChange(url)}
              />
            </div>
          )
        }
      },
    },
    widgetCustomSelect: {
      type: 'string',
      title: 'Widget Select Customizado',
      widget: {
        'ui:widget': ({
          schema,
          value,
          onChange,
          registry
        }: { schema: any, value: any, onChange: OnChange, registry: Registry }) => {

          const SchemaField = registry.fields.SchemaField as RegisteredComponent

          if (!cachedNames && !isFetching) {
            isFetching = true

            fetch('/api/catalog_system/pub/category/tree/2')
              .then(res => res.json())
              .then((data: any[]) => {
                cachedNames = data.map(i => i.name).slice(0, 5)
                isFetching = false
                // força re-render do RJSF
                onChange(value)
              })
              .catch((err) => {
                cachedNames = []
                isFetching = false
                console.error("💚🐛  ~ Erro ao buscar opções:", err)
              })
          }

          const options =
            cachedNames === null
              ? ['Carregando...']
              : (cachedNames as string[]).length
                ? cachedNames
                : ['Sem opções']

          return (
            <div className="custom-widget">
              <SchemaField
                name="selectChoice"
                schema={{
                  type: 'string',
                  title: schema.title,
                  enum: options
                }}
                uiSchema={{
                  'ui:widget': 'select',
                }}
                formData={value || ''}
                registry={registry}
                onChange={(option: string) => onChange(option)}
              />
            </div>
          )
        },
      },
    },
    widgetCustomRange: {
      type: 'number',
      title: 'Widget Range Customizado',
      widget: {
        'ui:widget': ({
          value,
          onChange,
        }: { value: any, onChange: OnChange }) => {
          return (
            <div className="custom-widget">
              <span className="db mb2">Valor: {value || 0}</span>
              <input type="range" className="w-100" min="0" max="100" value={value || 0} onChange={(e) => onChange(Number(e.target.value))} />
              <div className="flex justify-between">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>

            </div>
          )
        }
      },
    },
    widgetCustomRating: {
      type: 'number',
      title: 'Widget Rating Customizado',
      widget: {
        'ui:widget': ({
          value,
          onChange,
        }: { value: any, onChange: OnChange }) => {
          const stars = [1, 2, 3, 4, 5]
          return (
            <div className="custom-widget">
              <div className="flex justify-center ">
                {stars.map(star => (
                  <span
                    key={star}
                    className={`f2 pointer ${value >= star ? 'gold' : 'gray'}`}
                    onClick={() => onChange(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          )
        }
      },
    },
    widgetCustomColorPicker: {
      type: 'string',
      title: 'Widget Color Picker Customizado',
      widget: {
        'ui:widget': ({
          value,
          onChange,
        }: { value: any, onChange: OnChange }) => {
          const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
          return (
            <div className="custom-widget">
              <div className="flex justify-between">
                {colors.map(color => (
                  <div
                    key={color}
                    className={`w2 h2 pointer mr2 ${value === color ? 'ba b--black' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => onChange(color)}
                  />
                ))}
              </div>
            </div>
          )
        }
      },
    },
    widgetCustomTextArea: {
      type: 'string',
      title: 'Widget TextArea Customizado',
      widget: {
        'ui:widget': ({
          schema,
          value,
          onChange,
        }: { schema: any, value: any, onChange: OnChange }) => {
          return (
            <div className="custom-widget">
              <textarea
                className="w-100 pa2"
                placeholder={schema.description}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
              />
            </div>
          )
        }
      },
    },
    widgetCustomCheckbox: {
      type: 'boolean',
      title: 'Widget Checkbox Customizado',
      widget: {
        'ui:widget': ({
          schema,
          value,
          onChange,
        }: { schema: any, value: any, onChange: OnChange }) => {
          return (
            <div className="custom-widget">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={value || false}
                  onChange={(e) => onChange(e.target.checked)}
                />
                <span className="ml2">{schema.title}</span>
              </label>
            </div>
          )
        }
      },
    },
    widgetCustomRadio: {
      type: 'string',
      title: 'Widget Radio Customizado',
      enum: ['Opção A', 'Opção B', 'Opção C'],
      widget: {
        'ui:widget': ({
          schema,
          value,
          onChange,
        }: { schema: any, value: any, onChange: OnChange }) => {
          return (
            <div className="custom-widget">
              <div className="flex flex-column"></div>
              {schema.enum.map((option: string) => (
                <label key={option} className="flex items-center mb2">
                  <input
                    type="radio"
                    name={schema.title}
                    value={option}
                    checked={value === option}
                    onChange={() => onChange(option)}
                  />
                  <span className="ml2">{option}</span>
                </label>
              ))}
            </div>
          )
        }
      },
    },
    widgetCustomMultiSelect: {
      type: 'string',
      title: 'Widget MultiSelect Customizado',
      items: {
        type: 'string',
        enum: ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4', 'Opção 5'],
      },
      widget: {
        'ui:widget': ({
          schema,
          value,
          onChange,
        }: { schema: any, value: any, onChange: OnChange }) => {
          const options = schema.items.enum || []
          return (
            <div className="custom-widget">
              {options.map((option: string) => (
                <label key={option} className="flex items-center mb2">
                  <input
                    type="checkbox"
                    value={option}
                    checked={value?.includes(option)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onChange([...(value || []), option])
                      } else {
                        onChange(value.filter((v: string) => v !== option))
                      }
                    }}
                  />
                  <span className="ml2">{option}</span>
                </label>
              ))}
            </div>
          )
        }
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
