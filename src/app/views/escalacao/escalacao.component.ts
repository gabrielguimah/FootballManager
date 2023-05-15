import { Component, OnInit } from "@angular/core";
import { EscalacaoService } from "src/app/services/escalacao.service";

@Component({
  selector: "app-escalacao",
  templateUrl: "./escalacao.component.html",
  styleUrls: ["./escalacao.component.css"],
  providers: [EscalacaoService],
})
export class EscalacaoComponent implements OnInit {
  dataSource = {};

  constructor(public escalacaoService: EscalacaoService) {}

  ngOnInit() {
    this.carregarElenco();
  }

  carregarElenco() {
    this.escalacaoService.getEscalacao().subscribe((data) => {
      console.log(data, "dataaaa");
      this.dataSource = data;
    });
  }

  formatarCardTitulo(jogador: any, posicao: string) {
    if (jogador) {
      return `${jogador.numeroCamisa} | ${jogador.nome} (${posicao})`;
    } else {
      return `Escale um jogador (${posicao})`;
    }
  }
}
