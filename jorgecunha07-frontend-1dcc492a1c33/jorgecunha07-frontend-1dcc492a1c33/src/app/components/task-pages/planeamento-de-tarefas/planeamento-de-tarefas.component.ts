import { Component } from '@angular/core';
import {PlaneamentoService} from "../../../IService/services/planeamento.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../IService/services/auth.service";


@Component({
  selector: 'app-planeamento-de-tarefas',
  templateUrl: './planeamento-de-tarefas.component.html',
  styleUrls: ['./planeamento-de-tarefas.component.scss']
})
export class PlaneamentoDeTarefasComponent {
  inicio = { edificio: '', piso: '', x: '', y: '' };
  fim = { edificio: '', piso: '', x: '', y: '' };
  resultado: any;

  constructor(private auth: AuthService,private router: Router,private someService: PlaneamentoService) {}

  onSubmit() {
    this.someService.findPath(this.inicio.edificio, this.inicio.piso, this.inicio.x, this.inicio.y, this.fim.edificio, this.fim.piso, this.fim.x, this.fim.y)
      .subscribe(
        data => {
          this.resultado = data;
        },
        error => {
          console.error(error);
        }
      );
  }

  resetForm() {
    this.inicio = { edificio: '', piso: '', x: '', y: '' };
    this.fim = { edificio: '', piso: '', x: '', y: '' };
    this.resultado = null;
  }

  goBack() {
    this.router.navigate(['modules']);
  }
}
