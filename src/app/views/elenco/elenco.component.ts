import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatPaginator,
  MatTable,
  MatTableDataSource,
} from "@angular/material";
import { ModalJogadorComponent } from "src/app/shared/modal-jogador/modal-jogador.component";

export interface Jogador {
  id: string;
  numeroCamisa: number;
  nome: string;
  posicao: string;
  idade: number;
  altura: number;
  jogos: number;
  gols: number;
  assistencias: number;
  desarmes: number;
  defesas: number;
  status: string;
  valor: number;
}

export const data: Jogador[] = [
  {
    id: "1",
    numeroCamisa: 1,
    nome: "Hirata",
    idade: 20,
    posicao: "ZAG",
    altura: 188,
    jogos: 6,
    gols: 1,
    assistencias: 2,
    desarmes: 18,
    defesas: 0,
    status: "SUSPENSO",
    valor: 1000000,
  },
  {
    id: "2",
    numeroCamisa: 2,
    nome: "Hirata",
    posicao: "ZAG",
    idade: 20,
    altura: 188,
    jogos: 6,
    gols: 1,
    assistencias: 2,
    desarmes: 18,
    defesas: 0,
    status: "SUSPENSO",
    valor: 1000000,
  },
];

@Component({
  selector: "app-elenco",
  templateUrl: "./elenco.component.html",
  styleUrls: ["./elenco.component.css"],
})
export class ElencoComponent implements OnInit {
  displayedColumns: string[] = [
    "numeroCamisa",
    "nome",
    "posicao",
    "idade",
    "altura",
    "jogos",
    "gols",
    "assistencias",
    "desarmes",
    "defesas",
    "status",
    "action",
  ];
  dataSource = new MatTableDataSource<Jogador>(data);

  @ViewChild(MatTable) elenco!: MatTable<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  abrirModal(jogador: Jogador | null): void {
    const dialogRef = this.dialog.open(ModalJogadorComponent, {
      width: "250px",
      data: jogador
        ? {
            id: jogador.id,
            numeroCamisa: jogador.numeroCamisa,
            nome: jogador.nome,
            posicao: jogador.posicao,
            idade: jogador.idade,
            altura: jogador.altura,
            jogos: jogador.jogos,
            gols: jogador.gols,
            assistencias: jogador.assistencias,
            desarmes: jogador.desarmes,
            defesas: jogador.defesas,
            status: jogador.status,
            valor: jogador.valor,
          }
        : {
            id: null,
            numeroCamisa: null,
            nome: "",
            posicao: "",
            idade: null,
            altura: null,
            jogos: null,
            gols: null,
            assistencias: null,
            desarmes: null,
            defesas: null,
            status: "",
            valor: null,
          },
    });

    dialogRef.afterClosed().subscribe((resultado: Jogador) => {
      if (resultado) {
        if (!resultado.id) {
          const data = this.dataSource.data;
          data.push({
            ...resultado,
            id: Math.floor(Date.now() * Math.random()).toString(36),
          });
          this.dataSource.data = data;
        } else {
          const newData = this.dataSource.data.map((jogador) =>
            jogador.id === resultado.id ? resultado : jogador
          );
          this.dataSource.data = newData;
        }
        this.elenco.renderRows();
      }
    });
  }

  venderJogador(numeroCamisa: number, valor: number) {
    const data = this.dataSource.data.filter(
      (jogador) => jogador.numeroCamisa !== numeroCamisa
    );

    this.dataSource.data = data;

    console.log(valor, "valor da venda");
  }
}
