import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-show-encuesta-matricula',
  templateUrl: './show-encuesta-matricula.component.html',
  styleUrls: ['./show-encuesta-matricula.component.css']
})
export class ShowEncuestaMatriculaComponent implements OnInit {

  public id = '';
  public token = localStorage.getItem('token');

  public load_data = true;
  public data = false;

  public encuesta : any = {};

  constructor(
    private _route:ActivatedRoute,
    private _clienteService:ClienteService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this.init_encuesta();
      }
    );
  }

  init_encuesta(){
    this.load_data = true;
    this._clienteService.obtener_encuesta_cliente_admin(this.id,this.token).subscribe(
      response=>{
        if(response.data != undefined){
          this.data = true;
          this.encuesta = response.data;
        }else{
          this.data = false;
        }

        this.load_data = false;
      }
    );
  }

}
