import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor() { }
   countryRegion = new BehaviorSubject<string>('/all');
  region = this.countryRegion.asObservable();

   countryInfo = new BehaviorSubject<any>('');
  countryData = this.countryInfo.asObservable();

   countryNamebyCode = new BehaviorSubject<string>('');
  countryCode = this.countryNamebyCode.asObservable();

   clearCountryCode = new BehaviorSubject<string>('');
  clearCode = this.clearCountryCode.asObservable();

  changeCountry(country: string) {
    this.countryRegion.next(country);
  }

  changeCountryOnly(c: any) {
    this.countryInfo.next(c);
  }

  getCountryDataByCountryCode(countries: any) {
    this.countryNamebyCode.next(countries);
  }

  clearCountryInfo(code: any) {
    this.clearCountryCode.next(code);
  }
}
