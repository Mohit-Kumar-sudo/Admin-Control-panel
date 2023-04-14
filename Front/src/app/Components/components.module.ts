import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { ContentsComponent } from './contents/contents.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionsComponent } from './questions/questions.component';
import { TimeManagementComponent } from './time-management/time-management.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { EditContentComponent } from './edit-content/edit-content.component';
import { MatPaginatorModule} from '@angular/material/paginator'

@NgModule({
  declarations: [
    DashboardComponent,
    ContentsComponent,
    QuestionsComponent,
    TimeManagementComponent,
    EditContentComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    CKEditorModule,
    FormsModule,
    MatPaginatorModule
  ]
})
export class ComponentsModule { }
