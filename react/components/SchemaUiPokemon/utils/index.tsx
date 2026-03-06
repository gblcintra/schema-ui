import React from "react"

export const PokemonStyles = () => (
  <style>
    {`
      .bg-poke-normal { background:#A8A77A }
      .bg-poke-fire { background:#EE8130 }
      .bg-poke-water { background:#6390F0 }
      .bg-poke-electric { background:#F7D02C }
      .bg-poke-grass { background:#7AC74C }
      .bg-poke-ice { background:#96D9D6 }
      .bg-poke-fighting { background:#C22E28 }
      .bg-poke-poison { background:#A33EA1 }
      .bg-poke-ground { background:#E2BF65 }
      .bg-poke-flying { background:#A98FF3 }
      .bg-poke-psychic { background:#F95587 }
      .bg-poke-bug { background:#A6B91A }
      .bg-poke-rock { background:#B6A136 }
      .bg-poke-ghost { background:#735797 }
      .bg-poke-dragon { background:#6F35FC }
      .bg-poke-dark { background:#705746 }
      .bg-poke-steel { background:#B7B7CE }
      .bg-poke-fairy { background:#D685AD }
    `}
  </style>
)

export const typeColors: Record<string, string> = {
  normal: "bg-poke-normal",
  fire: "bg-poke-fire",
  water: "bg-poke-water",
  electric: "bg-poke-electric",
  grass: "bg-poke-grass",
  ice: "bg-poke-ice",
  fighting: "bg-poke-fighting",
  poison: "bg-poke-poison",
  ground: "bg-poke-ground",
  flying: "bg-poke-flying",
  psychic: "bg-poke-psychic",
  bug: "bg-poke-bug",
  rock: "bg-poke-rock",
  ghost: "bg-poke-ghost",
  dragon: "bg-poke-dragon",
  dark: "bg-poke-dark",
  steel: "bg-poke-steel",
  fairy: "bg-poke-fairy",
}

export const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1)
