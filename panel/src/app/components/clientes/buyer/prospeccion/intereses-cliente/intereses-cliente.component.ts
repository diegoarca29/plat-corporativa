import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-intereses-cliente',
  templateUrl: './intereses-cliente.component.html',
  styleUrls: ['./intereses-cliente.component.css']
})
export class InteresesClienteComponent implements OnInit {

  public id = '';
  constructor(
    private _route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params =>{
        
        this.id = params['id'];
       

      }
    );
  }

}
