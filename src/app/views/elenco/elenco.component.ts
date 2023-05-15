import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatPaginator,
  MatTable,
  MatTableDataSource,
} from "@angular/material";
import { Jogador } from "src/app/models/Jogador";
import { ElencoService } from "src/app/services/elenco.service";
import { ModalJogadorComponent } from "src/app/shared/modal-jogador/modal-jogador.component";

@Component({
  selector: "app-elenco",
  templateUrl: "./elenco.component.html",
  styleUrls: ["./elenco.component.css"],
  providers: [ElencoService],
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
  dataSource = new MatTableDataSource<Jogador>();

  @ViewChild(MatTable) elenco!: MatTable<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public elencoService: ElencoService, public dialog: MatDialog) {}

  ngOnInit() {
    this.carregarElenco();
  }

  carregarElenco() {
    this.elencoService.getElenco().subscribe((data: Jogador[]) => {
      this.dataSource.data = data;
    });
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
          this.elencoService.addJogadorElenco(resultado).subscribe((data) => {
            const newData = this.dataSource.data;
            newData.push({
              ...data,
              id: Math.floor(Date.now() * Math.random()).toString(36),
            });
            this.dataSource.data = newData;
            this.elenco.renderRows();
          });
        } else {
          this.elencoService.editJogadorElenco(resultado).subscribe((data) => {
            const newData = this.dataSource.data.map((jogador) =>
              jogador.id === data.id ? data : jogador
            );
            this.dataSource.data = newData;
            this.elenco.renderRows();
          });
        }
        this.carregarElenco();
      }
    });
  }

  venderJogador(id: string, valor: number) {
    this.elencoService.deleteJogadorElenco(id).subscribe(() => {
      const data = this.dataSource.data.filter((jogador) => jogador.id !== id);

      this.dataSource.data = data;
    });

    this.carregarElenco();

    console.log(valor, "do jogador");
  }
}
