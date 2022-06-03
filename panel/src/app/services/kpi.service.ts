import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";

@Injectable({
  providedIn: 'root'
})
export class KpiService {

  public url = GLOBAL.url;

  constructor(
    private _http:HttpClient
  ) { 
    console.log(this.url);
    
  }


  kpi_pagos_mensuales(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'kpi_pagos_mensuales',{headers:headers});
  }

  kpi_prospectos_mensuales(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'kpi_prospectos_mensuales',{headers:headers});
  }

  kpi_prospectos_genero(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'kpi_prospectos_genero',{headers:headers});
  }

  kpi_pagos_tipo(year:any,month:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'kpi_pagos_tipo/'+year+'/'+month,{headers:headers});
  }

  kpi_metodos_pago(year:any,month:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'kpi_metodos_pago/'+year+'/'+month,{headers:headers});
  }

  kpi_curso_ganancia(year:any,month:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'kpi_curso_ganancia/'+year+'/'+month,{headers:headers});
  }
}
