import { Component } from '@angular/core';
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
  filter:Boolean =  false;
  roleId: any;
  rolesData: any;
  role:any = [
    {
      roleTypeEn: '',
      roleTypeHi: '',
      vKYCType: [
        {
          type: '',
          questions: [],
        },
      ],
    }
  ]

  constructor(
    private api: ApiService,
    private as: AlertService,
    public translation: TranslationService
  ) {}

  ngOnInit() {
    this.getDeedCategory();
  }

  getDeedCategory() {
    this.api.get('deed', { is_active: true }).subscribe(
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
    this.api.getById('deed', this.deedCategoryId).subscribe(
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
    this.api.getById('deed/Instrument', this.deedTypeId).subscribe(
      (res: any) => {
        if (res.success) {
          this.instrument = res.data;
          console.log(res.data);
        }
      },
      (error) => {
        this.as.errorToast(error.message);
      }
    );
  }

  getRoles(){
    this.api.getById('deed/roles', this.instrumentId).subscribe((res:any) => {
      if(res.success){
        this.rolesData = res.data;
      }
    },(error) => {
      this.as.errorToast(error.message)
    })
  }

  Filter(filter: any) {
    console.log(filter);
    this.filter = filter;
  }

  submit(frm: any) {
    console.log(frm.value)
    return
    const data = {
      content: [
        {
          instrumentEn: '',
          instrumentHi: '',
          role: [
            {
              roleTypeEn: '',
              roleTypeHi: '',
              vKYCType: [
                {
                  type: '',
                  questions: [],
                },
              ],
            },
          ],
        },
      ],
    };
  }
}
