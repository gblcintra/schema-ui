import React, { useEffect, useState } from 'react'
import { NamedAPIResource, Pokemon, PokemonAbility, PokemonMove, PokemonMoveVersion, PokemonStat, PokemonType, VersionSprites } from 'pokenode-ts'
import { SchemaUiItemProps } from './schema'
import { OtherPokemonSpritesExtended, PropsPokemon } from './typing'
import { capitalize, PokemonStyles, typeColors } from './utils'

const SchemaUiPokemon = ({ activeItem, widgetCustomSelect }: PropsPokemon) => {
  if (!activeItem) return null
  const [locations, setLocations] = useState<string[] | null>(null)
  const [locationsError, setLocationsError] = useState(false)


  const pokemon: Pokemon | undefined = widgetCustomSelect?.inFoPoke
  const loading: boolean = widgetCustomSelect?.loading || false
  useEffect(() => {
    if (!pokemon?.location_area_encounters) return

    let cancelled = false

    const fetchLocations = async () => {
      try {
        const res = await fetch(pokemon.location_area_encounters)
        const data: { location_area: NamedAPIResource }[] = await res.json()

        if (cancelled) return

        const names = data.map(i =>
          capitalize(i.location_area.name.replace(/-/g, " "))
        )

        setLocations(names)
      } catch {
        if (!cancelled) {
          setLocationsError(true)
        }
      }
    }

    fetchLocations()

    return () => {
      cancelled = true
    }
  }, [pokemon])

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
            {capitalize(item.name)}
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

    const images = [
      spr.front_default,
      spr.back_default,
      spr.front_female,
      spr.back_female,
    ]

    const imagesShiny = [
      spr.front_shiny,
      spr.back_shiny,
      spr.front_shiny_female,
      spr.back_shiny_female,
    ]

    const SpriteCard = ({ src, alt, title }: { src: string; alt: string; title?: string }) => (
      <div
        className="ma2 pa2 br3 bg-near-white shadow-1 flex items-center justify-center"
        style={{ width: 96, height: 96 }}
      >
        <img
          src={src || "https://via.placeholder.com/96?text=No+Image"}
          alt={alt}
          title={title ? capitalize(title) : capitalize(pokemon.name)}
          aria-label={title ? capitalize(title) : capitalize(pokemon.name)}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    )

    const renderList = (imgs: (string | null)[], prefix = "") =>
      imgs
        .filter((img): img is string => Boolean(img))
        .map((img, i) => (
          <SpriteCard key={i} src={img} alt={`${pokemon.name}-${prefix}${i}`} title={`${pokemon.name}  ${capitalize(prefix).split("-").join(" ")}`} />
        ))

    return (
      <>
        <div className="flex flex-column">
          {[
            { title: "Normal Form", imgs: images },
            { title: "Shiny Form", imgs: imagesShiny, prefix: "shiny-" },
          ].map(({ title, imgs, prefix }) => (
            <div key={title} className="flex flex-column">
              <h4>{title}</h4>
              <div className="flex">{renderList(imgs, prefix)}</div>
            </div>
          ))}
        </div>

        {spr.other && (
          <div className="mt5">
            <h3 className="mb4">Sprites "Other"</h3>
            <div className="flex flex-wrap">
              {Object.entries(spr.other).map(([key, value]) => {
                const img = (value as any)?.front_default
                return img ? (
                  <SpriteCard key={key} src={img} alt={`${pokemon.name}-${key}`} title={`${pokemon.name}`} />
                ) : null
              })}
            </div>
          </div>
        )}

        {spr.versions && (
          <div className="mt5">
            <h3 className="mb4">Sprites por versão</h3>

            {Object.entries(spr.versions as VersionSprites).map(([versionName, versionData]) => {
              const sprites = Object.entries(
                versionData as Record<string, { front_default: string | null }>
              ).filter(([, spriteValue]) => spriteValue?.front_default)

              if (!sprites.length) return null

              return (
                <div key={versionName} className="mb5">
                  <h4 className="mb3 ttu silver">{versionName}</h4>

                  <div className="flex flex-wrap">
                    {sprites.map(([gameName, sprite], index) => (
                      <SpriteCard
                        key={index}
                        src={sprite.front_default!}
                        alt={`${pokemon.name}-${capitalize(gameName)}`}
                        title={`${pokemon.name} - ${capitalize(gameName).split("-").join(" ")}`}
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

  const physicalInfo: {
    label: string
    value: React.ReactNode
  }[] = [
      { label: "Weight", value: `${pokemon.weight} hg` },
      { label: "Height", value: `${pokemon.height} dm` },
      { label: "Base XP", value: pokemon.base_experience },
      { label: "Order", value: pokemon.order },
      { label: "Default Form", value: pokemon.is_default ? "Yes" : "No" },
    ]

  return (
    <div className="sans-serif lh-copy mw8 center pa4 bg-white br4 shadow-3">

      <PokemonStyles />
      {/* Header */}
      <div className="flex items-center">
        <img
          src={(pokemon.sprites.other as OtherPokemonSpritesExtended)?.["official-artwork"]?.front_default || pokemon.sprites.front_default || "https://via.placeholder.com/96?text=No+Image"}
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

      {/* Sprites */}
      <h3 className="mt4">Sprites</h3>
      {renderSprites()}

      {/* Physical info */}
      <h3 className="mt4">Physical / Base Info</h3>

      <div className="flex flex-wrap justify-between w-100 mt2">
        {physicalInfo.map((item) => (
          <div key={item.label} className={`w-${100 / physicalInfo.length || "50"} pa2`}>
            <div className="pa3 bg-near-white br3 shadow-1">
              <span className="db gray f6">{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          </div>
        ))}

      </div>

      {/* Species */}
      <h3 className="mt4">Species</h3>

      <div className="pa3 bg-near-white br3 shadow-1 inline-flex items-center">
        <div className="db">
          <span className="db gray f6">Species:</span>
          <a
            href={pokemon.species.url}
            target="_blank"
            rel="noreferrer"
            className="link blue fw6 ttc"
          >
            <strong> {pokemon.species.name}</strong>
          </a>
        </div>
      </div>

      {/* Forms */}
      <h3 className="mt4">Forms</h3>
      {renderNamedList(pokemon.forms)}

      {/* Location */}
      <h3 className="mt4">Location Encounters</h3>

      {locationsError && (
        <p className="red">Erro ao buscar locais.</p>
      )}

      {locations === null && !locationsError && (
        <p className="gray">Carregando locais de encontro...</p>
      )}

      {locations && locations.length === 0 && (

        <p className="gray">Nenhum local encontrado.</p>
      )}

      {locations && locations.length > 0 && (
        <div className="ba b--light-gray br3 pa3 bg-near-white mt2">
          <div className="flex flex-wrap">
            {locations.map((loc) => (
              <span
                key={loc}
                className="bg-light-gray br-pill fw5 ttc mr2 mb2 ph3 pv1"
              >
                {loc}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

SchemaUiPokemon.schema = SchemaUiItemProps

export default SchemaUiPokemon
