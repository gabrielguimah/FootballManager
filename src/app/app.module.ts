import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./views/home/home.component";
import { AppRoutingModule } from ".//app-routing.module";
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatButtonModule } from "@angular/material/button";
import { ElencoComponent } from "./views/elenco/elenco.component";
import { EscalacaoComponent } from "./views/escalacao/escalacao.component";
import { MercadoComponent } from "./views/mercado/mercado.component";
import { EstatisticasComponent } from "./views/estatisticas/estatisticas.component";
import { MatDialogModule } from "@angular/material/dialog";
import { ModalJogadorComponent } from "./shared/modal-jogador/modal-jogador.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatCardModule } from "@angular/material/card";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ElencoComponent,
    EscalacaoComponent,
    MercadoComponent,
    EstatisticasComponent,
    ModalJogadorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCardModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  entryComponents: [ModalJogadorComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
