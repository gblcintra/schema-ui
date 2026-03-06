import { Pokemon } from "pokenode-ts"
import React from "react"
import { capitalize } from "./utils"

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
          const typedValue = value as { selected?: string; inFoPoke?: Pokemon, loading: boolean } | undefined

          const SchemaField = registry.fields.SchemaField

          if (!cachedNames && !isFetching) {
            isFetching = true

            fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
              .then(res => res.json())
              .then((data: { results: { name: string }[] }) => {
                cachedNames = data.results.map((i: { name: string }) => i.name)
                isFetching = false
                // força re-render do RJSF
                onChange(typedValue ? { ...typedValue, selected: typedValue.selected, loading: false } : { selected: '', loading: false })
              })
              .catch((err) => {
                cachedNames = []
                isFetching = false
                console.error("💚🐛 ~ Erro ao buscar opções:", err)
                onChange(typedValue ? { ...typedValue, selected: typedValue.selected, loading: false } : { selected: '', loading: false })
              })
          }



          const options =
            cachedNames === null
              ? ['Carregando...']
              : (cachedNames as string[]).length
                ? cachedNames.map((name) => capitalize(name))
                : ['Sem opções']

          const handleChange = (selected: string) => {
            onChange({
              selected,
              inFoPoke: null,
              loading: true
            })

            const index = options.indexOf(selected)

            if (index === -1) return

            const pokemonId = index + 1

            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
              .then(res => res.json())
              .then((data) => {
                onChange({
                  selected: selected,
                  inFoPoke: data,
                  loading: false
                })
              })
              .catch((err) => {
                console.error("Erro ao buscar pokemon:", err)
                onChange({
                  selected: selected,
                  inFoPoke: null,
                  loading: false
                })
              })
          }

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
                onChange={(option) => handleChange(option as string)}
              />
            </div>
          )
        },
      },
    },
  }
}
