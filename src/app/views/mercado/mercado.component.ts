import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatPaginator,
  MatSnackBar,
  MatTable,
  MatTableDataSource,
} from "@angular/material";
import { JogadorCompra } from "src/app/models/Jogador";
import { ElencoService } from "src/app/services/elenco.service";
import { MercadoService } from "src/app/services/mercado.service";

@Component({
  selector: "app-mercado",
  templateUrl: "./mercado.component.html",
  styleUrls: ["./mercado.component.css"],
  providers: [MercadoService, ElencoService],
})
export class MercadoComponent implements OnInit {
  displayedColumns: string[] = [
    "numeroCamisa",
    "nome",
    "posicao",
    "time",
    "idade",
    "altura",
    "jogos",
    "gols",
    "assistencias",
    "desarmes",
    "defesas",
    "status",
    "valor",
    "action",
  ];
  dataSource = new MatTableDataSource<JogadorCompra>();

  @ViewChild(MatTable) elenco!: MatTable<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public mercadoService: MercadoService,
    public elencoService: ElencoService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.carregarMercado();
  }

  carregarMercado() {
    this.mercadoService.getMercado().subscribe((data: JogadorCompra[]) => {
      this.dataSource.data = data;
    });
    this.dataSource.paginator = this.paginator;
  }

  comprarJogador(jogadorSelecionado: JogadorCompra) {
    const jogadorComprado: any = {
      numeroCamisa: jogadorSelecionado.numeroCamisa,
      nome: jogadorSelecionado.nome,
      posicao: jogadorSelecionado.posicao,
      idade: jogadorSelecionado.idade,
      altura: jogadorSelecionado.altura,
      jogos: jogadorSelecionado.jogos,
      gols: jogadorSelecionado.gols,
      assistencias: jogadorSelecionado.assistencias,
      desarmes: jogadorSelecionado.desarmes,
      defesas: jogadorSelecionado.defesas,
      status: jogadorSelecionado.status,
      valor: jogadorSelecionado.valor,
    };
    this.elencoService.addJogadorElenco(jogadorComprado).subscribe(() => {
      this.removerJogadorMercado(jogadorSelecionado);
    });
  }

  removerJogadorMercado(jogadorSelecionado: any) {
    this.mercadoService
      .deleteJogadorMercado(jogadorSelecionado.id)
      .subscribe(() => {
        const data = this.dataSource.data.filter(
          (jogador) => jogador.id !== jogadorSelecionado.id
        );
        this.dataSource.data = data;

        this.mensagem(
          `${jogadorSelecionado.nome} (${jogadorSelecionado.posicao}) comprado por R$ ${jogadorSelecionado.valor}`,
          "OK"
        );
      });
  }

  mensagem(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
