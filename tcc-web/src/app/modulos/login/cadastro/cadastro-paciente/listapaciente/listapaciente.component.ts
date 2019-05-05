import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listapaciente',
  templateUrl: './listapaciente.component.html',
  styleUrls: ['./listapaciente.component.scss']
})
export class ListapacienteComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    alert("lista pacientes");
  }

  novoPaciente(){
      this.router.navigate(['novoPaciente'])
  }

}
