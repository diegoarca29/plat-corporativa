import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  public url = GLOBAL.url;

  constructor(
    private _http:HttpClient
  ) { 
    console.log(this.url);
    
  }


  obtener_configuracion_general(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_configuracion_general',{headers:headers});
  }

  actualizar_configuracion_general_admin(data:any,token:any):Observable<any>{

    if(data.logo != undefined){
      let headers = new HttpHeaders({'Authorization':token});
      const fd = new FormData();
      fd.append('razon_social',data.razon_social);
      fd.append('slogan',data.slogan);
      fd.append('background',data.background);
      fd.append('canales',data.canales);
      fd.append('categoria',data.categoria);
      fd.append('logo',data.logo);
      return this._http.put(this.url+'actualizar_configuracion_general_admin',fd,{headers:headers});
    }else{

      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this._http.put(this.url+'actualizar_configuracion_general_admin',data,{headers:headers});
    }
  }

  actualizar_configuracion_finanzas_admin(data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'actualizar_configuracion_finanzas_admin',data,{headers:headers});
  }

  obtener_configuracion_finanza(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_configuracion_finanza',{headers:headers});
  }

  verificar_token(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'verificar_token',{headers:headers});
  }

  isAuthenticate(){
    //ACA OBTENEMOS NUESTRO TOKEN DEL LOCALSTORAGE DEL NAVEGADOR
    const token : any = localStorage.getItem('token');

    try {
        //CREAMOS LA INSTANCIA DEL PAQUETE
        const helper = new JwtHelperService();
        //USAMOS EL METODO decodeToken PARA DECODIFICAR EL TOKEN
        var decodedToken = helper.decodeToken(token);

        //VALIDARMOS SI TENEMOS UN TOKEN EN EL LOCALSTORAGE
        if(!token){
            localStorage.clear();
            return false;
        }

        //VALIDAMOS SI EL TOKEN ES INCORRECTO ES DECIR NO CUMPLE CON EL ESTANDAR DE LAS 3 PARTES
        /* if(!decodedToken){
            localStorage.clear();
            return false;
        } */

        //VALIDAMOS SI EL TOKEN EXPIRÓ
        if(helper.isTokenExpired(token)){
            localStorage.clear();
            return false;
        }

    } catch (error) {
        //CAPTURAMOS ALGUN ERROR DURANTE EL TRY
        console.log(error);
        
        localStorage.clear();
        return false;
    }

   return true;
}
}
