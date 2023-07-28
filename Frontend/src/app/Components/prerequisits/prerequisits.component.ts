import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-prerequisits',
  templateUrl: './prerequisits.component.html',
  styleUrls: ['./prerequisits.component.scss']
})
export class PrerequisitsComponent {

  limit: any = 10;
  page: any = 1;
  Prerequisites: any;
  inActive: any;
  inActiveCount: any;
  precount: any;
  displayStyle = "none";

  constructor(
    private api: ApiService,
    private router: Router,
    private as: AlertService,
    public translation: TranslationService
  ){
    this.getPrerequisits()
  }


  getPrerequisits() {
    this.api
      .get("content", {
        contentTypeEn: "Prerequisites",
        is_active: true,
        page: this.page,
        limit: this.limit,
      })
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.Prerequisites = res.data;
            this.precount = res.count;
          } else {
            this.as.warningToast("Something went wrong please try again");
          }
        },
        (error) => {
          this.as.errorToast(error.message);
        }
      );
  }

  Prerequisits(frm: any) {
    if (frm.value.vkycType == "Assisted") {
      (frm.value.vkycTypeEn = "Assisted"), (frm.value.vkycTypeHi = "सहायक");
    } else {
      (frm.value.vkycTypeEn = "Non Assisted"),
        (frm.value.vkycTypeHi = "गैर सहायता");
    }
    const data = {
      contentTypeEn: "Prerequisites",
      contentTypeHi: "आवश्यक शर्तें",
      ...frm.value,
    };
    this.api.post("content", data).subscribe(
      (res: any) => {
        if (res.success) {
          this.as.successToast("Data Submitted Successfully");
          frm.reset();
          this.getPrerequisits();
        } else {
          this.as.warningToast("Something went wrong please try again");
        }
      },
      (error) => {
        this.as.errorToast(error.message);
      }
    );
  }

  getinActive(contentType: any, vkycTypeEn: any) {
    this.api
      .get("content", {
        contentTypeEn: contentType,
        vkycTypeEn: vkycTypeEn,
        is_active: false,
        page: this.page,
        limit: this.limit,
      })
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.inActive = res.data;
            this.inActiveCount = res.count;
          } else {
            this.as.warningToast("Something went wrong please try again");
          }
        },
        (error) => {
          this.as.errorToast(error.message);
        }
      );
  }

  editContent(id: any) {
    if (confirm("Do you want to Edit")) {
      this.router.navigate([`EditContent/${id}`]);
    }
  }

  activeContent(id: any) {
    if (confirm("Do you want to Enable Content")) {
      this.api.put("content", `${id}/restore`, { is_active: false }).subscribe(
        (res: any) => {
          if (res) {
            alert("Content is Succesfully Enabled");
            this.closePopup();
            this.getPrerequisits();
          }
        },
        (err) => {
          this.as.errorToast(err.message);
        }
      );
    }
  }

  deactivateContent(id: any) {
    if (confirm("Do you want to Disable Content")) {
      this.api.delete("content", id).subscribe(
        (res: any) => {
          if (res) {
            alert("Content is Succesfully Disabled");
            this.getPrerequisits();
          }
        },
        (err) => {
          this.as.errorToast(err.message);
        }
      );
    }
  }

  openPopup(contentType: any, vkycTypeEn: any) {
    this.displayStyle = "block";
    this.getinActive(contentType, vkycTypeEn);
  }
  closePopup() {
    this.displayStyle = "none";
  }


}
