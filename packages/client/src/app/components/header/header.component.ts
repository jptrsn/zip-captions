import { Component, OnDestroy, OnInit, WritableSignal, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject, takeUntil, filter } from 'rxjs';
import { MenuItem } from './header.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public menuItems: MenuItem[];
  public activeRoute: WritableSignal<string>;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private router: Router) {
    this.activeRoute = signal(this.router.url);
    this.menuItems = [
      {
        label: 'home',
        routerOutlet: '/'
      },
      {
        label: 'about',
        routerOutlet: '/about'
      }
    ];
  }

  ngOnInit(): void {
    this.router.events.pipe(
      takeUntil(this.onDestroy$),
      filter((ev: any) => ev instanceof NavigationEnd)
    ).subscribe((ev: NavigationEnd) => {
      this.activeRoute.set(ev.url);
    })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
