import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-edit-questions',
  templateUrl: './edit-questions.component.html',
  styleUrls: ['./edit-questions.component.scss'],
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
  isAssisted: any = [];
  videoKYCType:any;

  constructor(
    private api: ApiService,
    private as: AlertService,
    public translation: TranslationService,
    private routes: ActivatedRoute,
    private router: Router
  ) {
    this.routes.params.subscribe((param: any) => {
      if (param.id) {
        this.api.getById('question', param.id).subscribe(
          (res: any) => {
            if (res.success) {
              this.editQuestionData = res.data;
              this.deedCategoryId =
                res.data.instrument.deedTypeId.deedCategoryId.id;
              this.deedTypeId = res.data.instrument.deedTypeId.id;
              this.instrumentId = res.data.instrument.id;
              this.roleId = res.data.partyRole.partyTypeId;
              this.videoKYCType = res.data.videoKYCTypeEn;
              this.getDeedCategory();
            }
          },
          (error) => {
            this.as.errorToast(error.error.message);
          }
        );
      }
    });
  }

  ngOnInit() {}

  getDeedCategory() {
    this.api.get('deed', { is_active: true }).subscribe(
      (res: any) => {
        if (res.success) {
          this.deedCategory = res.data;
          this.getDeedType()
        }
      },
      (error) => {
        this.as.errorToast('Something went wrong ! Please try again');
      }
    );
  }

  getDeedType() {
    this.deedType = [];
    this.isAssisted = [];
    this.api.getById('deed', this.deedCategoryId).subscribe(
      (res: any) => {
        if (res.success) {
          this.deedType = res.data;
          this.getInstrument()
        }
      },
      (error) => {
        this.as.errorToast('Something went wrong ! Please try again');
      }
    );
  }

  getInstrument() {
    this.instrument = [];
    this.isAssisted = []
    this.api.getById('deed/Instrument', this.deedTypeId).subscribe(
      (res: any) => {
        if (res.success) {
          this.instrument = res.data;
          this.getRoles()
        }
      },
      (error) => {
        this.as.errorToast('Something went wrong ! Please try again');
      }
    );
  }

  getRoles() {
  let assisted:any ;
    this.instrument.map((o: any) => {
      if (o.id == this.instrumentId) {
          assisted = o.isAssisted;
        console.log("assisted", assisted);
      }
    });
    switch (assisted) {
      case 0:
        assisted = this.isAssisted.push(
          { videoKYCTypeEn: 'Non-Assisted', videoKYCTypeHi: 'गैर सहायता' },
          { videoKYCTypeEn: 'Assisted', videoKYCTypeHi: 'सहायता' }
        );
        break;
      case 1:
        assisted = this.isAssisted.push(
          { videoKYCTypeEn: 'Non-Assisted', videoKYCTypeHi: 'गैर सहायता' },
          { videoKYCTypeEn: 'Assisted', videoKYCTypeHi: 'सहायता' }
        );
        break;
      default:
        this.as.infoToast('This Instrument is not Eligible for Video KYC');
    }
    this.api.getById('deed/roles', this.instrumentId).subscribe(
      (res: any) => {
        if (res.success) {
          this.rolesData = res.data;
        }
      },
      (error) => {
        this.as.errorToast('Something went wrong ! Please try again');
      }
    );
  }

  Update(frm: any) {
    let instrument = this.instrument.filter((o: any) => {
      return o.id == frm.value.instrument;
    });
    let partyRole = this.rolesData.filter((o: any) => {
      return o.partyTypeId == frm.value.partyRole;
    });
    const data = {
      questionEn: frm.value.questionEn,
      questionHi: frm.value.questionHi,
      instrument: instrument[0],
      partyRole: partyRole[0],
      videoKYCTypeEn:'',
      videoKYCTypeHi:'',
    };
    switch (frm.value.videoKYCType) {
      case "Non-Assisted":
        data.videoKYCTypeEn = "Non-Assisted";
        data.videoKYCTypeHi = "गैर सहायता"
        break;
      case "Assisted":
        data.videoKYCTypeEn = "Assisted";
        data.videoKYCTypeHi = "सहायता"
        break;
      default:
        break;
    }
    this.api.put('question', this.editQuestionData._id, data).subscribe(
      (res: any) => {
        if (res.success) {
          this.as.successToast('Question Updated Successfully');
          this.router.navigateByUrl('Question');
        }
      },
      (error) => {
        this.as.errorToast('Something went wrong ! Please try again');
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

  back() {
    this.router.navigateByUrl('Question');
  }
}
