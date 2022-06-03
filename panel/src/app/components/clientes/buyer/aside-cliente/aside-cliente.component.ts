import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-aside-cliente',
  templateUrl: './aside-cliente.component.html',
  styleUrls: ['./aside-cliente.component.css']
})
export class AsideClienteComponent implements OnInit {

  public id = '';
  public load_data = true;
  public token = localStorage.getItem('token');
  public cliente:any = {};
  public data = false;

  constructor(
    private _route:ActivatedRoute,
    private _clienteService:ClienteService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params =>{
        
        this.id = params['id'];
        this.load_data = true;
        this._clienteService.obtener_datos_cliente_admin(this.id,this.token).subscribe(
          response=>{
            if(response.data != undefined){
              this.cliente = response.data;
              this.data = true;
              this.load_data = false;
            }else{
              this.data = false;
              this.load_data = false;
            }
          }
        );

      }
    );
  }

}
