import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { ContentsComponent } from './contents/contents.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionsComponent } from './questions/questions.component';
import { TimeManagementComponent } from './time-management/time-management.component';
import { FormsModule } from '@angular/forms';
import { EditContentComponent } from './edit-content/edit-content.component';
import { MatPaginatorModule} from '@angular/material/paginator'
import { TranslateModule } from '@ngx-translate/core';
import { DisplayComponent } from './display/display.component';
import { EditQuestionsComponent } from './edit-questions/edit-questions.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    DashboardComponent,
    ContentsComponent,
    QuestionsComponent,
    TimeManagementComponent,
    EditContentComponent,
    DisplayComponent,
    EditQuestionsComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,
    TranslateModule,
    NgxPaginationModule,
    MatPaginatorModule,
    NgbTooltipModule
  ]
})
export class ComponentsModule { }
