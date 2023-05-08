import { Component } from "@angular/core";
import { AlertService } from "src/app/services/alert.service";
import { ApiService } from "src/app/services/api.service";
import { TranslationService } from "src/app/services/translation.service";

@Component({
  selector: "app-questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.scss"],
})
export class QuestionsComponent {
  deedCategory: any[] = [];
  deedType: any[] = [];
  instrument: any;
  instrumentId: any;
  deedCategoryId: any;
  deedTypeId: any;
  filter: Boolean = false;
  roleId: any;
  rolesData: any;
  questionList: any;
  editQuestionData: any;

  constructor(
    private api: ApiService,
    private as: AlertService,
    public translation: TranslationService
  ) {}

  ngOnInit() {
    this.getDeedCategory();
    this.getList();
  }

  getDeedCategory() {
    this.api.get("deed", { is_active: true }).subscribe(
      (res: any) => {
        if (res.success) {
          this.deedCategory = res.data;
        }
      },
      (error) => {
        this.as.errorToast(error.message);
      }
    );
  }

  getDeedType() {
    this.api.getById("deed", this.deedCategoryId).subscribe(
      (res: any) => {
        if (res.success) {
          this.deedType = res.data;
        }
      },
      (error) => {
        this.as.errorToast(error.message);
      }
    );
  }

  getInstrument() {
    this.api.getById("deed/Instrument", this.deedTypeId).subscribe(
      (res: any) => {
        if (res.success) {
          this.instrument = res.data;
        }
      },
      (error) => {
        this.as.errorToast(error.message);
      }
    );
  }

  getRoles() {
    this.api.getById("deed/roles", this.instrumentId).subscribe(
      (res: any) => {
        if (res.success) {
          this.rolesData = res.data;
        }
      },
      (error) => {
        this.as.errorToast(error.message);
      }
    );
  }

  Filter(filter: any) {
    console.log(filter);
    this.filter = filter;
  }

  submit(frm: any) {
    const data = {
      questionEn: frm.value.questionEn,
      questionHi: frm.value.questionHi,
      instrument: this.instrument.filter((o: any) => {
        return o.id == frm.value.instrument;
      }),
      partyRole: this.rolesData.filter((o: any) => {
        return o.partyTypeId == frm.value.partyRole;
      }),
    };
    this.api.post("question", data).subscribe(
      (res: any) => {
        if (res.success) {
          this.as.successToast("Question Submitted Successfully");
        }
      },
      (error) => {
        this.as.errorToast(error.message);
      }
    );
  }

  getList() {
    this.api.get("question", { is_active: true }).subscribe(
      (res: any) => {
        if (res.success) {
          this.questionList = res.data;
        }
      },
      (error) => {
        this.as.errorToast(error.message);
      }
    );
  }

  editQuestion(id: any) {
    this.api.getById("question", id).subscribe(
      (res: any) => {
        if (res.success) {
          this.editQuestionData = res.data;
        }
      },
      (error) => {
        this.as.errorToast(error.message);
      }
    );
  }

  enableQuestion(id: any) {
    this.api.put("question", `${id}/restore`, { is_active: false }).subscribe(
      (res: any) => {
        if (res.success) {
          this.as.successToast("Question Active Successfully");
        }
      },
      (error) => {
        this.as.errorToast(error.message);
      }
    );
  }

  disableQuestion(id: any) {
    this.api.delete("question", id).subscribe(
      (res: any) => {
        if (res) {
          this.as.successToast("Question is Succesfully Disabled");
          this.getList();
        }
      },
      (err) => {
        this.as.errorToast(err.message);
      }
    );
  }
}
