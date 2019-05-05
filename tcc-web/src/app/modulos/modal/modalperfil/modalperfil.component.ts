import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { UsuarioEnum } from 'src/app/enum/usuario-enum.enum';

@Component({
  selector: 'app-modalperfil',
  templateUrl: './modalperfil.component.html',
  styleUrls: ['./modalperfil.component.scss']
})
export class ModalperfilComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  //enum
  public tipoU: UsuarioEnum;

  @Output()
  pSelect = new EventEmitter<any>();


  ngOnInit() {
    $('.modal-open').prop('checked', true);

    this.tipoU = this.loginService.getSessionPerfil();
    console.log(this.tipoU);
  }

  fecha() {
    $('.modal-open').prop('checked', false);
    this.loginService.atualizaPerfilAtual();
  }

  selecionaPerfil(tipouser) {
    this.loginService.setPerfil(tipouser);
    //this.pSelect = tipouser;
    this.childDoParent(tipouser);
  }

  childDoParent(param) {
    this.pSelect.emit(param);
  }


}
