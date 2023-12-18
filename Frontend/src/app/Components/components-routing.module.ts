import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionsComponent } from './questions/questions.component';
import { TimeManagementComponent } from './time-management/time-management.component';
import { EditContentComponent } from './edit-content/edit-content.component';
import { DisplayComponent } from './display/display.component';
import { EditQuestionsComponent } from './edit-questions/edit-questions.component';
import { PrerequisitsComponent } from './prerequisits/prerequisits.component';
import { DosndontsComponent } from './dosndonts/dosndonts.component';
import { TermsnconditionComponent } from './termsncondition/termsncondition.component';
import { FacialMatchComponent } from './facial-match/facial-match.component';

const routes: Routes = [
  {
    path:'Dashboard',
    component:DashboardComponent
  },
  {
    path:"Prerequisits",
    component:PrerequisitsComponent
  },
  {
    path:"Dosndonts",
    component:DosndontsComponent
  },
  {
    path:"Termsncondition",
    component:TermsnconditionComponent
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
    path:'Question/:id',
    component:EditQuestionsComponent
  },
  {
    path:'Time-management',
    component:TimeManagementComponent
  },
  {
    path:'Display',
    component:DisplayComponent
  },
  {
    path:'Matching',
    component:FacialMatchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
