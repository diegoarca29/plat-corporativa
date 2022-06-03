import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";


@Injectable({
  providedIn: 'root'
})
export class VentaService {

  public url = GLOBAL.url;

  constructor(
    private _http:HttpClient
  ) { 
    console.log(this.url);
    
  }

  obtener_variedades_admin(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_variedades_admin',{headers:headers});
  }

  generar_venta_admin(data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'generar_venta_admin',data,{headers:headers});
  }

  obtener_ventas_hoy(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_ventas_hoy',{headers:headers});
  }

  
  obtener_ventas_fechas(inicio:any,hasta:any,asesor:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_ventas_fechas/'+inicio+'/'+hasta+'/'+asesor,{headers:headers});
  }

}
