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
    $('html, body').animate({
      scrollTop: $("#one").offset().top
    }, 2000);
  }

}
