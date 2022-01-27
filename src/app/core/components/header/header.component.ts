import {Component, OnInit} from '@angular/core';
import {AppPage} from "../../../app-routing.module";
import {NavigationEnd, Router} from "@angular/router";
import {filter, map} from "rxjs";
import {UserSettingsService} from "../../services/user-settings.service";
import {TemperatureUnit} from "../../models/temperature";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  readonly Pages = AppPage;

  /**
   * Keep the last location key, for navigating back to the same weather page
   */
  lastLocationKey: string = '';

  /**
   * The current page is the page that is included in one of the URL segments
   */
  currentPage$ = this.router.events.pipe(
    filter((v: any) => v instanceof NavigationEnd),
    map((v: NavigationEnd) => {
      const segments = v.url.split('/');
      const currentPage = Object.values(this.Pages).find(page => segments.includes(page));
      if (currentPage === AppPage.WEATHER) {
        this.lastLocationKey = segments.reverse()[0];
      }
      return currentPage;
    }),
  );

  get tempUnit() {
    return this.userSettings.tempUnit;
  }

  set tempUnit(unit: TemperatureUnit) {
    this.userSettings.tempUnit = unit;
  }

  constructor(
    private router: Router,
    private userSettings: UserSettingsService,
  ) { }

  ngOnInit(): void {}

}
