import { Component, OnInit } from '@angular/core';
import { ColaboradorService } from 'src/app/services/colaborador.service';
declare var $:any;

@Component({
  selector: 'app-index-colaborador',
  templateUrl: './index-colaborador.component.html',
  styleUrls: ['./index-colaborador.component.css']
})
export class IndexColaboradorComponent implements OnInit {

  public token = localStorage.getItem('token');
  public colaboradores : Array<any> =[];
  public colaboradores_const : Array<any> =[];

  public filtro = '';
  public page = 1;
  public pageSize = 25;

  public load_estado = false;

  constructor(
    private _colaboradorSerive:ColaboradorService
  ) { }

  ngOnInit(): void {
    this.init_data();
  }

  init_data(){
    this._colaboradorSerive.listar_colaboradores_admin(this.token).subscribe(
      response=>{
        this.colaboradores = response.data;
        this.colaboradores_const = this.colaboradores;
        console.log(this.colaboradores);
        
      }
    );
  }

  filtrar(){
    if(this.filtro){
      var term = new RegExp(this.filtro,'i');
      this.colaboradores = this.colaboradores_const.filter(item=>term.test(item.nombres)||term.test(item.apellidos)||term.test(item.email)||term.test(item.dni));
    }else{
      this.colaboradores = this.colaboradores_const;
    }
  }

  set_state(id:any,estado:any){
    this.load_estado = true;
    this._colaboradorSerive.cambiar_estado_colaborador_admin(id,{estado:estado},this.token).subscribe(
      response=>{
        this.load_estado = false;
        $('#delete-'+id).modal('hide');
        this.init_data();
        
      }
    );
    
  }
}
