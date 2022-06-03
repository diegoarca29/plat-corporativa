import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatriculaService } from 'src/app/services/matricula.service';
import { I18nInterface } from "ngx-image-drawing";
import { TestService } from 'src/app/services/test.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var $:any;

@Component({
  selector: 'app-contrato-matricula',
  templateUrl: './contrato-matricula.component.html',
  styleUrls: ['./contrato-matricula.component.css']
})
export class ContratoMatriculaComponent implements OnInit {

  public id = '';
  public token = localStorage.getItem('token');
  public load_data = true;
  public data = false;
  public matricula : any = {};
  public i18n : I18nInterface = {
    saveBtn: 'Confirmar firma',
    sizes: {
      extra: 'Extra'
    }
  }
  public logotipo = '';
  public url = GLOBAL.url;

  constructor(
    private _matriculaService:MatriculaService,
    private _route:ActivatedRoute,
    private _testService:TestService
  ) {
    this.init_config();
   }

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

            }
            this.load_data = false;
          }
        ); 
      }
    );
  }

  save(event:any){
    console.log(event);
    var reader = new FileReader();
    reader.readAsDataURL(event);
    reader.onloadend = ()=>{
      var img = reader.result;
      console.log(img);
      $('#firma_img').val(img);
      let firma = $('#firma_img').val();
      this._matriculaService.firmar_matricula_admin(this.id,{firma:firma},this.token).subscribe(
        response=>{
          $.notify('Se firmó correctamente el contrato.', { 
            type: 'success',
            spacing: 10,                    
            timer: 2000,
            placement: {
                from: 'top', 
                align: 'right'
            },
            delay: 1000,
            animate: {
                enter: 'animated ' + 'bounce',
                exit: 'animated ' + 'bounce'
            }
          });
          window.location.reload();
        }
      );
    }
  }

  cancel(){

  }

  init_config(){
    this._testService.obtener_configuracion_general(localStorage.getItem('token')).subscribe(
      response=>{
        this.logotipo = response.data.logo;
 
      }
    );
  }

}
