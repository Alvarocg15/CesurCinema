import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'CesurCinema';
  constructor(
    private translate: TranslateService,
    //private authService: AuthService,
    private router: Router
  ) {
    this.setAppLanguage();
  }

  setAppLanguage() {
    this.translate.setDefaultLang('es');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang ? browserLang : 'es');
  }

  ngOnInit(): void {
    // this.authService.keepUserLoggedIn();
    // if (this.authService.isAuthenticated()) {
    //   const decodedToken = this.authService.decodedToken;
    //   if (decodedToken) {

    //   }
    // }
  }
}
