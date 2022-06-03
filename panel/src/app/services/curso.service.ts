import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";


@Injectable({
  providedIn: 'root'
})
export class CursoService {

  public url = GLOBAL.url;

  constructor(
    private _http:HttpClient
  ) { 
  }

  registro_cursobase_admin(data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Authorization':token});
    const fd = new FormData();
    fd.append('titulo',data.titulo);
    fd.append('descripcion',data.descripcion);
    fd.append('banner',data.banner);
    return this._http.post(this.url+'registro_cursobase_admin',fd,{headers:headers});
  }

  listar_cursos_admin(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_cursos_admin',{headers:headers});
  }

  obtener_datos_curso_admin(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_datos_curso_admin/'+id,{headers:headers});
  }

  actualizar_cursobase_admin(id:any,data:any,token:any):Observable<any>{
    if(data.banner != undefined){
      console.log(1);
      
      let headers = new HttpHeaders({'Authorization':token});
      const fd = new FormData();
      fd.append('titulo',data.titulo);
      fd.append('descripcion',data.descripcion);
      fd.append('banner',data.banner);
      return this._http.put(this.url+'actualizar_cursobase_admin/'+id,fd,{headers:headers});
    }else{
      console.log(2);
      
      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this._http.put(this.url+'actualizar_cursobase_admin/'+id,data,{headers:headers});
    }
  }

  cambiar_estado_curso_admin(id:any,data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'cambiar_estado_curso_admin/'+id,data,{headers:headers});
  }

  crear_ciclo_admin(data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'crear_ciclo_admin',data,{headers:headers});
  }

  listar_ciclos_admin(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_ciclos_admin/'+id,{headers:headers});
  }

  listar_ciclos_vencidos_admin(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_ciclos_vencidos_admin',{headers:headers});
  }

  obtener_datos_curso_ciclo_admin(id:any,idciclo:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_datos_curso_ciclo_admin/'+id+'/'+idciclo,{headers:headers});
  }

  editar_ciclo_admin(id:any,data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'editar_ciclo_admin/'+id,data,{headers:headers});
  }

  agregar_salon_ciclo_admin(data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'agregar_salon_ciclo_admin',data,{headers:headers});
  }

  obtener_salones_ciclo_admin(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_salones_ciclo_admin/'+id,{headers:headers});
  }

  eliminar_salon_ciclo_admin(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+'eliminar_salon_ciclo_admin/'+id,{headers:headers});
  }

  cambiar_estado_ciclo_admin(id:any,data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'cambiar_estado_ciclo_admin/'+id,data,{headers:headers});
  }

  listar_docentes_salon_admin(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_docentes_salon_admin/'+id,{headers:headers});
  }

  agregar_docente_salon_admin(data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'agregar_docente_salon_admin',data,{headers:headers});
  }

  eliminar_docente_salon_admin(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+'eliminar_docente_salon_admin/'+id,{headers:headers});
  }

  listar_cursosbase_modal_admin(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_cursosbase_modal_admin',{headers:headers});
  }
}
