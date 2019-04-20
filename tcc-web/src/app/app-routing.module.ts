import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modulos/login/login/login.component';
import { CadastroComponent } from './modulos/login/cadastro/cadastro.component';
import { HomeComponent } from './modulos/home/home.component';
import { BoardComponent } from './modulos/board/board.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { CadastroContratanteComponent } from './modulos/login/cadastro/cadastro-contratante/cadastro-contratante.component';
import { CadastroGestorComponent } from './modulos/login/cadastro/cadastro-gestor/cadastro-gestor.component';
import { CadastroPrestadorComponent } from './modulos/login/cadastro/cadastro-prestador/cadastro-prestador.component';
import { AnaliseCadastroComponent } from './modulos/board/analise-cadastro/analise-cadastro.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent,},
  { path: 'cadastro', component: CadastroComponent },
  { path: 'cadastroContratante', component: CadastroContratanteComponent },
  { path: 'cadastroPrestador', component: CadastroPrestadorComponent },
  { path: 'cadastroGestor', component: CadastroGestorComponent },
  { path: 'board', component: BoardComponent,canActivate: [AuthGuardService]  },
  { path: 'analiseCadastro', component: AnaliseCadastroComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
