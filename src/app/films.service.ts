import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { retry } from 'rxjs/operators';
import { Language } from './models/language.model';
import { Film } from './models/film.model'

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http: HttpClient) { }

  // allFilmData = 'http://192.168.67.245:3000/film';
  allFilmData = 'http://192.168.67.245:3000/film?select=*,language(language_id,name)'
  filmByLanguageData = 'http://192.168.67.245:3000/film?language_id=eq.';
  languageListData = 'http://192.168.67.245:3000/language';
  individualFilmData = 'http://192.168.67.245:3000/film?film_id=eq.'

  getAllFilmData() {
    return this.http.get<any[]>(this.allFilmData).pipe(
      retry(3),
    )
  }

  getAllLanguagesData() {
    return this.http.get<Language[]>(this.languageListData).pipe(
    retry(3),
    )
}

  updateFilmData(id: number, updatedFilm: any) {
    return this.http.patch<Film[]>(`${this.individualFilmData}${id}`, updatedFilm)
  }
}