import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import $ from 'node_modules/jquery'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irLogin() {
    this.router.navigate(['/login']);
  }


  scrollDiv() {
    console.log("log:" + $(window).height())
    $('html, body').animate({
      scrollTop: $("#div1").offset().top
    }, 2000);
  }

}
