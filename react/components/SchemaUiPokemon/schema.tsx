import React from "react"

let cachedNames: string[] | null = null
let isFetching = false

export const SchemaUiItemProps = {
  title: 'Configuração do schema',
  type: 'object',
  widget: {
    classNames: 'bg-near-white ba b--light-gray ph3 mb3',
  },

  properties: {
    fieldNull: {
      title: "Texto com type Null",
      type: "null",
      description: "Campos nulos como este são ótimos para adicionar informações extras",
      widget: {
        'ui:field': ({ schema }: WidgetProps) => {
          return <h4 className="ma0 f5 near-black">{schema?.description}</h4>
        },
      },
    },

    activeItem: {
      title: 'Ativar Item',
      type: 'boolean',
      default: true,
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
        }: WidgetProps) => {
          const typedValue = value as { selected?: string; inFoPoke?: any } | undefined
          console.log("💚🐛  ~ typedValue:", typedValue)

          const SchemaField = registry.fields.SchemaField

          if (!cachedNames && !isFetching) {
            isFetching = true

            fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
              .then(res => res.json())
              .then((data: any) => {
                console.log("💚🐛  ~ data:", data)
                cachedNames = data.results.map((i: any) => i.name)
                console.log("💚🐛  ~ cachedNames:", cachedNames)
                isFetching = false
                // força re-render do RJSF
                onChange(typedValue ? { ...typedValue, selected: typedValue.selected } : { selected: '' })
              })
              .catch((err) => {
                cachedNames = []
                isFetching = false
                console.error("💚🐛 ~ Erro ao buscar opções:", err)
              })
          }

          const capitalize = (text: string) =>
            text.charAt(0).toUpperCase() + text.slice(1)

          const options =
            cachedNames === null
              ? ['Carregando...']
              : (cachedNames as string[]).length
                ? cachedNames.map((name) => capitalize(name))
                : ['Sem opções']

          const handleChange = (selected: any) => {
            console.log("💚🐛  ~ handleChange ~ selected:", selected)
            onChange({
              selected,
              inFoPoke: null
            })

            const index = options.indexOf(selected)
            console.log("💚🐛  ~ handleChange ~ options:", options)

            if (index === -1) return

            const pokemonId = index + 1

            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
              .then(res => res.json())
              .then((data) => {
                onChange({
                  selected: selected,
                  inFoPoke: data
                })
              })
              .catch((err) => {
                console.error("Erro ao buscar pokemon:", err)
              })
          }
          console.log("💚🐛  ~ value:", value)
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
                formData={typedValue?.selected || ''}
                registry={registry}
                onChange={(option) => handleChange(option)}
              />
            </div>
          )
        },
      },
    },
  }
}
