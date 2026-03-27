import type { OtherPokemonSprites, Pokemon } from "pokenode-ts"

type ShowdownSprites = {
  front_default?: string
  front_shiny?: string
}

export type OtherPokemonSpritesExtended = OtherPokemonSprites & {
  "official-artwork"?: ShowdownSprites
}
export interface WidgetCustomSelect {
  selected?: string
  inFoPoke?: Pokemon
  loading: boolean
}
export interface PropsPokemon {
  activeItem: boolean
  widgetCustomSelect: WidgetCustomSelect
}
