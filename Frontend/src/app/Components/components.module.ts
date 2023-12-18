import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
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
import { PrerequisitsComponent } from './prerequisits/prerequisits.component';
import { DosndontsComponent } from './dosndonts/dosndonts.component';
import { TermsnconditionComponent } from './termsncondition/termsncondition.component';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FacialMatchComponent } from './facial-match/facial-match.component';

@NgModule({
  declarations: [
    DashboardComponent,
    QuestionsComponent,
    TimeManagementComponent,
    EditContentComponent,
    DisplayComponent,
    EditQuestionsComponent,
    PrerequisitsComponent,
    DosndontsComponent,
    TermsnconditionComponent,
    FacialMatchComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,
    TranslateModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPaginationModule,
    MatPaginatorModule,
    NgbTooltipModule
  ]
})
export class ComponentsModule { }
