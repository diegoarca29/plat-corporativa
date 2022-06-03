import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
declare var $:any;

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {

  public token = localStorage.getItem('token');
  public clientes : Array<any> =[];
  public clientes_const : Array<any> =[];

  public filtro = '';
  public page = 1;
  public pageSize = 25;

  public load_estado = false;
  public load_data = false;

  constructor(
    private _clienteService:ClienteService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe(
      (params:Params)=>{
        this.filtro = params.filter;
        if(this.filtro){
            this.filtrar();
        }else{
          this.clientes = [];
        }
      }
    );
  }

  init_data(){
    if(this.filtro){
      this._router.navigate(['/cliente'], {queryParams: {filter: this.filtro}});
    }else{
      this._router.navigate(['/cliente']);
    }
  }

  filtrar(){
    if(this.filtro){
      this.load_data = true;
      this._clienteService.listar_clientes_admin(this.filtro,this.token).subscribe(
        response=>{
          this.clientes = response.data;
          this.load_data = false;
          console.log(this.clientes);
          
        }
      );
    }else{
      this.clientes = [];
    }
  }

  set_state(id:any,estado:any){
    this.load_estado = true;
    this._clienteService.cambiar_estado_cliente_admin(id,{estado:estado},this.token).subscribe(
      response=>{
        this.load_estado = false;
        $('#delete-'+id).modal('hide');
        this.filtrar();
        
      }
    );
    
  }
}
