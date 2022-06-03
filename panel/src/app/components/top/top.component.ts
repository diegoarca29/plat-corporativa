import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  public user:any={};
  public background = '';

  constructor(
    private _testService:TestService
  ) { 
    let str_user :any = localStorage.getItem('user');
    this.user = JSON.parse(str_user);
    console.log(this.user);
    this.init_config();
  }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    window.location.reload();
  }

  init_config(){
    this._testService.obtener_configuracion_general(localStorage.getItem('token')).subscribe(
      response=>{
        this.background = response.data.background;
        console.log(this.background);
        
      }
    );
  }
}
