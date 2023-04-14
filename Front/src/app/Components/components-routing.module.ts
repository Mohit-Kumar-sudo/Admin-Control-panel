import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentsComponent } from './contents/contents.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionsComponent } from './questions/questions.component';
import { TimeManagementComponent } from './time-management/time-management.component';
import { EditContentComponent } from './edit-content/edit-content.component';

const routes: Routes = [
  {
    path:'Dashboard',
    component:DashboardComponent
  },
  {
    path:'Content/:content',
    component:ContentsComponent
  },
  {
    path:'EditContent/:id',
    component:EditContentComponent
  },
  {
    path:'Question',
    component:QuestionsComponent
  },
  {
    path:'Time-management',
    component:TimeManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
