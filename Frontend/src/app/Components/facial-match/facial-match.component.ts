import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-facial-match',
  templateUrl: './facial-match.component.html',
  styleUrls: ['./facial-match.component.scss'],
})
export class FacialMatchComponent {
  limit: any = 10;
  page: any = 1;
  count: any;
  timeList: any;
  edit: any = Boolean;
  data: any;
  id: any;

  constructor(private api: ApiService, private as: AlertService) {
    this.getList();
    this.edit = false;
  }

  submit(frm: any) {
    console.log('frm.value', frm.value);
    if (frm.value.content == 'Name Matching Matrix Percentage') {
      frm.value.keyName = 'face_match';
    } else if (frm.value.content == 'Face Matching Matrix Percentage') {
      frm.value.keyName = 'name_match';
    }
    if (!frm.value.percentage) {
      this.as.infoToast('Please Fill Required Details');
      return;
    }
    this.api.post('matrix', { ...frm.value }).subscribe(
      (res: any) => {
        if (res.success) {
          this.as.successToast(res.msg);
          this.edit = false;
          this.getList();
        } else {
          this.as.warningToast(res.msg);
        }
      },
      (error) => {
        this.as.errorToast(error.message);
      }
    );
  }

  getList() {
    this.api
      .get('matrix', {
        is_active: true,
        page: this.page,
        limit: this.limit,
      })
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.timeList = res.data;
            this.count = res.count;
          } else {
            this.as.warningToast(res.msg);
          }
        },
        (error) => {
          this.as.errorToast(error.message);
        }
      );
  }

  editPercent(id: any) {
    if (confirm('Do you want to Update')) {
      this.edit = true;
      this.id = id;
      this.api.getById('matrix', id).subscribe(
        (res: any) => {
          if (res.success) {
            this.data = res.data;
          }
        },
        (err) => {
          alert(err.message);
        }
      );
    }
  }

  activeContent(id: any) {
    if (confirm('Are you sure')) {
      this.api
        .put('matrix', `${id}/restore`, { is_active: false })
        .subscribe(
          (res: any) => {
            if (res) {
              this.as.successToast('Content is Succesfully Enabled');
              this.getList();
            }
          },
          (err) => {
            this.as.errorToast(err.message);
          }
        );
    }
  }

  deactivateContent(id: any) {
    if (confirm('Are you sure')) {
      this.api.delete('matrix', id).subscribe(
        (res: any) => {
          if (res) {
            this.as.successToast('Content is Succesfully Disabled');
            this.getList();
          }
        },
        (err) => {
          this.as.errorToast(err.message);
        }
      );
    }
  }

  updateSubmit(frm: any) {
    this.api.put('matrix', this.id, frm.value).subscribe(
      (res: any) => {
        if (res) {
          this.as.successToast('Content Updated Successfully');
          this.getList();
        }
      },
      (error) => {
        this.as.errorToast(error.message);
      }
    );
  }
}
