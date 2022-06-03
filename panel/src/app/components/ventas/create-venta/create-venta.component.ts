import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { TestService } from 'src/app/services/test.service';
import { VentaService } from 'src/app/services/venta.service';
declare var $:any;

@Component({
  selector: 'app-create-venta',
  templateUrl: './create-venta.component.html',
  styleUrls: ['./create-venta.component.css']
})
export class CreateVentaComponent implements OnInit {

  public token = localStorage.getItem('token');
  public load_clientes = false;
  public clientes:Array<any>=[];
  public variedades:Array<any>=[];
  public variedades_const:Array<any>=[];
  public filtro_cliente = '';
  public venta : any = {
    canal: '',
    origen: 'Interno',
    estado: 'Procesando',
  };
  public url = GLOBAL.url; 
  public load_variedades = true;

  public filtro_variedad = '';


  public detalles:Array<any>=[];
  public variedad_selected : any = {};

  public total = 0;

  public load_btn = false;

  public canales:Array<any> =[];

  constructor(
    private _clienteService:ClienteService,
    private _ventaService:VentaService,
    private _testService:TestService,
    private _router:Router
  ) { 
    this.init_config();
  }

  ngOnInit(): void {
    this.init_variedades();
    
  }

  init_clientes(){
    if(this.filtro_cliente){
      this.load_clientes = true;
      this._clienteService.listar_clientes_modal_admin(this.filtro_cliente,this.token).subscribe(
        response=>{
          this.clientes = response.data;
          console.log(this.clientes);
          
          this.load_clientes = false;
        }
      );
    }else{
      this.clientes = [];
    }
  }

  seleccionar_cliente(item:any){
    this.venta.cliente = item._id;
    $('#inp_cliente').val(item.fullnames);
    $('#modalCliente').modal('hide');
    console.log(this.venta);
    
  }


  init_variedades(){
    this.load_variedades = true;
    this.variedades = [];
    this._ventaService.obtener_variedades_admin(this.token).subscribe(
      response=>{
        for(var item of response.data){
          item.cantidad_detalle = 0;
          if(item.producto.precio>=1){
            this.variedades.push(item);
          }
        }
        this.variedades_const = this.variedades;
        this.load_variedades = false;
        console.log(this.variedades);
        
      }
    );
  }

  filtrar_variedades(){
    if(this.filtro_variedad){
      var term = new RegExp(this.filtro_variedad,'i');
      this.variedades = this.variedades_const.filter(item=>term.test(item.producto.titulo));
    }else{
      this.variedades = this.variedades_const;
    }
  }


  aumentar_cantidad(idx:any){
    this.variedades[idx].cantidad_detalle = this.variedades[idx].cantidad_detalle +1;
  }

  disminuir_cantidad(idx:any){
    this.variedades[idx].cantidad_detalle = this.variedades[idx].cantidad_detalle -1;
  }

  seleccionar_variedad(item:any,idx:any){
    console.log(item);
    if(item.cantidad_detalle>=1){
      if(item.cantidad_detalle <= item.stock){
        $('.fila-variedad').removeClass('bg-gris');
        $('#variedad-'+idx).addClass('bg-gris');
        this.variedad_selected = item;
       
      }else{
        $.notify('La cantidad exede el stock actual.', { 
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
      }
    }else{
      $.notify('La cantidad no puede ser 0', { 
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
    }
  }
  
  agregar_detalle(){

    this.detalles.push({
      producto: this.variedad_selected.producto._id,
      variedad:  this.variedad_selected._id,
      titulo_v:this.variedad_selected.titulo,
      titulo: this.variedad_selected.producto.titulo,
      portada:  this.variedad_selected.producto.portada,
      cantidad: this.variedad_selected.cantidad_detalle,
      precio: this.variedad_selected.producto.precio,
    });
    $('.fila-variedad').removeClass('bg-gris');
    let subtotal = this.variedad_selected.producto.precio * this.variedad_selected.cantidad_detalle;
    this.total = this.total + subtotal;
    
  }

  eliminar_detalle(idx:any,subtotal:any){
    this.total = this.total - subtotal;
    this.detalles.splice(idx,1);
  }

  ingresar_venta(){
    this.venta.detalles = this.detalles;
    this.venta.monto = this.total;
    if(!this.venta.cliente){
      $.notify('Seleccione un cliente', { 
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
    }else if(!this.venta.canal){
      $.notify('Seleccione un canal', { 
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
    }else if(this.venta.detalles.length == 0){
      $.notify('Agregue un producto en la venta', { 
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
      this.load_btn = true;
      this._ventaService.generar_venta_admin(this.venta,this.token).subscribe(
        response=>{
          
          this.load_btn = false;
          $.notify('Se ingreso la venta.', { 
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
          this._router.navigate(['/ventas']);
        }
      );
    }


   
  }

  select_metodo(item:any){
    $('#dropdownMetodo').text(item);
    this.venta.metodo = item;
  }  

  select_banco(item:any){
    $('#dropdownBanco').text(item);
    this.venta.banco = item;
  }

  init_config(){
    this._testService.obtener_configuracion_general(this.token).subscribe(
      response=>{
        /* this.config = response.data; */
        let canales = response.data.canales.split(',');
        for(var item of canales){
          this.canales.push(item.trim());
        }

      }
    );
  }
}
