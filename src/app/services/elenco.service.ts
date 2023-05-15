import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_PATH } from "src/environments/environment";
import { Jogador } from "../models/Jogador";

@Injectable()
export class ElencoService {
  elencoApiUrl = "http://localhost:3000/elenco";
  constructor(private http: HttpClient) {}

  getElenco(): Observable<Jogador[]> {
    return this.http.get<Jogador[]>(`${API_PATH}elenco`);
  }

  addJogadorElenco(jogador: Jogador): Observable<Jogador> {
    return this.http.post<Jogador>(`${API_PATH}elenco`, jogador);
  }

  editJogadorElenco(jogador: Jogador): Observable<Jogador> {
    return this.http.put<Jogador>(`${API_PATH}elenco/${jogador.id}`, jogador);
  }

  deleteJogadorElenco(id: string): Observable<Jogador> {
    return this.http.delete<Jogador>(`${API_PATH}elenco/${id}`);
  }
}
