import { Component, OnInit } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';
declare var $:any;

@Component({
  selector: 'app-email-campaigns',
  templateUrl: './email-campaigns.component.html',
  styleUrls: ['./email-campaigns.component.css']
})
export class EmailCampaignsComponent implements OnInit {

  public token = localStorage.getItem('token');
  public campaigns :Array<any> = [];
  public listas :Array<any> = [];
  public load_data = true;

  public email : any = {
    listid: ''
  };

  public load_send = false;
  constructor(
    private _emailService:EmailService
  ) { }

  ngOnInit(): void {
    this.init_data();
    this.init_listas();
  }

  init_data(){
    this.load_data = true;
    this._emailService.obtener_campaigns(this.token).subscribe(
      response=>{
        console.log(response);
        this.campaigns = response.data.campaigns;
        this.load_data = false;
      }
    );
  }

  init_listas(){
    this.load_data = true;
    this._emailService.obtener_listas_contactos(this.token).subscribe(
      response=>{

        this.listas = response.data.lists;
        this.load_data = false;
      }
    );
  }

  crear(){
    this._emailService.crear_campaign(this.email,this.token).subscribe(
      response=>{
        this.email = {
          listid: ''
        };
        $('#createEmail').modal('hide');
        $.notify('Se creó la campaña.', { 
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
        this.init_data();
      }
    );
  }

  send(id:any){
    this.load_send = true;
    this._emailService.send_email_campaign({id:id},this.token).subscribe(
      response=>{
        $('#send-'+id).modal('hide');
        this.init_data();
        $.notify('Se envió la campaña.', { 
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
        this.load_send = false;
      }
    );
  }
}
