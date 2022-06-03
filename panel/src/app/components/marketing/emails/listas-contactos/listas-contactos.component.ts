import { Component, OnInit } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';
declare var $:any;

@Component({
  selector: 'app-listas-contactos',
  templateUrl: './listas-contactos.component.html',
  styleUrls: ['./listas-contactos.component.css']
})
export class ListasContactosComponent implements OnInit {

  public token = localStorage.getItem('token');
  public listas :Array<any> = [];
  public load_data = true;

  public name_list = '';
  public str_import = '';
  public str_idlist = '';
  public btn_load = false;
  public btn_load_import = false;

  public contactos :Array<any> = [];
  public load_contactos= true;
  public load_delete = false;

  constructor(
    private _emailService:EmailService
  ) { }

  ngOnInit(): void {
    this.init_data();
  }

  init_data(){
    this.load_data = true;
    this._emailService.obtener_listas_contactos(this.token).subscribe(
      response=>{
        console.log();
        
        this.listas = response.data.lists;
        console.log(this.listas);
        this.load_data = false;
      }
    );
  }

  crear_lista(){
    this.btn_load = true;
    this._emailService.regitrar_lista_contacto({titulo:this.name_list},this.token).subscribe(
      response=>{
        $('#createList').modal('hide');
        this.init_data();

        this.btn_load = false;
      }
    );
  }

  openImport(id:any){
    this.str_idlist = id;
    console.log(this.str_idlist);
    
  }

  obtenerContatos(id:any){
    this.load_contactos = true;
    this._emailService.obtener_contactos_lista(id,this.token).subscribe(
      response=>{
       
        this.contactos = response.data.contacts;
        this.load_contactos = false;
      }
    );
  }

  importar_contactos(){
    let data = {
      str_import: this.str_import,
      idlist: this.str_idlist,
    }
    this.btn_load_import = true;
    this._emailService.importar_contactos(data,this.token).subscribe(
      response=>{
        $('#contactsImport').modal('hide');
        this.init_data();
        $.notify('Se importaron los contactos.', { 
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
        this.str_import = '';
        this.str_idlist = '';
        this.btn_load_import = false;
      }
    );
  }

  eliminar_lista(id:any){
    this.load_delete = true;
    this._emailService.eliminar_lista_contacto(id,this.token).subscribe(
      response=>{
        $('#delete-'+id).modal('hide');
        this.init_data();
        $.notify('Se elimino la lista.', { 
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
        this.load_delete = false;
      }
    );
  }
}
