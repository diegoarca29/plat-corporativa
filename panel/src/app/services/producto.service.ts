import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";



@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url = GLOBAL.url;

  constructor(
    private _http:HttpClient
  ) { 
    console.log(this.url);
    
  }


  obtener_configuraciones():Observable<any>{
    return this._http.get('./assets/configuraciones.json');
  }

  crear_producto_admin(data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Authorization':token});
    const fd = new FormData();
    fd.append('titulo',data.titulo);
    fd.append('categoria',data.categoria);
    fd.append('tipo',data.tipo);
    fd.append('tipo_variedad',data.tipo_variedad);
    fd.append('descripcion',data.descripcion);
    fd.append('portada',data.portada);
    return this._http.post(this.url+'crear_producto_admin',fd,{headers:headers});
  }

  listar_productos_admin(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_productos_admin',{headers:headers});
  }

  obtener_datos_producto_admin(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_datos_producto_admin/'+id,{headers:headers});
  }

  actualizar_producto_admin(id:any,data:any,token:any):Observable<any>{
    if(data.portada != undefined){

      let headers = new HttpHeaders({'Authorization':token});
      const fd = new FormData();
      fd.append('titulo',data.titulo);
      fd.append('descripcion',data.descripcion);
      fd.append('tipo',data.tipo);
      fd.append('tipo_variedad',data.tipo_variedad);
      fd.append('categoria',data.categoria);
      fd.append('portada',data.portada);
      return this._http.put(this.url+'actualizar_producto_admin/'+id,fd,{headers:headers});
    }else{

      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this._http.put(this.url+'actualizar_producto_admin/'+id,data,{headers:headers});
    }
  }

  agregar_variedad_producto_admin(data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'agregar_variedad_producto_admin',data,{headers:headers});
  }

  obtener_variedades_producto_admin(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_variedades_producto_admin/'+id,{headers:headers});
  }

  eliminar_variedad_producto_admin(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+'eliminar_variedad_producto_admin/'+id,{headers:headers});
  }

  listar_productos_titulo_admin(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_productos_titulo_admin',{headers:headers});
  }

  registrar_inventario_admin(data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'registrar_inventario_admin',data,{headers:headers});
  }

  listar_inventario_admin(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_inventario_admin',{headers:headers});
  }

  cambiar_estado_producto_admin(id:any,data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'cambiar_estado_producto_admin/'+id,data,{headers:headers});
  }

  obtener_inventario_admin(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_inventario_admin',{headers:headers});
  }

  obtener_inventario_entrada_admin(year:any,month:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_inventario_entrada_admin/'+year+'/'+month,{headers:headers});
  }

  obtener_inventario_salida_admin(year:any,month:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_inventario_salida_admin/'+year+'/'+month,{headers:headers});
  }

}
