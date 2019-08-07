import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { of, BehaviorSubject } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let mocks: any;
  mocks = {
    http: jasmine.createSpyObj('http', ['get']),
    countryService: jasmine.createSpyObj('countryService', ['changeCountry', 'getCountryDataByCountryCode']),
  };

  beforeEach(() => {
    component = new HeaderComponent(mocks.countryService, mocks.http);
  });

  describe('getCountryData', () => {
    it('should call the service and get the result', () => {
      const event = 'test';
      // ARRANGE
      const countryRegion = 'asia';

      mocks.countryService.changeCountry.and.returnValue(of(countryRegion));
      // ACT
      component.getCountryData(event, countryRegion);
      // ASSERT
      expect(mocks.countryService.changeCountry).toHaveBeenCalledWith('/region/' + countryRegion);

    });
  });

  describe('ngOnInit', () => {
    it('should call the init method and get the search value with the help of servcie', () => {
      const countryData = 'gb';
      // ARRANGE
      spyOn(component, 'init').and.callThrough();
      mocks.countryService.clearCode = new BehaviorSubject<any>('');
      spyOn(mocks.countryService.clearCode, 'subscribe').and.returnValue(of(countryData));
      // ACT
      component.ngOnInit();
      // ASSERT
      expect(component.init).toHaveBeenCalled();
    });
  });

  describe('keyDownFunction', () => {
    it('should call the api after press the enter and get the result', () => {
      // ARRANGE
      const event = {
        keyCode: 13,
        target: {
        value: 'gb'
        }
      };
      const expectedCountries = [{
        name: 'test1',
        capital: 'testcap1'
      }];
      mocks.http.get.and.returnValue(of(expectedCountries));
      mocks.countryService.getCountryDataByCountryCode.and.returnValue(of(true));
      // ACT
      component.keyDownFunction(event);
      // ASSERT
      expect(mocks.http.get).toHaveBeenCalledWith('https://restcountries.eu/rest/v2/alpha?codes=' +  event.target.value);
      expect(mocks.countryService.getCountryDataByCountryCode).toHaveBeenCalledWith(expectedCountries);
    });
  });

});

