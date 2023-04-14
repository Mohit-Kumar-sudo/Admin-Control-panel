import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-time-management',
  templateUrl: './time-management.component.html',
  styleUrls: ['./time-management.component.scss']
})
export class TimeManagementComponent {

  limit:any = 10;
  page: any = 1;
  count: any;
  timeList:any;

  constructor(
    private api : ApiService
  ){
    this.getList()
  }

  submit(frm:any){
    this.api.post('timeInterval', {...frm.value}).subscribe((res:any) => {
      if(res.success){
        alert(res.msg)
      } else {
        alert(res.msg)
      }
    }, error => {
      alert(error.message)
    })
  }

  getList(){
    this.api.get('timeInterval',{is_active:true, page:this.page, limit:this.limit}).subscribe((res:any) => {
      if(res.success){
        this.timeList = res.data
      } else {
        alert(res.msg)
      }
    }, error => {
      alert(error.message)
    })
  }

}
