import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor( public translate : TranslateService,
    private route : Router,
    private routes : ActivatedRoute
    ) {
      this.routes.params.subscribe((param:any) => {

      })
  }

}
