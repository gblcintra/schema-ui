import type { Pokemon } from "pokenode-ts"
export interface WidgetCustomSelect {
  selected?: string
  inFoPoke?: Pokemon
  loading: boolean
}
export interface PropsPokemon {
  activeItem: boolean
  widgetCustomSelect: WidgetCustomSelect
}
