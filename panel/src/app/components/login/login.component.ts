import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaborador.service';
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user : any = {
    email: '',
    password: ''
  };
  public token :any = localStorage.getItem('token');

  constructor(
    private _colaboradorService:ColaboradorService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    if(this.token){
      this._router.navigate(['/dashboard']);
    }
  }

  login(){
    if(!this.user.email){
      $.notify('Debe ingresar el correo electrónico', { 
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
    }else if(!this.user.password){
      $.notify('Debe ingresar la contraseña', { 
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
      this._colaboradorService.login_admin(this.user).subscribe(
        response=>{
          console.log(response);
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
          }else{
            localStorage.setItem('token',response.token);
            localStorage.setItem('user',JSON.stringify(response.data));
            localStorage.setItem('_id',response.data._id);
            this._router.navigate(['/dashboard']);
          }
        }
      );
    }
  }

}
