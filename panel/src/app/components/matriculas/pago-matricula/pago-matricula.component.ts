import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { MatriculaService } from 'src/app/services/matricula.service';
import { PagoService } from 'src/app/services/pago.service';
declare var $:any;
declare var printJS:any;

@Component({
  selector: 'app-pago-matricula',
  templateUrl: './pago-matricula.component.html',
  styleUrls: ['./pago-matricula.component.css']
})
export class PagoMatriculaComponent implements OnInit {

  public id = '';
  public token = localStorage.getItem('token');
  public load_data = true;
  public load_pagos = true;
  public data = false;

  public matricula : any = {};
  public detalles :Array<any>=[];
  public pagos :Array<any>=[];
  public url = GLOBAL.url;

  public pago:any={};
  public destino_pago ='';
  public load_btn = false;

  public total_payment = 0;

  constructor(
    private _route:ActivatedRoute,
    private _pagoService:PagoService,
    private _matriculaService:MatriculaService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this._matriculaService.obtener_matricula_admin(this.id,this.token).subscribe(
          response=>{

            if(response.data == undefined){
              this.data = false;
            }else{
              this.data = true;
              this.matricula = response.data;
              this.detalles = response.detalles;
              this.init_pagos();
            }
            this.load_data = false;
          }
        ); 
      }
    );
  }

  init_pagos(){
    this.load_pagos = true;
    this._pagoService.obtener_matricula_pagos_admin(this.id,this.token).subscribe(
      response=>{
        this.pagos = response.data;
        for(var item of this.pagos){
          this.total_payment = this.total_payment + item.monto;
        }
        this.load_pagos = false;
        console.log(this.pagos);
      }
    );
  }

  select_metodo(item:any){
    $('#dropdownMetodo').text(item);
    this.pago.metodo = item;
  }  

  select_banco(item:any){
    $('#dropdownBanco').text(item);
    this.pago.banco = item;
  }

  generar_pago(){
    this.pago.cliente = this.matricula.cliente._id;
    this.pago.matricula = this.id;
    this.pago.tipo = 'Matricula';
    this.pago.origen = 'Interno';
    this.pago.destino_pago = this.destino_pago;
    if(!this.destino_pago){
      $.notify('Seleccione el curso por favor.', { 
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
    else if(!this.pago.metodo){
      $.notify('Seleccione el metodo por favor.', { 
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
    }else if(!this.pago.banco){
      $.notify('Seleccione el banco por favor.', { 
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
    }else if(!this.pago.fecha){
      $.notify('Seleccione la fecha por favor.', { 
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
    }else if(!this.pago.transaccion){
      $.notify('Ingrese el codigo por favor.', { 
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
    }else if(!this.pago.monto){
      $.notify('Ingrese el monto por favor.', { 
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
      console.log(this.pago);
      this.load_btn = true;
      this._pagoService.crear_pago_admin(this.pago,this.token).subscribe(
        response=>{
          console.log(response);
          this.load_btn = false;
          $('#modalPago').modal('hide');

          $.notify('Se registro el pago correctamente.', { 
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
          this.init_pagos();
        }
      );
    }
    
  }

  imprimir_ticket(id:any){
    printJS({
      printable: 'contdiv-'+id,
      type: 'html',
     })
  }

}
