import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
	cookieValue: string;
	serviceContext:LoginService;
  constructor(private cookieService: CookieService, private service:LoginService	) {
		 this.serviceContext = service;
	 }


@Input()
perfilSelecionado = null; 


pegaPerfilSelecionado(){
	this.perfilSelecionado = this.serviceContext.getPerfil();
}



ngOnInit() {
	//this.serviceContext.perfilAtual(this.pegaPerfilSelecionado);

	var	$window = $(window),
			$header = $('#header'),
      $footer = $('#footer');
      
      // Header.
			$header.each( function() {
				var t 		= jQuery(this),
					button 	= t.find('.button');
				button.click(function(e) {
					t.toggleClass('hide');
					if ( t.hasClass('preview') ) {
						return true;
					} else {
						e.preventDefault();
					}
				});
			});

			$footer.each( function() {
				var t 		= jQuery(this),
					inner 	= t.find('.inner'),
					button 	= t.find('.info');
				button.click(function(e) {
					t.toggleClass('show');
					e.preventDefault();
				});

			});
	}
}
