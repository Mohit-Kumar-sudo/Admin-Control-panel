import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ApiService } from "src/app/services/api.service";

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
    private route: ActivatedRoute
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
    const data = {
      contentType: "Prerequisites",
      ...frm.value,
    };
    this.api.post("content", data).subscribe(
      (res: any) => {
        if (res.success) {
          alert("Data Submitted Successfully");
        } else {
          alert("Something went wrong please try again");
        }
      },
      (error) => {
        alert(error.message);
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
          alert("Data Submitted Successfully");
        } else {
          alert("Something went wrong please try again");
        }
      },
      (error) => {
        alert(error.message);
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
          alert("Data Submitted Successfully");
        } else {
          alert("Something went wrong please try again");
        }
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  getPrerequisits() {
    this.api
      .get("content", {
        contentType: "Prerequisites",
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
            alert("Something went wrong please try again");
          }
        },
        (error) => {
          alert(error.message);
        }
      );
  }

  getDosandDonts() {
    this.api
      .get("content", {
        contentType: "Dos and Donts",
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
            alert("Something went wrong please try again");
          }
        },
        (error) => {
          alert(error.message);
        }
      );
  }

  getTermsandCondition() {
    this.api
      .get("content", {
        contentType: "Terms and Condition",
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
            alert("Something went wrong please try again");
          }
        },
        (error) => {
          alert(error.message);
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
      alert(err.message)
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
      alert(err.message)
    })
  }

}
