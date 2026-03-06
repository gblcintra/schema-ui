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
      .vtex-store-footer-2-x-footer{display:none}
    `}
  </style>
)

export const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1)
