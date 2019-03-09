import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modulos/login/login/login.component';
import { CadastroComponent } from './modulos/login/cadastro/cadastro.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'cadastro', component:CadastroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
