import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
declare var $:any;
declare var moment:any;
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-inventario-entrada',
  templateUrl: './inventario-entrada.component.html',
  styleUrls: ['./inventario-entrada.component.css']
})
export class InventarioEntradaComponent implements OnInit {

  public filtro_month = '';
  public filtro_year = '';
  public load_data = false;
  public inventario :Array<any> = [];
  public page = 1;
  public pageSize = 25;
  public token = localStorage.getItem('token');
  public options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: true,
    title: 'My Awesome CSV',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };

  constructor(
    private _productoService:ProductoService
  ) { }

  ngOnInit(): void {
  }

  downloadExcel(){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Inventario entrada");

    //CONVIRTIENDO NUESTRO ARREGLO A UN FORMATO LEGIBLE PARA EXCEL USANDO EXCELJS
    worksheet.addRow(undefined);
    for (let x1 of this.inventario){
        let x2=Object.keys(x1);

        let temp=[]
        for(let y of x2){
          temp.push(x1[y])
        }
        worksheet.addRow(temp)
    }
    //NOMBRE DEL ARCHIVO RESULTANTE
    let fname="INVENTARIO ENTRADA";

    //ASIGNACIÓN DE LA CABECERA DEL DOCUMENTO EXCEL DONDE CADA CAMPO DE LOS DATOS QUE EXPORTAREMOS SERA UNA COLUMNA
    worksheet.columns = [
        { header: 'SKU', key: 'col1', width: 20},
        { header: 'PRODUCTO', key: 'col2', width: 35},
        { header: 'VARIEDAD', key: 'col3', width: 20},
        { header: 'INGRESO', key: 'col4', width: 35},
        { header: 'CANTIDAD', key: 'col5', width: 15},
        { header: 'PRECIO UNIDAD', key: 'col6', width: 15},
        { header: 'FECHA INGRESO', key: 'col6', width: 15},
    ]as any;

    //PREPACION DEL ARCHIVO Y SU DESCARGA
    workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, fname+'.xlsx');
    });
  }

  toCSV(){
    if(this.inventario.length >= 1){
      const csvExporter = new ExportToCsv(this.options);
  
      csvExporter.generateCsv(this.inventario);
    }else{
      $.notify('No hay ningun registro que exportar', { 
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

  search(){
    this.load_data = true;
    this._productoService.obtener_inventario_entrada_admin(this.filtro_year,this.filtro_month,this.token).subscribe(
      response=>{
        console.log(response);
        this.inventario = [];
        for(var item of response.data){
          this.inventario.push({
            sku: item.variedad.sku.toUpperCase(),
            producto: item.producto.titulo.toUpperCase(),
            variedad: item.variedad.titulo.toUpperCase(),
            ingreso: item._id.toUpperCase(),
            cantidad: item.cantidad,
            precio: item.costo_unidad,
            
            fecha: moment(item.createdAt).format('YYYY-MM-DD')
          });
        }
        console.log(this.inventario);
        this.load_data = false;
      }
    );
  }

  refresh(){
    this.filtro_month = '';
    this.filtro_year = '';

    this.inventario = [];
  }
}
