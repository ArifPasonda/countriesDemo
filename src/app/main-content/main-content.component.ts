import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CountryService } from '../user_service/country.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  countries: any = [];
  country: string;
  selectedRow : number;
  constructor(private http: HttpClient, private countryService: CountryService) {
  }

  getCountryData(countryRegion) {
    console.log(countryRegion);
    this.http.get(`https://restcountries.eu/rest/v2` + countryRegion).subscribe((country) => {
      this.countries = country;
    });
  }

  getCountryDataByCountryCode(countryCode) {
    this.countries = countryCode;
  }

  ngOnInit() {
    this.init();
  }

  getCountryByName(country: any, index: number) {
    if(this.selectedRow===index){
    this.countryService.changeCountryOnly('');
    this.selectedRow=-1;
    }
    else{
      this.countryService.changeCountryOnly(country);
      this.selectedRow=index;
    }
  }

  clearResult() {
    this.getCountryData('/region/asia');
    this.countryService.changeCountryOnly('');
    this.countryService.clearCountryInfo('');
    this.selectedRow=-1;
  }

  init() {
    this.countryService.region.subscribe(country => { this.country = country; this.getCountryData(this.country); });
    this.countryService.countryCode.subscribe(country => { this.country = country; this.getCountryDataByCountryCode(this.country); });
  }
}
