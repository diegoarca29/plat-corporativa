import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaborador.service';
declare var $:any;

@Component({
  selector: 'app-create-colaborador',
  templateUrl: './create-colaborador.component.html',
  styleUrls: ['./create-colaborador.component.css']
})
export class CreateColaboradorComponent implements OnInit {

  public colaborador : any = {
    genero: '',
    rol: '',
    pais: ''
  };
  public btn_registrar = false;
  public token : any = localStorage.getItem('token');

  constructor(
    private _colaboradorService:ColaboradorService,
    private _router:Router
  ) { }

  ngOnInit(): void {
  }

  registrar(registroForm:any){
   
    
    if(registroForm.valid){
      this.btn_registrar = true;
      this._colaboradorService.registro_colaborador_admin(this.colaborador,this.token).subscribe(
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
            $.notify('Se registro el nuevo colaborador.', { 
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
            this._router.navigate(['/colaborador']);
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
