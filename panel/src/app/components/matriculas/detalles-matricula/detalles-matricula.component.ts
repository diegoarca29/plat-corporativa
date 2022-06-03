import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { MatriculaService } from 'src/app/services/matricula.service';

@Component({
  selector: 'app-detalles-matricula',
  templateUrl: './detalles-matricula.component.html',
  styleUrls: ['./detalles-matricula.component.css']
})
export class DetallesMatriculaComponent implements OnInit {

  public id = '';
  public token = localStorage.getItem('token');
  public load_data = true;
  public data = false;

  public matricula : any = {};
  public detalles :Array<any>=[];
  public url = GLOBAL.url;

  constructor(
    private _matriculaService:MatriculaService,
    private _route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this._matriculaService.obtener_matricula_admin(this.id,this.token).subscribe(
          response=>{
            console.log(response);
            if(response.data == undefined){
              this.data = false;
            }else{
              this.data = true;
              this.matricula = response.data;
              this.detalles = response.detalles;
            }
            this.load_data = false;
          }
        ); 
      }
    );
  }

}
