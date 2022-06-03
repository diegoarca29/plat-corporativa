import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';
declare var $:any;
import { GLOBAL } from 'src/app/services/GLOBAL';

@Component({
  selector: 'app-vencidos-ciclo',
  templateUrl: './vencidos-ciclo.component.html',
  styleUrls: ['./vencidos-ciclo.component.css']
})
export class VencidosCicloComponent implements OnInit {

  public data = false;
  public load_data = true;
  public token = localStorage.getItem('token');
  public id = '';
  public ciclos :Array<any> = [];
  public ciclos_const :Array<any> = [];
  public url = GLOBAL.url;
  public filtro = 'Todos';

  constructor(
    private _route:ActivatedRoute,
    private _cursoService:CursoService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this._cursoService.obtener_datos_curso_admin(this.id,this.token).subscribe(
          response=>{
            if(response.data != undefined){
              this.data = true;
              this.load_data = false;
              this.init_data();
            }else{
              this.data = false;
              this.load_data = false;
            }
          }
        );
      }
    );
  }

  init_data(){
    this._cursoService.listar_ciclos_vencidos_admin(this.token).subscribe(
      response=>{
        this.ciclos = response.data;
        this.ciclos_const = this.ciclos;
      }
    );
  }

  filtrar(){
      if(this.filtro === 'Todos'){
        this.ciclos = this.ciclos_const;
      }else{
        this.ciclos = this.ciclos_const.filter(item=>item.ciclo.nivel == this.filtro);
      }
  }

}
