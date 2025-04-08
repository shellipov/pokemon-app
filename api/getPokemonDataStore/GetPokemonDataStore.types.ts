export interface IGetPokemonRequest {
    name: string
}

export interface IGetPokemonDataResponse {
    abilities: any,
    base_experience: number,
    cries: object,
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
    species: object,
    sprites: object,
    stats: object[],
    types: object[],
    weight: number,
}

export interface IGetPokemonResponse {
    data: IGetPokemonDataResponse
    status: number
    statusText: string
    headers: any
    config: any
    request: any
}
