import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/Dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./../Components/components.module').then((m) => m.ComponentsModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
