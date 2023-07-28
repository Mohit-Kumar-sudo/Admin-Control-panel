import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-termsncondition',
  templateUrl: './termsncondition.component.html',
  styleUrls: ['./termsncondition.component.scss']
})
export class TermsnconditionComponent {

  limit: any = 10;
  page: any = 1;
  inActive: any;
  inActiveCount: any;
  termsandCondition: any;
  termscount: any;
  displayStyle = "none";

  constructor(
    private api: ApiService,
    private router: Router,
    private as: AlertService,
    public translation: TranslationService
  ) {
    this.getTermsandCondition()
  }

  termsandcondition(frm: any) {
    if (frm.value.vkycType == "Assisted") {
      (frm.value.vkycTypeEn = "Assisted"), (frm.value.vkycTypeHi = "सहायक");
    } else {
      (frm.value.vkycTypeEn = "Non Assisted"),
        (frm.value.vkycTypeHi = "गैर सहायता");
    }
    const data = {
      contentTypeEn: "Terms and Condition",
      contentTypeHi: "नियम एवं शर्तें",
      ...frm.value,
    };
    this.api.post("content", data).subscribe(
      (res: any) => {
        if (res.success) {
          this.as.successToast("Data Submitted Successfully");
          frm.reset();
          this.getTermsandCondition();
        } else {
          this.as.warningToast("Something went wrong please try again");
        }
      },
      (error) => {
        this.as.errorToast(error.message);
      }
    );
  }

  getTermsandCondition() {
    this.api
      .get("content", {
        contentTypeEn: "Terms and Condition",
        is_active: true,
        page: this.page,
        limit: this.limit,
      })
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.termsandCondition = res.data;
            this.termscount = res.count;
          } else {
            this.as.warningToast("Something went wrong please try again");
          }
        },
        (error) => {
          this.as.errorToast(error.message);
        }
      );
  }

  openPopup(contentType: any, vkycTypeEn: any) {
    this.displayStyle = "block";
    this.getinActive(contentType, vkycTypeEn);
  }
  closePopup() {
    this.displayStyle = "none";
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
            this.getTermsandCondition();
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
            this.getTermsandCondition();
          }
        },
        (err) => {
          this.as.errorToast(err.message);
        }
      );
    }
  }

}
