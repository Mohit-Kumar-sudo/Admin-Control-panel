import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  currentLang: any;

  constructor() {
  }

  setLanguage(lang:any){
    this.currentLang = lang
  }

  getLanguage(){
    return this.currentLang
  }

}
