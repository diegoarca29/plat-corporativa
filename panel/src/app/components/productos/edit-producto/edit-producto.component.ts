import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';
declare var $:any;

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.css']
})
export class EditProductoComponent implements OnInit {

  public id = '';
  public load_data = true;
  public data = false;

  public producto : any = {};
  public categorias:Array<any> = [];
  public str_portada :any= '';
  public url = GLOBAL.url;
  public portada :any = undefined;

  public variedad : any = {};
  public load_variedades = false;
  public variedades:Array<any> = [];

  public load_delete = false;

  constructor(
    private _route:ActivatedRoute,
    private _productoService:ProductoService
  ) { }

  ngOnInit(): void {
    this.init_categorias();
   
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this.init_variedades();
        this._productoService.obtener_datos_producto_admin(this.id,localStorage.getItem('token')).subscribe(
          response=>{
            console.log(response);
            if(response.data == undefined){
              this.data = false;
            }else{
              this.data = true;
              this.producto = response.data;
              this.str_portada = this.url + 'get_image_productos/'+this.producto.portada;
              this.producto.portada = undefined;
              console.log(this.producto);
              
            }
            this.load_data = false;
          }
        );
        
      }
    );
  }

  fileEventChange(event:any):void{
    
    var file : any;

    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0];
      console.log(file);
      
      if(file.size <= 200000){
        if(file.type == 'image/jpeg'||file.type == 'image/png'||file.type == 'image/webp'||file.type == 'image/jpg'){
          this.portada = file;
          this.producto.portada = this.portada;

          const reader = new FileReader();
          reader.onload = e => this.str_portada =  reader.result;
          reader.readAsDataURL(file);

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
          this.portada = undefined;
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
        this.portada = undefined;
      }
    }

  
  }

  init_categorias(){
    this._productoService.obtener_configuraciones().subscribe(
      response=>{
        this.categorias = response.categorias;
        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh');
        }, 50);
      }
    );
  }

  actualizar(){
    if(!this.producto.titulo){
      $.notify('Debe ingresar el nombre del producto', { 
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
    }else if(!this.producto.categoria){
      $.notify('Debe seleccionar la categoria del producto', { 
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
    }else if(!this.producto.tipo){
      $.notify('Debe seleccionar el tipo del producto', { 
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
    }else if(!this.producto.tipo_variedad){
      $.notify('Debe ingresar el tipo de variedad', { 
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
    }else if(!this.producto.descripcion){
      $.notify('Debe ingresar la descripcion del producto', { 
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
      console.log(this.producto);
      this._productoService.actualizar_producto_admin(this.id,this.producto,localStorage.getItem('token')).subscribe(
        response=>{
          $.notify('Se actualizaron los datos correctamente.', { 
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
        }
      );
    }
  }

  generar_sku(){
    if(!this.variedad.titulo){
      $.notify('Ingrese primero la variedad.', { 
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
      let sku_tipo = this.producto.tipo.charAt(0).toUpperCase();
      let sku_nombre = this.producto.titulo.substr(0,3).toUpperCase();
      let sku_tvariedad = this.producto.tipo_variedad.substr(0,3).toUpperCase();
      let sku_variedad = this.variedad.titulo.substr(0,3).toUpperCase();

      let sku = sku_tipo+'-'+sku_nombre+'-'+sku_tvariedad+'-'+sku_variedad;
      this.variedad.sku = sku;
    }
  }

  agregar_variedad(){
    if(!this.variedad.titulo){
      $.notify('Ingrese la variedad por favor.', { 
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
    }else if(!this.variedad.sku){
      $.notify('Genere el SKU por favor.', { 
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
      this.variedad.producto = this.id;
      this._productoService.agregar_variedad_producto_admin(this.variedad,localStorage.getItem('token')).subscribe(
        response=>{
          $.notify('Se agrego la nueva variedad.', { 
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
          this.init_variedades();
          this.variedad = {};
        }
      );
    }
  }

  init_variedades(){
    this.load_variedades = true;
    this._productoService.obtener_variedades_producto_admin(this.id,localStorage.getItem('token')).subscribe(
      response=>{
        this.variedades = response.data;
        this.load_variedades = false;
      }
    );
  }

  delete_variedad(id:any){
    this.load_delete = true;
    this._productoService.eliminar_variedad_producto_admin(id,localStorage.getItem('token')).subscribe(
      response=>{
        if(response.data != undefined){
          $.notify('Se elimino la variedad.', { 
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
          $('#delete-'+id).modal('hide');
          this.init_variedades();
        }else{
          $.notify(response.message, { 
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
          $('#delete-'+id).modal('hide');
        }
        this.load_delete = false;
      }
    );
  }

}
