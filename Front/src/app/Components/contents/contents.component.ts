import { Component } from "@angular/core";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
  selector: "app-contents",
  templateUrl: "./contents.component.html",
  styleUrls: ["./contents.component.scss"],
})
export class ContentsComponent {
  public Editor: any = ClassicEditor;
  public CKEditor: any = ClassicEditor;
  public views = ["Prerequisites", "Do's & Don'ts", "Terms & Conditions"];
  public view: any;

  constructor() {
    this.view = this.views[0];
  }

  Prerequisits(frm: any) {
    console.log(frm.value)
  }

  dosanddonts(frm: any) {
    console.log(frm.value)
  }

  termsandcondition(frm: any) {
    console.log(frm.value)
  }
}
