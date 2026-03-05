import type { Pokemon } from "pokenode-ts"
export interface WidgetCustomSelect {
  selected?: string
  inFoPoke?: Pokemon
}
export interface PropsPokemon {
  activeItem: boolean
  widgetCustomSelect: WidgetCustomSelect
}
