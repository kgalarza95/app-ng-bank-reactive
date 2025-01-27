import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbSubject = new BehaviorSubject<string>('Dashboard');
  breadcrumb$ = this.breadcrumbSubject.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateBreadcrumb(event.urlAfterRedirects);
    });
  }

  updateBreadcrumb(url: string) {
    let breadcrumbText = 'Banking System';

    if (url.includes('/users')) {
      breadcrumbText = 'Administration > Users';
    } else if (url.includes('/roles')) {
      breadcrumbText = 'Administration > Roles';
    } else if (url.includes('/customer')) {
      breadcrumbText = 'Application > Customer';
    } else if (url.includes('/account')) {
      breadcrumbText = 'Application > Account';
    } else if (url.includes('/transaction')) {
      breadcrumbText = 'Application > Transaction';
    }

    this.breadcrumbSubject.next(breadcrumbText);
  }
}
