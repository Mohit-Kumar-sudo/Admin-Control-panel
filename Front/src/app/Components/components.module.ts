import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { ContentsComponent } from './contents/contents.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionsComponent } from './questions/questions.component';
import { TimeManagementComponent } from './time-management/time-management.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    ContentsComponent,
    QuestionsComponent,
    TimeManagementComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    CKEditorModule,
    FormsModule
  ]
})
export class ComponentsModule { }
