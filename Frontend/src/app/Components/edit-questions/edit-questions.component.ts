import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-edit-questions',
  templateUrl: './edit-questions.component.html',
  styleUrls: ['./edit-questions.component.scss']
})
export class EditQuestionsComponent {

  deedCategory: any[] = [];
  deedType: any[] = [];
  instrument: any;
  instrumentId: any;
  deedCategoryId: any;
  deedTypeId: any;
  filter: boolean = false;
  roleId: any;
  rolesData: any;
  questionList: any;
  editQuestionData: any;
  count: any;
  limit: any = 10;
  page: any = 1;

  constructor(
    private api: ApiService,
    private as: AlertService,
    public translation: TranslationService,
    private routes : ActivatedRoute,
    private router: Router
    ) {
      this.routes.params.subscribe((param:any) => {
        if(param.id){
          this.api.getById("question", param.id).subscribe(
            (res: any) => {
              if (res.success) {
                this.editQuestionData = res.data;
                this.deedCategoryId = res.data.instrument.deedTypeId.deedCategoryId.id;
                this.deedTypeId = res.data.instrument.deedTypeId.id;
                this.instrumentId = res.data.instrument.id
                this.roleId = res.data.partyRole.partyTypeId
                this.getDeedCategory()
                this.getDeedType()
                this.getInstrument()
                this.getRoles()
              }
            },
            (error) => {
              this.as.errorToast(error.error.message);
            }
          );
        }
      })
    }

  ngOnInit() {
  }

  getDeedCategory() {
    this.api.get("deed", { is_active: true }).subscribe(
      (res: any) => {
        if (res.success) {
          this.deedCategory = res.data;
        }
      },
      (error) => {
        this.as.errorToast("Something went wrong ! Please try again");
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
        this.as.errorToast("Something went wrong ! Please try again");
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
        this.as.errorToast("Something went wrong ! Please try again");
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
        this.as.errorToast("Something went wrong ! Please try again");
      }
    );
  }


  Update(frm: any) {
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
    this.api.put("question", this.editQuestionData._id, data).subscribe(
      (res: any) => {
        if (res.success) {
          this.as.successToast("Question Updated Successfully");
          this.router.navigateByUrl('Question')
        }
      },
      (error) => {
        this.as.errorToast("Something went wrong ! Please try again");
      }
    );
  }

  resetForm() {
    (this.deedCategory = []),
      (this.deedType = []),
      (this.instrument = []),
      (this.rolesData = []);
    this.getDeedCategory();
  }

  back(){
    this.router.navigateByUrl('Question')
  }

}
