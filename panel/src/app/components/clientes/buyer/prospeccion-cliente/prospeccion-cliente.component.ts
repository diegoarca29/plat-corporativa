import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-prospeccion-cliente',
  templateUrl: './prospeccion-cliente.component.html',
  styleUrls: ['./prospeccion-cliente.component.css']
})
export class ProspeccionClienteComponent implements OnInit {

  public id = '';
  public page = 1;
  public pageSize = 25;
  public token = localStorage.getItem('token');
  public data = false;
  public load_data = true;

  public actividades :Array<any> = [];

  constructor(
    private _route:ActivatedRoute,
    private _clienteService:ClienteService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params =>{
        
        this.id = params['id'];
        this._clienteService.obtener_datos_cliente_admin(this.id,this.token).subscribe(
          response=>{
            if(response.data != undefined){
              this.data = true;
              this.load_data = false;
              this.init_data();
            }else{
              this.data = false;
              this.load_data = false;
            }
          }
        );

      }
    );
  }

  init_data(){
    this._clienteService.listar_actividades_prospeccion_admin(this.id,this.token).subscribe(
      response=>{
        this.actividades = response.data;
      }
    );
  }

}
