import { Component, OnInit } from '@angular/core';
import { CountryService } from '../user_service/country.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  public countries = new Subject<any>();
  public searchValue = '';
  constructor(private countryService: CountryService, private http: HttpClient) {
  }

  ngOnInit() {
    this.init();
  }

  getCountryData(event, countryRegion) {
    this.countryService.changeCountry('/region/' + countryRegion);
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.http.get('https://restcountries.eu/rest/v2/alpha?codes=' + event.target.value).subscribe((country) => {
        this.countryService.getCountryDataByCountryCode(country);
      });
    }
  }

 init() {
    this.countryService.clearCode.subscribe((clearCode: any) => {
      this.searchValue = clearCode;
    });
     // this.countryService.clearCode.subscribe(country => { this.searchValue = country; this.clearSearch() });
  }
}
