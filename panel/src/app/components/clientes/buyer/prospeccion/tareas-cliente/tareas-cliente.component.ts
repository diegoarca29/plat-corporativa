import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var $:any;

@Component({
  selector: 'app-tareas-cliente',
  templateUrl: './tareas-cliente.component.html',
  styleUrls: ['./tareas-cliente.component.css']
})
export class TareasClienteComponent implements OnInit {

  public token = localStorage.getItem('token');
  public id = '';
  public data = false;
  public load_data = true;

  public tarea:any ={
    asesor: '',
    tipo: '',
    prioridad: ''
  };

  public asesores :Array<any> = [];
  public time = {hour: 13, minute: 30};
  public btn_crear = false;
  public str_today = GLOBAL.str_today;
  public tareas:Array<any>=[];
  public page = 1;
  public pageSize = 25;
  public btn_marcar = false;

  constructor(
    private _route:ActivatedRoute,
    private _clienteService:ClienteService,
    private _colaboradorService:ColaboradorService
  ) { 
    console.log(this.str_today);
    
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params =>{
        
        this.id = params['id'];
        this._clienteService.obtener_datos_cliente_admin(this.id,this.token).subscribe(
          response=>{
            if(response.data != undefined){
              this.data = true;
              this.load_data = false;
              this.init_asesores();
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

  init_asesores(){
    this._colaboradorService.listar_asesores_admin(this.token).subscribe(
      response=>{
        this.asesores = response.data;
      }
    );
  }

  init_data(){
    this._clienteService.listar_tarea_prospeccion_admin(this.id,this.token).subscribe(
      response=>{
        this.tareas = response.data;
        console.log(this.tareas);
        
      }
    )
  }

  registrar(){
    if(this.time||this.time!=undefined||this.time != null){
      this.tarea.hora = this.time.hour + ':'+ this.time.minute;
    }

    if(!this.tarea.asesor){
      $.notify('Seleccione el asesor.', { 
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
    }else if(!this.tarea.tarea){
      $.notify('Ingrese la tarea.', { 
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
    }else if(!this.tarea.fecha){
      $.notify('Seleccione la fecha de la tarea.', { 
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
    }else if(!this.tarea.hora){
      $.notify('Seleccione la hora de la tarea.', { 
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
    }else if(!this.tarea.tipo){
      $.notify('Seleccione el tipo de la tarea.', { 
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
    }else if(!this.tarea.prioridad){
      $.notify('Seleccione la prioridad de la tarea.', { 
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
    }else{
      this.btn_crear = true;
      this.tarea.cliente = this.id;
      this._clienteService.crear_tarea_prospeccion_admin(this.tarea,this.token).subscribe(
        response=>{
          $('#modalTarea').modal('hide');
          this.btn_crear = false;
          this.init_data();
          this.tarea ={
            asesor: '',
            tipo: '',
            prioridad: ''
          };
          $.notify('Se registró la tarea.', { 
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

  marcar(id:any){
    this.btn_marcar = true;
    this._clienteService.marcar_tarea_prospeccion_admin(id,this.token).subscribe(
      response=>{
        this.btn_marcar = false;
        $('#modalHecho-'+id).modal('hide');
        this.init_data();
        $.notify('Se marco la tarea como realizada.', { 
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
