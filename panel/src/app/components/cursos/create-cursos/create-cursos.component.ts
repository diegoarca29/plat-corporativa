import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';
declare var $:any;

@Component({
  selector: 'app-create-cursos',
  templateUrl: './create-cursos.component.html',
  styleUrls: ['./create-cursos.component.css']
})
export class CreateCursosComponent implements OnInit {

  public curso :any = {};
  public banner :File|any = undefined;
  public token = localStorage.getItem('token');
  public btn_load = false;

  constructor(
    private _cursoService:CursoService,
    private _router:Router
  ) { }

  ngOnInit(): void {
  }

  registro(){
    if(!this.curso.titulo){
      $.notify('Ingrese el titulo del curso.', { 
        type: 'danger',
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
    }else if(!this.curso.descripcion){
      $.notify('Ingrese la descripcion del curso.', { 
        type: 'danger',
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
    }else if(this.banner == undefined){
      $.notify('Ingrese la portada del curso.', { 
        type: 'danger',
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
    }else{
      this.btn_load = true;
      this._cursoService.registro_cursobase_admin(this.curso,this.token).subscribe(
        response=>{
          console.log(response);
          this.btn_load = false;
          $.notify('Se registro el curso correctamente.', { 
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
          this._router.navigate(['/cursos']);
        }
      );
    }
    
  }

  fileEventChange(event:any):void{
    
    var file : any;

    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0];
      console.log(file);
      
      if(file.size <= 200000){
        if(file.type == 'image/jpeg'||file.type == 'image/png'||file.type == 'image/webp'||file.type == 'image/jpg'){
          this.banner = file;
          this.curso.banner = this.banner;
        }else{
          $.notify('Solo se permite la seleccion de imagen.', { 
            type: 'danger',
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
          this.banner = undefined;
        }
      }else{
        $.notify('La imagen no debe superar los 2MB', { 
          type: 'danger',
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
        this.banner = undefined;
      }
    }

  
  }

}
