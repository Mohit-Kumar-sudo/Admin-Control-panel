import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

declare interface RouteInfo {
  path: string;
  title: string;
}


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  switchLang:string = 'en';
  browserLang;

  constructor(
    public translate : TranslateService
  ){
    translate.addLangs(['en','hi'])
    translate.setDefaultLang('en')
    translate.use('en')
    this.browserLang = translate.getDefaultLang();
    this.languageChanged()
  }

  selectLanguage(lang:any){
    this.switchLang = lang
    this.translate.use(lang)
  }

  languageChanged(){
    this.translate.use(this.browserLang.match(/en|hi/)? this.browserLang : 'en')
  }

}
