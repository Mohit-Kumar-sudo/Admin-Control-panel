import { Component } from '@angular/core';
import { Routes } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  // permission: string;
}

const routes: Routes = [
  {
    path:'/Dashboard',
    title:"Dashboard",
  },
  {
    path:'/Question',
    title:"Question",
  },
  {
    path:'Content/prerequisits',
    title:"Prerequisits",
  },
  {
    path:'Content/dos&donts',
    title:"Do's & Dont's",
  },
  {
    path:'Content/terms&condition',
    title:"Terms & Conditions",
  },
  {
    path:'/Time-management',
    title:"Time-management",
  }

]

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  navItems: any = [];

  constructor(){
    this.navItems = routes
  }



}
