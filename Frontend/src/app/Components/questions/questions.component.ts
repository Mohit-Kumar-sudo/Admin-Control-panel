import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent {
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
  page = 1;
  isAssisted: any = [];

  constructor(
    private api: ApiService,
    private as: AlertService,
    public translation: TranslationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getDeedCategory();
    this.getList();
  }

  getDeedCategory() {
    this.api.get('deed', { is_active: true }).subscribe(
      (res: any) => {
        if (res.success) {
          this.deedCategory = res.data;
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
        }
      },
      (error) => {
        this.as.errorToast('Something went wrong ! Please try again');
      }
    );
  }

  getInstrument() {
    this.instrument = [];
    this.isAssisted = [];
    this.api.getById('deed/Instrument', this.deedTypeId).subscribe(
      (res: any) => {
        if (res.success) {
          this.instrument = res.data;
          console.log('this.instrument', this.instrument);
        }
      },
      (error) => {
        this.as.errorToast('Something went wrong ! Please try again');
      }
    );
  }

  getRoles() {
    let assisted: any;
    this.instrument.map((o: any) => {
      if (o.id == this.instrumentId) {
        assisted = o.isAssisted;
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
    console.log('Assist', this.isAssisted);

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

  Filter(filter: any) {
    console.log(filter);
    this.filter = filter;
    this.getList();
  }

  submit(frm: any) {
    const data = {
      questionEn: frm.value.questionEn,
      questionHi: frm.value.questionHi,
      videoKYCTypeEn:'',
      videoKYCTypeHi:'',
      instrument: this.instrument.filter((o: any) => {
        return o.id == frm.value.instrument;
      }),
      partyRole: this.rolesData.filter((o: any) => {
        return o.partyTypeId == frm.value.partyRole;
      }),
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
    if (
      !data.questionEn ||
      !data.questionHi ||
      !data.instrument ||
      !data.partyRole || 
      !data.videoKYCTypeEn
    ) {
      this.as.warningToast('Please fill the form Properly');
    } else {
      this.api.post('question', data).subscribe(
        (res: any) => {
          if (res.success) {
            this.as.successToast('Question Submitted Successfully');
            this.getList();
            frm.reset();
            this.deedCategory = [];
            this.deedType = [];
            this.instrument = [];
            this.rolesData = [];
            this.isAssisted = [];
            this.getDeedCategory();
          }
        },
        (error) => {
          this.as.errorToast(error.error.error.message);
        }
      );
    }
  }

  getList() {
    this.api
      .get('question', { is_active: true, page: this.page, limit: this.limit })
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.questionList = res.data;
            this.count = res.count;
          }
        },
        (error) => {
          this.as.errorToast('Something went wrong ! Please try again');
        }
      );
  }

  editQuestion(id: any) {
    if (confirm('Do you want to Update')) {
      this.router.navigate([`/Question/${id}`]);
    }
  }

  enableQuestion(id: any) {
    if (confirm('Do you want to Enable')) {
      this.api.put('question', `${id}/restore`, { is_active: false }).subscribe(
        (res: any) => {
          if (res.success) {
            this.as.successToast('Question Active Successfully');
            this.getList();
          }
        },
        (error) => {
          this.as.errorToast('Something went wrong ! Please try again');
        }
      );
    }
  }

  disableQuestion(id: any) {
    if (confirm('Do you want to Disable')) {
      this.api.delete('question', id).subscribe(
        (res: any) => {
          if (res) {
            this.as.successToast('Question is Succesfully Disabled');
            this.getList();
          }
        },
        (err) => {
          this.as.errorToast(err.message);
        }
      );
    }
  }

  resetForm() {
    this.deedCategory = [];
    this.deedType = [];
    this.instrument = [];
    this.rolesData = [];
    this.getDeedCategory();
    this.getList();
  }

  filterData(frm: any) {
    this.api
      .get(`question/filter/${this.instrumentId}/${frm.value.partyRole}`, {})
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.questionList = res.data;
            this.count = res.count;
          }
        },
        (error) => {
          this.as.errorToast('Something went wrong !Please try again');
        }
      );
  }
}
