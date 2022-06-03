import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
declare var $:any;

@Component({
  selector: 'app-correos-cliente',
  templateUrl: './correos-cliente.component.html',
  styleUrls: ['./correos-cliente.component.css']
})
export class CorreosClienteComponent implements OnInit {

  public id = '';
  public token = localStorage.getItem('token');
  public data = false;
  public load_data = true;

  public correo:any={};
  public btn_enviar = false;

  public correos :Array<any> = [];
  public page = 1;
  public pageSize = 25;

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
    //
    this._clienteService.listar_correos_prospeccion_admin(this.id,this.token).subscribe(
      response=>{
        this.correos = response.data;
      }
    );
  }

  enviar_correo(){
    console.log(this.correo);
    if(!this.correo.asunto){
      $.notify('Ingrese el asunto del correo', { 
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
    }else if(!this.correo.contenido){
      $.notify('Ingrese el contenido del correo', { 
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
    else{
      this.btn_enviar = true;
      this.correo.cliente = this.id;
      this.correo.asesor = localStorage.getItem('_id');
      this._clienteService.crear_correo_prospeccion_admin(this.correo,this.token).subscribe(
        response=>{
          $('#modalCorreo').modal('hide');
          this.btn_enviar = false;
          this.init_data();
          this.correo={};
          $.notify('Se envio el correo al cliente.', { 
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
        }
      );
    }
  }

  toggleEmail(id:any){
    var clase = $('#card_'+id).attr('class');

    if(clase=='card-spacer-x pt-2 pb-5 toggle-off-item'){
      $('#card_'+id).removeClass('toggle-off-item');
      $('#card_'+id).addClass('toggle-on-item');
    }else if(clase=='card-spacer-x pt-2 pb-5 toggle-on-item'){
      $('#card_'+id).removeClass('toggle-on-item');
      $('#card_'+id).addClass('toggle-off-item');
    }
 }

}
