import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
	cookieValue: string;

  constructor(private cookieService: CookieService	) { }

public banner1 = "images/banner01.png";


  ngOnInit() {


		this.cookieValue = this.cookieService.get('Test');

    console.log(this.cookieValue);



    var	$window = $(window),
			$body = $('body'),
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
