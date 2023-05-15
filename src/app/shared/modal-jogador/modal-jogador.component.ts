import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Jogador } from "src/app/models/Jogador";

@Component({
  selector: "app-modal-jogador",
  templateUrl: "./modal-jogador.component.html",
  styleUrls: ["./modal-jogador.component.css"],
})
export class ModalJogadorComponent implements OnInit {
  jogador!: Jogador;
  editando!: boolean;

  status: any[] = [
    { value: "APTO", viewValue: "Apto" },
    { value: "SUSPENSO", viewValue: "Suspenso" },
    { value: "LESIONADO", viewValue: "Lesionado" },
  ];

  posicoes: any[] = [
    { value: "GOL", viewValue: "Goleiro" },
    { value: "LAT", viewValue: "Lateral" },
    { value: "ZAG", viewValue: "Zagueiro" },
    { value: "MEI", viewValue: "Meia" },
    { value: "ATA", viewValue: "Atacante" },
  ];

  ngOnInit() {
    this.editando = !!this.data.id;
    console.log(this.editando);
  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Jogador,
    public dialogRef: MatDialogRef<ModalJogadorComponent>
  ) {}

  cancelar(): void {
    this.dialogRef.close();
  }
}
