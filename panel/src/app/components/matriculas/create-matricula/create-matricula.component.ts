import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { CursoService } from 'src/app/services/curso.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { MatriculaService } from 'src/app/services/matricula.service';
import { TestService } from 'src/app/services/test.service';
declare var $:any;

@Component({
  selector: 'app-create-matricula',
  templateUrl: './create-matricula.component.html',
  styleUrls: ['./create-matricula.component.css']
})
export class CreateMatriculaComponent implements OnInit {

  public token = localStorage.getItem('token');
  public filtro_cliente = '';
  public clientes:Array<any> =[];
  public load_clientes = false;
  public url = GLOBAL.url;

  public matricula:any={
    origen: 'Interno',
    matricula: 0,
    canal: '',
  };
  public detalles :Array<any> =[];
  public monto = 0;
  public descuento = 0;

  public cursos:Array<any> =[];
  public ciclos :Array<any> = [];
  public ciclos_const :Array<any> = [];
  public filtro_ciclo = '';
  public load_ciclos = false;
  public pageCiclo = 1;
  public pageSizeCiclo = 10;

  public salones :Array<any> =[];

  public detalle_subtotal = 0;
  public detalle_descuento = 0;
  public detalle_total = 0;

  public descuento_tipo = '';
  public descuento_valor = 0;

  public detalle : any = {
    tipo_inscripcion : 'Nuevo',
    estado : 'Procesando'
  };

  public btn_load = false;

  public canales:Array<any> =[];

  constructor(
    private _clienteService:ClienteService,
    private _cursoService:CursoService,
    private _matriculaService:MatriculaService,
    private _testService:TestService,
    private _router:Router
  ) { 
    this.init_config();
  }

  ngOnInit(): void {
    this.init_cursosbase();
    setTimeout(()=>{
      $('.selectpicker').selectpicker();
    },150);
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

  init_clientes(){
    this.load_clientes = true;
    this._clienteService.listar_clientes_modal_admin(this.filtro_cliente,this.token).subscribe(
      response=>{
        this.clientes = response.data;
        this.load_clientes = false;
      }
    );
  }

  init_cursosbase(){
    this._cursoService.listar_cursosbase_modal_admin(this.token).subscribe(
      response=>{
        this.cursos = response.data;
        setTimeout(()=>{
          $('.selectpicker').selectpicker('refresh');
        },150);
      }
    );
  }

  seleccionar_cliente(item:any){
    this.matricula.cliente = item._id;
    $('#inp_cliente').val(item.fullnames);
    $('#modalCliente').modal('hide');
  }


  seleccionar_curso(event:any){
    let valor_select = event.target.value;
    let arr_select = valor_select.split('_');

    this.load_ciclos = true;
    this.detalle.curso = arr_select[0];
    this.detalle.titulo_curso = arr_select[1];
    this._cursoService.listar_ciclos_admin(this.detalle.curso,this.token).subscribe(
      response=>{
        this.ciclos = [];
        response.data.forEach((element:any) => {
            if(element.ciclo.estado){
              this.ciclos.push(element);
            }
        });
        this.ciclos_const = this.ciclos;
        this.load_ciclos = false;
      }
    ); 
  }

  filtrar_ciclo(){
      let term = new RegExp(this.filtro_ciclo,'i');
      this.ciclos = this.ciclos_const.filter(item=>term.test(item.ciclo._id));
  }

  seleccionar_ciclo(item:any){
    this.salones = item.salones;
    this.detalle_subtotal = item.ciclo.precio;
    this.detalle_total = this.detalle_subtotal;
    this.detalle.f_inicio = item.ciclo.f_inicio;
    this.detalle.f_fin = item.ciclo.f_fin;
    this.detalle.ciclo_curso = item.ciclo._id;
    
    $('#inp_ciclo').val(item.ciclo.nivel);
    $('#modalCiclo').modal('hide');
  }

  aplicar_descuento(){
      if(this.descuento_tipo == 'Precio fijo'){
        if(this.descuento_valor < this.detalle_subtotal){
          this.detalle_descuento = this.descuento_valor;
          this.detalle_total = this.detalle_subtotal - this.detalle_descuento;

          this.detalle.descuento_tipo = this.descuento_tipo;
          this.detalle.descuento_valor = this.descuento_valor;
        }else{
          $.notify('El descuento debe ser menor al subtotal', { 
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
        if(this.descuento_valor < 100){
          let total_descuento = (this.detalle_subtotal*this.descuento_valor)/100;
          this.detalle_descuento = total_descuento;
          this.detalle_total = this.detalle_subtotal - this.detalle_descuento;
          this.detalle.descuento_tipo = this.descuento_tipo;
          this.detalle.descuento_valor = total_descuento;
        }else{
          $.notify('El porcentaje debe ser menor a 100', { 
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
  }

  seleccionar_salon(event:any,item:any){
    this.detalle.ciclo_salon = event.target.value;
    this.detalle.nclases = item.f_dias.length * 4;
    this.detalle.titulo_ciclo = item.salon;
    console.log(this.detalle.nclases);
    
  }

  agregar_detalle(){
    this.detalle.precio = this.detalle_total;

    if(!this.detalle.curso){
      $.notify('Seleccione el curso base.', { 
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
    }else if(!this.detalle.ciclo_curso){
      $.notify('Seleccione el ciclo.', { 
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
    }else if(!this.detalle.ciclo_salon){
      $.notify('Seleccione el salon.', { 
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
    }else if(this.detalle.precio == 0){
      $.notify('El precio del ciclo no puede ser 0.', { 
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
      this.detalles.push(this.detalle);
      this.monto = this.monto + this.detalle.precio;
      if(this.detalle.descuento_valor){
        this.descuento = this.descuento + this.detalle.descuento_valor;
      }
      this.reset_detalle();
    }

  }

  reset_detalle(){
    this.detalle = {
      tipo_inscripcion : 'Nuevo',
      estado : 'Procesando'
    };

    this.descuento_tipo = '';
    this.descuento_valor = 0;
    $('#inp_ciclo').val('');

    this.salones = [];


    setTimeout(()=>{
      $('#select_curso').prop('selectedIndex',0);
      $('.selectpicker').selectpicker('refresh');
    },150);

    this.detalle_subtotal = 0;
    this.detalle_descuento = 0;
    this.detalle_total = 0;
  }

  matricular(){
    this.matricula.monto = this.monto;
    this.matricula.descuento = this.descuento;

    if(!this.matricula.cliente){
      $.notify('Seleccione el cliente por favor.', { 
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
    }else if(!this.matricula.canal){
      $.notify('Seleccione el canal por favor.', { 
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
    }else if(!this.matricula.matricula){
      $.notify('Ingrese el monto de la matricula.', { 
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
    }else if(this.matricula.matricula <0){
      $.notify('Ingrese el monto válido en la matricula.', { 
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
    }else if(this.detalles.length == 0){
      $.notify('Debe ingresar al menos un ciclo.', { 
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
      this.matricula.detalles = this.detalles;
      this.btn_load = true;
      this._matriculaService.generar_matricula_admin(this.matricula,this.token).subscribe(
        response=>{
          $.notify('La matricula fué completada.', { 
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
          this.btn_load = false;
          this._router.navigate(['/matriculas']);
        }
      );
    }
  }

  eliminar_detalle(idx:any,item:any){
    this.monto = this.monto - item.precio;
    if(item.descuento_valor){
      this.descuento = this.descuento - item.descuento_valor;
    }
    this.detalles.splice(idx,1);
  }
}
