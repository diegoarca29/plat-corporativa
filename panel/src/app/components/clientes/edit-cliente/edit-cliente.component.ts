import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
declare var $:any;

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {

  public cliente : any = {
    genero: '',
    pais: ''
  };
  public btn_actualizar = false;
  public token : any = localStorage.getItem('token');
  public id = '';
  public load_data = true;
  public data = false;

  constructor(
    private _route:ActivatedRoute,
    private _clienteService:ClienteService,
    private _router:Router
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

  actualizar(actualizarForm:any){
    if(actualizarForm.valid){
      this.btn_actualizar = true;
      this._clienteService.editar_cliente_admin(this.id,this.cliente,this.token).subscribe(
        response=>{
          if(response.data == undefined){
            $.notify(response.message, { 
              type: 'danger',
              spacing: 10,                    
              timer: 2000,
              placement: {
                  from: 'top', 
                  align: 'right'
              },
              delay: 1000,
              animate: {
                  enter: 'animated ' + 'bounce',
                  exit: 'animated ' + 'bounce'
              }
            });
            this.btn_actualizar = false;
          }else{
            this.btn_actualizar = false;
            $.notify('Se actualizó el nuevo cliente.', { 
              type: 'success',
              spacing: 10,                    
              timer: 2000,
              placement: {
                  from: 'top', 
                  align: 'right'
              },
              delay: 1000,
              animate: {
                  enter: 'animated ' + 'bounce',
                  exit: 'animated ' + 'bounce'
              }
            });
            this._router.navigate(['/cliente']);
          }
        }
      );
    }else{
      $.notify('Complete correctamente el formulario', { 
        type: 'danger',
        spacing: 10,                    
        timer: 2000,
        placement: {
            from: 'top', 
            align: 'right'
        },
        delay: 1000,
        animate: {
            enter: 'animated ' + 'bounce',
            exit: 'animated ' + 'bounce'
        }
      });
    }
  }

}
