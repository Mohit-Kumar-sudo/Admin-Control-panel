import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation.service';

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
    public translate : TranslateService,
    private translation : TranslationService
  ){
    translate.addLangs(['en','hi'])
    translate.setDefaultLang('en')
    translate.use('en')
    this.browserLang = translate.getDefaultLang();
    this.languageChanged()
    this.translation.setLanguage(this.switchLang)
  }

  selectLanguage(lang:any){
    this.switchLang = lang
    this.translate.use(lang)
    this.translation.setLanguage(lang)
  }

  languageChanged(){
    this.translate.use(this.browserLang.match(/en|hi/)? this.browserLang : 'en')
  }

}
