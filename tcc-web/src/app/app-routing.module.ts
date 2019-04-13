import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modulos/login/login/login.component';
import { CadastroComponent } from './modulos/login/cadastro/cadastro.component';
import { HomeComponent } from './modulos/home/home.component';
import { BoardComponent } from './modulos/board/board.component';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent,},
  { path: 'cadastro', component: CadastroComponent },
  { path: 'board', component: BoardComponent,canActivate: [AuthGuardService]  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
