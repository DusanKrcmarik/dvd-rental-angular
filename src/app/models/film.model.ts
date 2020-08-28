import { Language } from "./language.model";

export class Film {
    film_id?: number;
    title: string;
    description: string;
    release_year: number;
    language_id: number; 
    rental_duration?: number;
    rental_rate?: number;
    length?: number;
    replacement_cost?: number;
    rating?: string;
    last_update?: any;
    special_features?: [];
    fulltext?: string;
    language?: Language; 
}
