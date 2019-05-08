import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../login/login.service';
import { UtilsService } from 'src/app/funcoes/utils.service';
import { UsuarioEnum } from 'src/app/enum/usuario-enum.enum';


@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

	serviceContext: LoginService;


	constructor(private service: LoginService, private util: UtilsService) {
		this.serviceContext = service;
	}

	public perfilsUsuario = null;
	public usuaEnum:UsuarioEnum;


	@Input()
	perfilSelecionado = null;


	pegaPerfilSelecionado() {
		this.perfilSelecionado = this.serviceContext.getPerfil();
		sessionStorage.setItem('tipoPerfil', JSON.stringify(this.perfilSelecionado));
	}



	ngOnInit() {
		// 	if (this.util.nullOrUndef(this.perfilSelecionado)) {
		// 		if (!this.util.nullOrUndef(sessionStorage.getItem('tipoPerfil'))) {
		// 			this.perfilSelecionado = sessionStorage.getItem('tipoPerfil');
		// 		}
		// 	}
		

		this.perfilsUsuario = this.service.getSessionPerfil();
		if (this.perfilsUsuario.length == 1)
			this.perfilSelecionado = this.perfilsUsuario[0];

		var $window = $(window),
			$header = $('#header'),
			$footer = $('#footer');

		// Header.
		$header.each(function () {
			var t = jQuery(this),
				button = t.find('.button');
			button.click(function (e) {
				t.toggleClass('hide');
				if (t.hasClass('preview')) {
					return true;
				} else {
					e.preventDefault();
				}
			});
		});

		$footer.each(function () {
			var t = jQuery(this),
				inner = t.find('.inner'),
				button = t.find('.info');
			button.click(function (e) {
				t.toggleClass('show');
				e.preventDefault();
			});

		});
	}
}
