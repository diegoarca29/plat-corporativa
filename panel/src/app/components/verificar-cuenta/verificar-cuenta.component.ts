import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-verificar-cuenta',
  templateUrl: './verificar-cuenta.component.html',
  styleUrls: ['./verificar-cuenta.component.css']
})
export class VerificarCuentaComponent implements OnInit {

  public token = '';
  public load = true;
  public msm = '';

  constructor(
    private _route:ActivatedRoute,
    private _clienteService:ClienteService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.token = params['token'];
        
        if(this.token){
          
          this._clienteService.validar_correo_verificacion(this.token).subscribe(
            response=>{
              console.log(response);
              if(response.data != undefined){
                this.msm = 'La cuenta fue verificada correctamente';
              }
              else{
                this.msm = response.message;
              }
              this.load = false;
            }
          );
        }
        
      }
    );
  }

}
