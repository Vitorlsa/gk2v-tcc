import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CadastroContratanteComponent } from './cadastro/cadastro-contratante/cadastro-contratante.component';
import { CadastroPrestadorComponent } from './cadastro/cadastro-prestador/cadastro-prestador.component';
import { CadastroGestorComponent } from './cadastro/cadastro-gestor/cadastro-gestor.component';
import { CadastroPacienteComponent } from './cadastro/cadastro-paciente/cadastro-paciente.component';
import { NovoPacienteComponent } from './cadastro/cadastro-paciente/novo-paciente/novo-paciente.component';
import { ListapacienteComponent } from './cadastro/cadastro-paciente/listapaciente/listapaciente.component';
import { ModalEditarPacienteComponent } from '../modal/modal-editar-paciente/modal-editar-paciente.component';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  declarations: [LoginComponent, CadastroComponent, CadastroContratanteComponent, CadastroPrestadorComponent, CadastroGestorComponent, CadastroPacienteComponent, NovoPacienteComponent, ListapacienteComponent, ModalEditarPacienteComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxMaskModule.forRoot(),
  ]
})
export class LoginModule { }
