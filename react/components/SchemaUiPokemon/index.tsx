import React from 'react'
import { NamedAPIResource, Pokemon, PokemonAbility, PokemonMove, PokemonMoveVersion, PokemonStat, PokemonType } from 'pokenode-ts'
import { SchemaUiItemProps } from './schema'
import { PropsPokemon } from './typing'
import { capitalize, PokemonStyles } from './utils'

const typeColors: Record<string, string> = {
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

const SchemaUiPokemon = ({ activeItem, widgetCustomSelect }: PropsPokemon) => {
  if (!activeItem) return null

  const pokemon: Pokemon | undefined = widgetCustomSelect?.inFoPoke
  const loading: boolean = widgetCustomSelect?.loading || false

  if (loading) return <div className="sans-serif lh-copy mw8 center pa4 bg-white br4 shadow-3"><div className="pa3">Carregando informações do Pokémon...</div></div>

  if (!pokemon) return <div className="pa3">Nenhum Pokémon selecionado</div>

  const renderNamedList = (list: NamedAPIResource[]) => (
    <ul className="pl3 list">
      {list.map((item) => (
        <li key={item.name}>
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="link blue"
          >
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  )

  const renderMoves = () => (
    <div className="overflow-auto" style={{ maxHeight: 300 }}>
      {pokemon.moves.map((move: PokemonMove) => (
        <div
          key={move.move.name}
          className="mb3 pa2 ba b--light-gray br2 bg-near-white"
        >
          <strong className="ttc">{move.move.name}</strong>

          <ul className="pl3 mt2">
            {move.version_group_details.map((versionItem: PokemonMoveVersion, index: number) => (
              <li key={index}>
                <span className="ttc">
                  {versionItem.move_learn_method.name.replace("-", " ")}
                </span>{" "}
                - lvl <strong>{versionItem.level_learned_at}</strong>{" "}
                <em className="gray">
                  ({versionItem.version_group.name})
                </em>
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

    const imagesVersion = spr?.versions

    const SpriteCard = ({ src, alt }: { src: string; alt: string }) => (
      <div
        className="ma2 pa2 br3 bg-near-white shadow-1 flex items-center justify-center"
        style={{ width: 96, height: 96 }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain"
          }}
          title={capitalize(pokemon.name)}
          aria-label={capitalize(pokemon.name)}
        />
      </div>
    )

    return (
      <>
        {/* Sprites principais */}
        <div className="flex flex-wrap">
          {images
            .filter((img): img is string => Boolean(img))
            .map((img, index) => (
              <SpriteCard
                key={index}
                src={img}
                alt={`${pokemon.name}-${index}`}
              />
            ))}
        </div>

        {/* Sprites por versão */}
        {imagesVersion && (
          <div className="mt5">
            <h3 className="mb4">Sprites por versão</h3>

            {Object.entries(imagesVersion).map(([versionName, versionData]) => {
              const sprites = Object.values(versionData as Record<string, { front_default: string }>)
                .filter((img) => img?.front_default)

              if (!sprites.length) return null

              return (
                <div key={versionName} className="mb5">
                  <h4 className="mb3 ttu silver">{versionName}</h4>

                  <div className="flex flex-wrap">
                    {sprites.map((img, index) => (
                      <SpriteCard
                        key={index}
                        src={img.front_default}
                        alt={`${pokemon.name}-${versionName}-${index}`}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </>
    )
  }

  return (
    <div className="sans-serif lh-copy mw8 center pa4 bg-white br4 shadow-3">

      <PokemonStyles />
      {/* Header */}
      <div className="flex items-center">
        <img
          src={pokemon.sprites.front_default || ""}
          alt={pokemon.name}
          className="w5 h5 br3 ba b--light-gray bg-near-white mr4"
          title={capitalize(pokemon.name)}
          aria-label={capitalize(pokemon.name)}
        />

        <div>
          <h1 className="ttc fw7 mb2">
            {pokemon.name} <span className="gray">#{pokemon.id}</span>
          </h1>

          <div className="flex flex-wrap">
            {pokemon.types.map((typeItem: PokemonType) => (
              <span
                key={typeItem.type.name}
                className={`white br-pill fw6 ttc mr2 mb2 ph3 pv1 ${typeColors[typeItem.type.name] || "bg-gray"
                  }`}
              >
                {typeItem.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <h3 className="mt4 mb2">Stats</h3>

      <div>
        {pokemon.stats.map((statItem: PokemonStat) => {
          const maxStat = Math.max(...pokemon.stats.map((statMap: PokemonStat) => statMap.base_stat))
          return (
            <div key={statItem.stat.name} className="flex items-center mb2">
              <div className="w4 fw6 ttc">
                {statItem.stat.name}
              </div>

              <div className="flex-auto bg-light-gray br2 mh2">
                <div
                  className="bg-green h1 br2"
                  style={{
                    width: `${(statItem.base_stat / maxStat) * 100}%`,
                  }}
                />
              </div>

              <span className="fw7 w2 tr">
                {statItem.base_stat}
              </span>
            </div>
          );
        })}
      </div>

      {/* Abilities */}
      <h3 className="mt4">Abilities</h3>

      <div className="flex flex-wrap">
        {pokemon.abilities.map((abilityItem: PokemonAbility) => (
          <span
            key={abilityItem.ability.name}
            className={`white br2 fw6 ttc mr2 mb2 ph3 pv1 ${abilityItem.is_hidden ? "bg-poke-fire" : "bg-poke-water"
              }`}
          >
            {abilityItem.ability.name}
            {abilityItem.is_hidden ? " (hidden)" : ""}
          </span>
        ))}
      </div>

      {/* Moves */}
      <h3 className="mt4">Moves</h3>

      <div className="ba b--light-gray br3 pa2 bg-near-white">
        {renderMoves()}
      </div>

      {/* Forms */}
      <h3 className="mt4">Forms</h3>
      {renderNamedList(pokemon.forms)}

      {/* Sprites */}
      <h3 className="mt4">Sprites</h3>
      {renderSprites()}

      {/* Physical info */}
      <h3 className="mt4">Physical / Base Info</h3>

      <p className="lh-copy">
        <strong>Weight:</strong> {pokemon.weight} hg |{" "}
        <strong>Height:</strong> {pokemon.height} dm |{" "}
        <strong>Base XP:</strong> {pokemon.base_experience} |{" "}
        <strong>Order:</strong> {pokemon.order} |{" "}
        <strong>Default:</strong> {pokemon.is_default ? "Yes" : "No"}
      </p>

      {/* Species */}
      <h3 className="mt4">Species</h3>

      <a
        href={pokemon.species.url}
        target="_blank"
        rel="noreferrer"
        className="link blue underline"
      >
        {pokemon.species.name}
      </a>

      {/* Location */}
      <h3 className="mt4">Location Encounters</h3>

      <a
        href={pokemon.location_area_encounters}
        target="_blank"
        rel="noreferrer"
        className="link blue underline"
      >
        {pokemon.location_area_encounters}
      </a>
    </div>
  )
}

SchemaUiPokemon.schema = SchemaUiItemProps

export default SchemaUiPokemon
