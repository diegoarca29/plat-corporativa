import { Component, OnInit } from '@angular/core';
import { KpiService } from 'src/app/services/kpi.service';
declare var ApexCharts:any;
declare var $:any;

@Component({
  selector: 'app-kpi-mensual',
  templateUrl: './kpi-mensual.component.html',
  styleUrls: ['./kpi-mensual.component.css']
})
export class KpiMensualComponent implements OnInit {

  public token = localStorage.getItem('token');
  public year = '';
  public month = '';

  constructor(
    private _kpiService:KpiService
  ) { }

  ngOnInit(): void {
    
    this.init_chart1();
    this.init_chart2();
    this.init_chart3();

  }

  search(){
    this.init_chart_1();
    this.init_chart_2();
    this.init_chart_3();
  }

  init_chart_1(){
    const primary = '#6993FF';
    const success = '#1BC5BD';
    const info = '#8950FC';
    const warning = '#FFA800';
    const danger = '#F64E60';

    this._kpiService.kpi_pagos_tipo(this.year,this.month,this.token).subscribe(
      response=>{
        
        $('#chart_12').remove();
        $('#content_chart_12').html('<div id="chart_12" class="d-flex justify-content-center"></div>');

        const apexChart = "#chart_12";
        var options = {
          series: response.data,
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['Productos', 'Servicios'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }],
          colors: [primary, success]
        };

        var chart = new ApexCharts(document.querySelector(apexChart), options);
        chart.render();
      }
    );

    
   
  }

  init_chart_2(){
    const primary = '#6993FF';
    const success = '#1BC5BD';
    const info = '#8950FC';
    const warning = '#FFA800';
    const danger = '#F64E60';

    this._kpiService.kpi_metodos_pago(this.year,this.month,this.token).subscribe(
      response=>{
        
        $('#chart_2').remove();
        $('#content_chart_2').html('<div id="chart_2" class="d-flex justify-content-center"></div>');

        const apexChart = "#chart_2";
        var options = {
          series: response.data,
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['Paypal', 'Transferencia', 'Desposito', 'Tarjeta de Credito'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }],
          colors: [primary, success,info,warning]
        };

        var chart = new ApexCharts(document.querySelector(apexChart), options);
        chart.render();
      }
    );

    
   
  }

  init_chart_3(){
    const primary = '#6993FF';
    const success = '#1BC5BD';
    const info = '#8950FC';
    const warning = '#FFA800';
    const danger = '#F64E60';

    this._kpiService.kpi_curso_ganancia(this.year,this.month,this.token).subscribe(
      response=>{
        
        $('#chart_3').remove();
        $('#content_chart_3').html('<div id="chart_3" class="d-flex justify-content-center"></div>');

        const primary = '#6993FF';
        const success = '#1BC5BD';
        const info = '#8950FC';
        const warning = '#FFA800';
        const danger = '#F64E60';
    
        const apexChart = "#chart_3";
        var options = {
          series: [{
          name: 'Cursos',
          data: response.montos
        }],
          annotations: {
          points: [{
            x: 'Cursos',
            seriesIndex: 0,
            label: {
              borderColor: '#775DD0',
              offsetY: 0,
              style: {
                color: '#fff',
                background: '#775DD0',
              }
            }
          }]
        },
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            columnWidth: '50%',
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 2
        },
        
        grid: {
          row: {
            colors: ['#fff', '#f2f2f2']
          }
        },
        xaxis: {
          labels: {
            rotate: -45
          },
          categories: response.cursos,
          tickPlacement: 'on'
        },
        yaxis: {
          title: {
            text: 'Servings',
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [50, 0, 100]
          },
        }
        };
    
        var chart = new ApexCharts(document.querySelector(apexChart), options);
        chart.render();
      }
    );

    
   
  }

  init_chart1(){
    const primary = '#6993FF';
    const success = '#1BC5BD';

    const apexChart = "#chart_12";
    var options = {
      series: [0,0],
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Productos', 'Servicios'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      colors: [primary, success]
    };

    var chart = new ApexCharts(document.querySelector(apexChart), options);
    chart.render();
  }

  init_chart2(){

    const primary = '#6993FF';
    const success = '#1BC5BD';
    const info = '#8950FC';
    const warning = '#FFA800';
    const danger = '#F64E60';

    const apexChart = "#chart_2";
    var options = {
      series: [0,0,0,0],
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Paypal', 'Transferencia', 'Desposito', 'Tarjeta de Credito'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      colors: [primary, success,info,warning]
    };

    var chart = new ApexCharts(document.querySelector(apexChart), options);
    chart.render();
  }

  init_chart3(){

    const primary = '#6993FF';
    const success = '#1BC5BD';
    const info = '#8950FC';
    const warning = '#FFA800';
    const danger = '#F64E60';

    const apexChart = "#chart_3";
    var options = {
      series: [{
      name: 'Cursos',
      data: []
    }],
      annotations: {
      points: [{
        x: 'Cursos',
        seriesIndex: 0,
        label: {
          borderColor: '#775DD0',
          offsetY: 0,
          style: {
            color: '#fff',
            background: '#775DD0',
          }
        }
      }]
    },
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '50%',
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 2
    },
    
    grid: {
      row: {
        colors: ['#fff', '#f2f2f2']
      }
    },
    xaxis: {
      labels: {
        rotate: -45
      },
      categories: [],
      tickPlacement: 'on'
    },
    yaxis: {
      title: {
        text: 'Servings',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100]
      },
    }
    };

    var chart = new ApexCharts(document.querySelector(apexChart), options);
    chart.render();
  }
}
