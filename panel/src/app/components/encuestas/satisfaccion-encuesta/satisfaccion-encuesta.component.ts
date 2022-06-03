import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jwt_decode from "jwt-decode";
import { ClienteService } from 'src/app/services/cliente.service';
declare var $:any;

@Component({
  selector: 'app-satisfaccion-encuesta',
  templateUrl: './satisfaccion-encuesta.component.html',
  styleUrls: ['./satisfaccion-encuesta.component.css']
})
export class SatisfaccionEncuestaComponent implements OnInit {

  public token_route = '';
  public data :any = {};
  public expiracion = false;
  public send = false;

  public answer_one = '';
  public answer_two = '';
  public answer_three = '';
  public answer_four = '';
  public answer_five = '';
  public answer_six = '';

  constructor(
    private _route:ActivatedRoute,
    private _clienteService:ClienteService
  ) {

    
   }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        
        this.token_route = params['token'];
        this.data = jwt_decode(this.token_route);
        console.log(this.data);
        
        let today_timestamps = Date.parse(new Date().toString())/1000;
        if(today_timestamps > this.data.exp){
          this.expiracion = true;
        }else{
          this.expiracion = false;
        }
        console.log(today_timestamps);
      }
    );
  }

  enviar_encuesta(){
      if(!this.answer_one){
        $.notify('Responda la pregunta uno por favor.', { 
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
      }else if(!this.answer_two){
        $.notify('Responda la pregunta dos por favor.', { 
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
      }else if(!this.answer_three){
        $.notify('Responda la pregunta tres por favor.', { 
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
      }else if(!this.answer_four){
        $.notify('Responda la pregunta cuarta por favor.', { 
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
      }else if(!this.answer_five){
        $.notify('Responda la pregunta cinco por favor.', { 
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
      }else if(!this.answer_six){
        $.notify('Responda la pregunta seis por favor.', { 
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
          let data = {
            answer_one : this.answer_one,
            answer_two : this.answer_two,
            answer_three : this.answer_three,
            answer_four : this.answer_four,
            answer_five : this.answer_five,
            answer_six : this.answer_six,
            matricula: this.data.matricula,
            cliente: this.data.cliente,
          }

          this._clienteService.enviar_encuesta_admin(data).subscribe(
            response=>{
              console.log(response);
              if(response.data != undefined){
                $.notify('Se envio la encuesta correctamente.', { 
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
                this.send = true;
              }else{
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
              }

            }
          );
      }
  }

}
