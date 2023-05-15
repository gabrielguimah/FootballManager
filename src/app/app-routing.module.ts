import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ElencoComponent } from "./views/elenco/elenco.component";
import { EncontrarJogadoresComponent } from "./views/encontrar-jogadores/encontrar-jogadores.component";
import { EstatisticasComponent } from "./views/estatisticas/estatisticas.component";
import { HomeComponent } from "./views/home/home.component";
import { EscalacaoComponent } from "./views/escalacao/escalacao.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "elenco",
    component: ElencoComponent,
  },
  {
    path: "escalacao",
    component: EscalacaoComponent,
  },
  {
    path: "encontrar_jogadores",
    component: EncontrarJogadoresComponent,
  },
  {
    path: "estatisticas",
    component: EstatisticasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
