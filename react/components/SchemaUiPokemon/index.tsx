import React from 'react'
import { SchemaUiItemProps } from './schema'
import { PropsPokemon } from './typing'
import { Pokemon } from 'pokenode-ts'

const typeColors: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
}


const SchemaUiPokemon = ({ activeItem, widgetCustomSelect }: PropsPokemon) => {
  if (!activeItem) return null
  const pokemon: Pokemon | undefined = widgetCustomSelect?.inFoPoke
  if (!pokemon) return <div>Nenhum Pokémon selecionado</div>

  const renderNamedList = (list: { name: string; url: string }[]) => (
    <ul style={{ paddingLeft: 16 }}>
      {list.map((item) => (
        <li key={item.name}>
          <a href={item.url} target="_blank" rel="noreferrer">
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  )

  const renderMoves = () => (
    <div style={{ maxHeight: 300, overflowY: "auto" }}>
      {pokemon.moves.map((move: { move: { name: string }; version_group_details: any[] }) => (
        <div
          key={move.move.name}
          style={{
            marginBottom: 12,
            padding: 8,
            border: "1px solid #eee",
            borderRadius: 8,
            background: "#fafafa",
          }}
        >
          <strong style={{ textTransform: "capitalize" }}>{move.move.name}</strong>
          <ul style={{ marginTop: 4, paddingLeft: 16 }}>
            {move.version_group_details.map((versionItem, index) => (
              <li key={index}>
                <span style={{ textTransform: "capitalize" }}>
                  {versionItem.move_learn_method.name.replace("-", " ")}
                </span>{" "}
                - lvl <strong>{versionItem.level_learned_at}</strong>{" "}
                <em style={{ color: "#555" }}>({versionItem.version_group.name})</em>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )

  const renderSprites = () => {
    const spr = pokemon.sprites
    const images: (string | null)[] = [
      spr.front_default,
      spr.back_default,
      spr.front_shiny,
      spr.back_shiny,
      spr.front_female,
      spr.back_female,
      spr.front_shiny_female,
      spr.back_shiny_female,
    ]
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {images
          .filter((img): img is string => !!img)
          .map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${pokemon.name}-${index}`}
              style={{
                width: 96,
                height: 96,
                objectFit: "contain",
                background: "#f5f5f5",
                borderRadius: 8,
                padding: 4,
              }}
            />
          ))}
      </div>
    )
  }

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        lineHeight: 1.5,
        maxWidth: 900,
        margin: "30px auto",
        padding: 24,
        background: "#fefefe",
        borderRadius: 16,
        boxShadow: "0 12px 25px rgba(0,0,0,0.12)",
      }}
    >
      {/* Header: Sprite + Name + Types */}
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <img
          src={pokemon.sprites.front_default || ""}
          alt={pokemon.name}
          style={{
            width: 160,
            height: 160,
            objectFit: "contain",
            borderRadius: 12,
            border: "2px solid #eee",
            background: "#fafafa",
          }}
        />
        <div>
          <h1 style={{ textTransform: "capitalize", marginBottom: 6 }}>
            {pokemon.name} <span style={{ color: "#888" }}>#{pokemon.id}</span>
          </h1>
          <div style={{ display: "flex", gap: 10 }}>
            {pokemon.types.map((typeItem: { type: { name: string } }) => (
              <span
                key={typeItem.type.name}
                style={{
                  background: typeColors[typeItem.type.name] || "#777",
                  color: "#fff",
                  padding: "5px 12px",
                  borderRadius: 12,
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                  fontSize: 14,
                }}
              >
                {typeItem.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <h3 style={{ marginTop: 24, marginBottom: 8 }}>Stats</h3>
      <div style={{ display: "grid", gap: 10 }}>
        {pokemon.stats.map((statItem: { stat: { name: string }; base_stat: number }) => (
          <div key={statItem.stat.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 130, fontWeight: "bold", textTransform: "capitalize" }}>
              {statItem.stat.name}
            </div>
            <div
              style={{
                flex: 1,
                height: 14,
                background: "#eee",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(statItem.base_stat / 255) * 100}%`,
                  background: "#4caf50",
                  height: "100%",
                }}
              />
            </div>
            <span style={{ width: 30, textAlign: "right", fontWeight: "bold" }}>
              {statItem.base_stat}
            </span>
          </div>
        ))}
      </div>

      {/* Abilities */}
      <h3 style={{ marginTop: 24 }}>Abilities</h3>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {pokemon.abilities.map((abilityItem: { ability: { name: string }; is_hidden: boolean }) => (
          <span
            key={abilityItem.ability.name}
            style={{
              background: abilityItem.is_hidden ? "#ffb74d" : "#64b5f6",
              color: "#fff",
              padding: "6px 12px",
              borderRadius: 10,
              textTransform: "capitalize",
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            {abilityItem.ability.name} {abilityItem.is_hidden ? "(hidden)" : ""}
          </span>
        ))}
      </div>

      {/* Moves */}
      <h3 style={{ marginTop: 24 }}>Moves</h3>
      <div
        style={{
          overflowY: "auto",
          padding: 10,
          border: "1px solid #eee",
          borderRadius: 12,
          background: "#fafafa",
        }}
      >
        {renderMoves()}
      </div>

      {/* Forms */}
      <h3 style={{ marginTop: 24 }}>Forms</h3>
      {renderNamedList(pokemon.forms)}

      {/* Sprites */}
      <h3 style={{ marginTop: 24 }}>Sprites</h3>
      {renderSprites()}

      {/* Physical info */}
      <h3 style={{ marginTop: 24 }}>Physical / Base Info</h3>
      <p style={{ margin: 4, lineHeight: 1.6 }}>
        <strong>Weight:</strong> {pokemon.weight} hg | <strong>Height:</strong> {pokemon.height} dm |{" "}
        <strong>Base XP:</strong> {pokemon.base_experience} | <strong>Order:</strong> {pokemon.order} |{" "}
        <strong>Default:</strong> {pokemon.is_default ? "Yes" : "No"}
      </p>

      {/* Species */}
      <h3 style={{ marginTop: 24 }}>Species</h3>
      <a
        href={pokemon.species.url}
        target="_blank"
        rel="noreferrer"
        style={{ color: "#1976d2", textDecoration: "underline" }}
      >
        {pokemon.species.name}
      </a>

      {/* Location Encounters */}
      <h3 style={{ marginTop: 24 }}>Location Encounters</h3>
      <a
        href={pokemon.location_area_encounters}
        target="_blank"
        rel="noreferrer"
        style={{ color: "#1976d2", textDecoration: "underline" }}
      >
        {pokemon.location_area_encounters}
      </a>
    </div>
  )
}

/* =========================
   SCHEMA Props
========================= */

SchemaUiPokemon.schema = SchemaUiItemProps

export default SchemaUiPokemon
