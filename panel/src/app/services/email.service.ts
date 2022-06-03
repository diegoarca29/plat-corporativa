import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  public url = GLOBAL.url;

  constructor(
    private _http:HttpClient
  ) { 
  }

  obtener_listas_contactos(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_listas_contactos',{headers:headers});
  }

  regitrar_lista_contacto(data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'regitrar_lista_contacto',data,{headers:headers});
  }

  importar_contactos(data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'importar_contactos',data,{headers:headers});
  }

  obtener_contactos_lista(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_contactos_lista/'+id,{headers:headers});
  }

  eliminar_lista_contacto(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+'eliminar_lista_contacto/'+id,{headers:headers});
  }

  obtener_campaigns(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_campaigns',{headers:headers});
  }

  crear_campaign(data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'crear_campaign',data,{headers:headers});
  }

  send_email_campaign(data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'send_email_campaign',data,{headers:headers});
  }
}
