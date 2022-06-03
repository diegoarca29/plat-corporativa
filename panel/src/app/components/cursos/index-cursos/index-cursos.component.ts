import { Component, OnInit } from '@angular/core';
import { CursoService } from 'src/app/services/curso.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var $:any;

@Component({
  selector: 'app-index-cursos',
  templateUrl: './index-cursos.component.html',
  styleUrls: ['./index-cursos.component.css']
})
export class IndexCursosComponent implements OnInit {

  public token = localStorage.getItem('token');
  public cursos:Array<any>=[];
  public url = GLOBAL.url;
  public load_estado = false;

  constructor(
    private _cursoService:CursoService
  ) { }

  ngOnInit(): void {
    this.init_data();
  }

  init_data(){
    this._cursoService.listar_cursos_admin(this.token).subscribe(
      response=>{

        this.cursos = response.data;
      }
    );
  }

  set_state(id:any,estado:any){
    this.load_estado = true;
    this._cursoService.cambiar_estado_curso_admin(id,{estado:estado},this.token).subscribe(
      response=>{
        this.load_estado = false;
        $('#state-'+id).modal('hide');
        this.init_data();
        
      }
    );
    
  }

}
