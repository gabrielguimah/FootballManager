import { Component, OnInit } from "@angular/core";
import { Jogador } from "src/app/models/Jogador";
import { ElencoService } from "src/app/services/elenco.service";

@Component({
  selector: "app-estatisticas",
  templateUrl: "./estatisticas.component.html",
  styleUrls: ["./estatisticas.component.css"],
  providers: [ElencoService],
})
export class EstatisticasComponent implements OnInit {
  liderGols = {};
  liderAssistencias = {};
  liderDesarmes = {};
  liderDefesas = {};

  constructor(public elencoService: ElencoService) {}

  ngOnInit() {
    this.carregarElenco();
  }

  carregarElenco() {
    this.elencoService.getElenco().subscribe((data: Jogador[]) => {
      if (data.length > 0) {
        this.liderGols = data.reduce(function (anterior, atual) {
          return anterior.gols > atual.gols ? anterior : atual;
        });

        this.liderAssistencias = data.reduce(function (anterior, atual) {
          return anterior.assistencias > atual.assistencias ? anterior : atual;
        });

        this.liderDesarmes = data.reduce(function (anterior, atual) {
          return anterior.desarmes > atual.desarmes ? anterior : atual;
        });

        this.liderDefesas = data.reduce(function (anterior, atual) {
          return anterior.defesas > atual.defesas ? anterior : atual;
        });
      }
    });
  }
}
