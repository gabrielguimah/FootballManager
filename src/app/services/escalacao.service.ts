import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_PATH } from "src/environments/environment";
import { Jogador } from "../models/Jogador";

@Injectable()
export class EscalacaoService {
  constructor(private http: HttpClient) {}

  getEscalacao(): Observable<Jogador[]> {
    return this.http.get<Jogador[]>(`${API_PATH}escalacao`);
  }
}
