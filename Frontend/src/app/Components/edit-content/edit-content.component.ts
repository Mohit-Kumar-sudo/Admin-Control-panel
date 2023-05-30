import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from "src/app/services/alert.service";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-edit-content",
  templateUrl: "./edit-content.component.html",
  styleUrls: ["./edit-content.component.scss"],
})
export class EditContentComponent {
  id: any;
  data: any;
  contentType:any;

  constructor(private api: ApiService, private route: ActivatedRoute, private as : AlertService, private router : Router) {}

  ngOnInit() {
    this.route.params.subscribe((param: any) => {
      this.id = param.id;
      if (this.id) {
        this.api.getById("content", this.id).subscribe(
          (res: any) => {
            if (res.success) {
              this.data = res.data;
              this.contentType = res.data.contentType
            }
          },
          (err) => {
            alert(err.message);
          }
        );
      }
    });
  }

  Submit(frm: any) {
    this.api.put('content', this.id, frm.value).subscribe((res:any) => {
      if(res){
        this.as.successToast('Content Updated Successfully')
        this.router.navigate([`Content/${frm.value.contentType}`]);
      }
    }, error => {
      this.as.errorToast(error.message)
    })
  }
}
