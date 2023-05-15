import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatPaginator,
  MatSnackBar,
  MatTable,
  MatTableDataSource,
} from "@angular/material";
import { Jogador } from "src/app/models/Jogador";
import { ElencoService } from "src/app/services/elenco.service";
import { MercadoService } from "src/app/services/mercado.service";
import { ModalJogadorComponent } from "src/app/shared/modal-jogador/modal-jogador.component";

@Component({
  selector: "app-elenco",
  templateUrl: "./elenco.component.html",
  styleUrls: ["./elenco.component.css"],
  providers: [ElencoService, MercadoService],
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

  constructor(
    public elencoService: ElencoService,
    public mercadoService: MercadoService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

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
            newData.push(data);
            this.dataSource.data = newData;
            this.elenco.renderRows();
            this.mensagem("Jogador adicionado com sucesso", "OK");
            this.carregarElenco();
          });
        } else {
          this.elencoService.editJogadorElenco(resultado).subscribe((data) => {
            const newData = this.dataSource.data.map((jogador) =>
              jogador.id === data.id ? data : jogador
            );
            this.dataSource.data = newData;
            this.elenco.renderRows();
            this.mensagem("Jogador editado com sucesso", "OK");
            this.carregarElenco();
          });
        }
      }
    });
  }

  venderJogador(jogadorVendido: Jogador) {
    this.elencoService.deleteJogadorElenco(jogadorVendido.id).subscribe(() => {
      const data = this.dataSource.data.filter(
        (jogador) => jogador.id !== jogadorVendido.id
      );
      this.dataSource.data = data;
      this.carregarElenco();

      const novoJogadorMercado = {
        numeroCamisa: jogadorVendido.numeroCamisa,
        nome: jogadorVendido.nome,
        posicao: jogadorVendido.posicao,
        time: "Várzea FC",
        idade: jogadorVendido.idade,
        altura: jogadorVendido.altura,
        jogos: jogadorVendido.jogos,
        gols: jogadorVendido.gols,
        assistencias: jogadorVendido.assistencias,
        desarmes: jogadorVendido.desarmes,
        defesas: jogadorVendido.defesas,
        status: jogadorVendido.status,
        valor: jogadorVendido.valor,
      };

      this.adicionarJogadorAoMercado(novoJogadorMercado);
    });
  }

  mensagem(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  adicionarJogadorAoMercado(novoJogadorMercado: any) {
    this.mercadoService.addJogadorMercado(novoJogadorMercado).subscribe(() => {
      this.mensagem(
        `${novoJogadorMercado.nome} (${novoJogadorMercado.posicao}) vendido por R$ ${novoJogadorMercado.valor}`,
        "OK"
      );
    });
  }
}
