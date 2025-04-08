interface IGetPokemonRequest {
    name: string
}

interface IGetPokemonDataResponse {
    abilities: any,
    base_experience: number,
    cries: Object,
    forms: any[],
    game_indices: any[],
    height: number,
    held_items: any[],
    id: number,
    is_default: boolean,
    location_area_encounters: string,
    moves: any[],
    name: string,
    order: number,
    past_abilities: any[],
    past_types: any[],
    species: Object,
    sprites: Object,
    stats: Object[],
    types: Object[],
    weight: number,
}

interface IGetPokemonResponse {
    data: IGetPokemonDataResponse
    status: number
    statusText: string
    headers: any
    config: any
    request: any
}
