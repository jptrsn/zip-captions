import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, WritableSignal, signal } from '@angular/core';
import { NavigationEnd, NavigationStart, Route, Router } from '@angular/router';

import { Platform } from '@angular/cdk/platform';
import { Subject, filter, takeUntil } from 'rxjs';
import { MenuItem } from './header.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('title', {read: ElementRef}) titleElement!: ElementRef;
  @ViewChild('menu', {read: ElementRef}) menuElement!: ElementRef;
  public menuItems: MenuItem[];
  public activeRoute: WritableSignal<string>;
  public showRecordButton: WritableSignal<boolean> = signal(true);
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private router: Router,
              private platform: Platform,
              private renderer: Renderer2) {
    
    this.activeRoute = signal(this.router.url);
    this.router.events.pipe(
      filter((ev) => ev instanceof NavigationStart),
      takeUntil(this.onDestroy$)
    ).subscribe((ev) => {
      console.log('close nav menu', this.menuElement)
      this.renderer.removeAttribute(this.menuElement.nativeElement, 'open')
      // TODO: Close nav menu
    })
    this.menuItems = this.router.config.map((route: Route) => {
      return {
        label: route.data?.['name'] || route.path,
        routerOutlet: `/${route.path}`
      }
    })
    console.log(this.router.config)
  }

  ngOnInit(): void {
    this.router.events.pipe(
      takeUntil(this.onDestroy$),
      filter((ev: any) => ev instanceof NavigationEnd)
    ).subscribe((ev: NavigationEnd) => {
      this.activeRoute.set(ev.url);
    });

    this._checkPlatform();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  private _checkPlatform(): void {
    if (this.platform.ANDROID || this.platform.IOS) {
      this.showRecordButton.set(false);
    }
  }
}
