import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { Usuario } from 'src/app/classes/usuario';
import { Gestor } from 'src/app/classes/gestor';
import { Prestador } from 'src/app/classes/prestador';
import { CadastroServiceService } from '../../login/cadastro/cadastro-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private service: LoginService, private cadastroService: CadastroServiceService) { }

  public perfilLogado = null;
  public usuario = null;
  public api = "http://localhost:8080/api/contratante/cadastrar";
  private apiDados = "http://localhost:8080/api/usuario/dadoscadastrais";
  public usuaLogado = this.service.getUsuario();


  ngOnInit() {
    this.perfilLogado = this.service.getSessionPerfil()
    console.log(this.perfilLogado);

    if (this.perfilLogado == 2) {
      this.usuario = new Usuario();
    } else if (this.perfilLogado == 3) {
      this.usuario = new Gestor();
    } else if (this.perfilLogado == 4) {
      this.usuario = new Prestador();
    }

    this.buscarDados();
  }

  setSexo(event) {
    this.usuario.setSexo(event.target.value);
  }

  setTermos() {
    this.usuario.setTermos(true);
  }

  salvar() {
    this.setTermos();
    if (this.cadastroService.validaCadastro(this.usuario)) {
      this.http.post(this.api, this.usuario).subscribe(
        res => {
          alert("Cadastro salvo com sucesso");
          this.cadastroService.setContratantePaciente(this.usuario);
        },
        err => {
          console.log(err);
        });
    }
  }

  buscarDados() {
    this.http.post(this.apiDados, {Id: this.usuaLogado.id}).subscribe(
      res => {
        this.usuario = res;
      },
      err => {
        console.log(err);
      });

  }


  cancelar() {
    this.router.navigate(['/cadastro']);
  }

}

