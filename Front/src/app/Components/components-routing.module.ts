import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentsComponent } from './contents/contents.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionsComponent } from './questions/questions.component';
import { TimeManagementComponent } from './time-management/time-management.component';

const routes: Routes = [
  {
    path:'Dashboard',
    component:DashboardComponent
  },
  {
    path:'Content/prerequisits',
    component:ContentsComponent
  },
  {
    path:'Content/dos&donts',
    component:ContentsComponent
  },
  {
    path:'Content/terms&condition',
    component:ContentsComponent
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
