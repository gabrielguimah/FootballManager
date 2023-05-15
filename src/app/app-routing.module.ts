import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ElencoComponent } from "./views/elenco/elenco.component";
import { MercadoComponent } from "./views/mercado/mercado.component";
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
    path: "mercado",
    component: MercadoComponent,
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
