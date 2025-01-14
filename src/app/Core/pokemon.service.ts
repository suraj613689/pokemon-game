import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private limit = 100;

  constructor(private http: HttpClient) { }

  getPokemonList(): Observable<any> {
    const params = new HttpParams()
      .set('limit', this.limit.toString())

    return this.http.get(this.apiUrl, { params });
  }

  getPokemonByName(name): Observable<any> {
    return this.http.get(`${this.apiUrl}/${name}`);
  }
}
