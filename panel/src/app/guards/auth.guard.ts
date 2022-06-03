import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TestService } from '../services/test.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
      //CREAMOS UNA INSTANCIA DE ROUTER PARA REDIRECCIONAR A OTRA RUTA A LOS QUE NO TENGAN PERMISO DE ACCESO
      private _router:Router,
      //INYECTAMOS DE NUESTRO SERVICIO QUE TIENE EL MÉTODO isAuthenticate()
      private _testService:TestService,
  ){}

  canActivate():any{
      //ACA LLAMAMOS A NUESTRO METODO EL CUAL NOS DEVUELVE UN TRUE O FALSE
      let access:any = this._testService.isAuthenticate();

      //VALIDAMOS SI NOS DEVUELVE UN FALSE REDIRECCIONAMOS A UNA RUTA
      if(!access){
          //REDIRECCION PARA USUARIOS NO PERMITIDOS
          this._router.navigate(['']);
      }

      //SI EL METODO DEVUELVE UN TRUE LLEGARA AQUI, EN ESTE PUNTO EL ACCESO A LA RUTA SERÁ PERMITIDA
      return true;
  }
}
