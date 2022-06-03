import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
declare var $:any;

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {

  public cliente : any = {
    genero: '',
    pais: ''
  };
  public btn_registrar = false;
  public token : any = localStorage.getItem('token');

  constructor(
    private _clienteService:ClienteService,
    private _router:Router
  ) { }

  ngOnInit(): void {
  }

  registrar(registroForm:any){
    console.log(registroForm);
    
    if(!registroForm.value.nombres){
      $.notify('Complete los nombres del cliente.', { 
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
    }else if(!registroForm.value.apellidos){
      $.notify('Complete los apellidos del cliente.', { 
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
    else if(!registroForm.value.email){
      $.notify('Complete el email del cliente.', { 
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
    }else if(!registroForm.value.genero){
      $.notify('Seleccione el genero del cliente.', { 
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
    }else if(!registroForm.value.telefono){
      $.notify('Ingrese el telefono del cliente.', { 
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
      this.btn_registrar = true;
      this.cliente.asesor = localStorage.getItem('_id');
      this._clienteService.registro_cliente_admin(this.cliente,this.token).subscribe(
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
            this.btn_registrar = false;
          }else{
            this.btn_registrar = false;
            $.notify('Se registro el nuevo cliente.', { 
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
    }
  }
}
