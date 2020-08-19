import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http: HttpClient) { }

  allFilmData = 'http://192.168.67.245:3000/film';
  filmByLanguageData = 'http://192.168.67.245:3000/film?language_id=eq.';
  languageListData = 'http://192.168.67.245:3000/language';

  getAllFilmData() {
    return this.http.get<any>(this.allFilmData)
  }

}
