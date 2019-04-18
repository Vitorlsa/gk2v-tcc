import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CadastroContratanteComponent } from './cadastro/cadastro-contratante/cadastro-contratante.component';
import { CadastroPrestadorComponent } from './cadastro/cadastro-prestador/cadastro-prestador.component';
import { CadastroGestorComponent } from './cadastro/cadastro-gestor/cadastro-gestor.component';


@NgModule({
  declarations: [LoginComponent, CadastroComponent, CadastroContratanteComponent, CadastroPrestadorComponent, CadastroGestorComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class LoginModule { }
