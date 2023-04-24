import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AlertService } from "src/app/services/alert.service";
import { ApiService } from "src/app/services/api.service";
import { TranslationService } from "src/app/services/translation.service";

@Component({
  selector: "app-contents",
  templateUrl: "./contents.component.html",
  styleUrls: ["./contents.component.scss"],
})
export class ContentsComponent {
  limit: any = 10;
  page: any = 1;
  Prerequisites: any;
  DosandDonts: any;
  termsandCondition: any;
  precount: any;
  doscount: any;
  termscount: any;
  content: any;

  public Editor: any = ClassicEditor;
  public CKEditor: any = ClassicEditor;
  public views = ["Prerequisites", "Do's & Don'ts", "Terms & Conditions"];
  public view: any;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private as : AlertService,
    public translation : TranslationService
  ) {
    this.route.params.subscribe((param: any) => {
      this.content = param.content;
      if (this.content == "prerequisits") {
        this.view = this.views[0];
      } else if (this.content == "dos&donts") {
        this.view = this.views[1];
      } else if (this.content == "terms&condition") {
        this.view = this.views[2];
      }
    });

    this.view = this.views[0];
    this.getPrerequisits();
    this.getDosandDonts();
    this.getTermsandCondition();
  }

  Prerequisits(frm: any) {
    if(frm.value.vKycType == 'Assisted'){
      frm.value.vkycTypeEn = 'Assisted',
      frm.value.vkycTypeHi = 'सहायक'
    } else {
      frm.value.vkycTypeEn = 'Non Assisted',
      frm.value.vkycTypeHi = 'गैर सहायता'
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

  dosanddonts(frm: any) {
    const data = {
      contentType: "Dos and Donts",
      ...frm.value,
    };
    this.api.post("content", data).subscribe(
      (res: any) => {
        if (res.success) {
          this.as.successToast("Data Submitted Successfully");
          this.getDosandDonts();
        } else {
          this.as.warningToast("Something went wrong please try again");
        }
      },
      (error) => {
        this.as.errorToast(error.message);
      }
    );
  }

  termsandcondition(frm: any) {
    const data = {
      contentType: "Terms and Condition",
      ...frm.value,
    };
    this.api.post("content", data).subscribe(
      (res: any) => {
        if (res.success) {
          this.as.successToast("Data Submitted Successfully");
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

  getDosandDonts() {
    this.api
      .get("content", {
        contentTypeEn: "Dos and Donts",
        is_active: true,
        page: this.page,
        limit: this.limit,
      })
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.DosandDonts = res.data;
            this.doscount = res.count;
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

  editContent(id: any) {
    this.router.navigate([`EditContent/${id}`]);
  }

  activeContent(id:any){
    this.api.put('content', `${id}/restore` , {is_active:false}).subscribe((res:any) => {
      if(res){
        alert('Content is Succesfully Enabled')
        this.getPrerequisits()
        this.getDosandDonts()
        this.getTermsandCondition()
      }
    }, err => {
      this.as.errorToast(err.message)
    })
  }

  deactivateContent(id:any){
    this.api.delete('content', id).subscribe((res:any) => {
      if(res){
        alert('Content is Succesfully Disabled')
        this.getPrerequisits()
        this.getDosandDonts()
        this.getTermsandCondition()
      }
    }, err => {
      this.as.errorToast(err.message)
    })
  }

}
