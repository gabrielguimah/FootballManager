import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_PATH } from "src/environments/environment";
import { JogadorCompra } from "../models/Jogador";

@Injectable()
export class MercadoService {
  constructor(private http: HttpClient) {}

  getMercado(): Observable<JogadorCompra[]> {
    return this.http.get<JogadorCompra[]>(`${API_PATH}mercado`);
  }

  deleteJogadorMercado(id: number): Observable<JogadorCompra> {
    return this.http.delete<JogadorCompra>(`${API_PATH}mercado/${id}`);
  }

  addJogadorMercado(jogador: JogadorCompra): Observable<JogadorCompra> {
    return this.http.post<JogadorCompra>(`${API_PATH}mercado`, jogador);
  }
}
