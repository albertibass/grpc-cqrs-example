export interface Hero {
    id: number;
    name: string;
    ranking: number;
}

export interface GetHeroRequest {
    id: number;
}

export interface GetHeroResponse {
    hero: Hero;
}

export interface ListHeroResponse {
    heros: Hero[];
}
