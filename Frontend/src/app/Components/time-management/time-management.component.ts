import { Component } from "@angular/core";
import { AlertService } from "src/app/services/alert.service";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-time-management",
  templateUrl: "./time-management.component.html",
  styleUrls: ["./time-management.component.scss"],
})
export class TimeManagementComponent {
  limit: any = 10;
  page: any = 1;
  count: any;
  timeList: any;
  edit: any = Boolean;
  data: any;
  id: any;
  options:any = [
    "Capture Images",
    "Liveness Detection",
    "Question Presentation",
    "Capture Document Images"
  ];

  constructor(private api: ApiService, private as: AlertService) {
    this.getList();
    this.edit = false;
  }

  submit(frm: any) {
    console.log("frm.value", frm.value)
    if(frm.value.content == "Capture Images"){
      frm.value.keyName = "capture_images"
    } else if(frm.value.content == "Liveness Detection"){
      frm.value.keyName = "liveness_detection"
    } else if(frm.value.content == "Question Presentation"){
      frm.value.keyName = "question_presentation"
    } else if(frm.value.content == "Capture Document Images"){
      frm.value.keyName = "capture_document_images"
    }
    this.api.post("timeInterval", { ...frm.value }).subscribe(
      (res: any) => {
        if (res.success) {
          this.as.successToast(res.msg);
          this.getList();
        } else {
          this.as.warningToast(res.msg);
        }
      },
      (error) => {
        this.as.errorToast(error.message);
      }
    );
  }

  getList() {
    this.api
      .get("timeInterval", {
        is_active: true,
        page: this.page,
        limit: this.limit,
      })
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.timeList = res.data;
            this.count = res.count;
          } else {
            this.as.warningToast(res.msg);
          }
        },
        (error) => {
          this.as.errorToast(error.message);
        }
      );
  }

  editTime(id: any) {
    if (confirm("Do you want to Update")) {
      this.edit = true;
      this.id = id;
      this.api.getById("timeInterval", id).subscribe(
        (res: any) => {
          if (res.success) {
            this.data = res.data;
          }
        },
        (err) => {
          alert(err.message);
        }
      );
    }
  }

  activeContent(id: any) {
    if (confirm("Are you sure")) {
      this.api
        .put("timeInterval", `${id}/restore`, { is_active: false })
        .subscribe(
          (res: any) => {
            if (res) {
              this.as.successToast("Content is Succesfully Enabled");
              this.getList();
            }
          },
          (err) => {
            this.as.errorToast(err.message);
          }
        );
    }
  }

  deactivateContent(id: any) {
    if (confirm("Are you sure")) {
      this.api.delete("timeInterval", id).subscribe(
        (res: any) => {
          if (res) {
            this.as.successToast("Content is Succesfully Disabled");
            this.getList();
          }
        },
        (err) => {
          this.as.errorToast(err.message);
        }
      );
    }
  }

  updateSubmit(frm: any) {
    this.api.put("timeInterval", this.id, frm.value).subscribe(
      (res: any) => {
        if (res) {
          this.as.successToast("Content Updated Successfully");
          this.getList();
        }
      },
      (error) => {
        this.as.errorToast(error.message);
      }
    );
  }
}
