import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent {
  deedCategory: any;
  deedType: any;
  instrument: any;

  constructor(
    private api : ApiService,
    private as : AlertService
  ){}

  ngOnInit(){
    this.getDeedCategory
  }

  getDeedCategory(){
    this.api.get('deed',{}).subscribe((res:any) => {
      if(res.success){
        this.deedCategory = res.data;
      }
    }, error => {
      this.as.errorToast(error.message)
    })
  }

  getDeedType(id:any){
    this.api.get('deed',id).subscribe((res:any) => {
      if(res.success){
        this.deedType = res.data;
      }
    }, error => {
      this.as.errorToast(error.message)
    })
  }

  getInstrument(id:any){
    this.api.get('deed/Instrument', id).subscribe((res:any) => {
      if(res.success){
        this.instrument = res.data;
      }
    }, error => {
      this.as.errorToast(error.message)
    })
  }



}
