import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) { }


  users: object;

  ngOnInit() {
    this.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    }
    );
  };


  getUsers() {
    return this.http.get('https://reqres.in/api/users')
  }

}

