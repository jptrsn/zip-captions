import { Component, ElementRef, OnDestroy, OnInit, Renderer2, Signal, ViewChild, WritableSignal, signal } from '@angular/core';
import { NavigationEnd, NavigationStart, Route, Router } from '@angular/router';

import { Platform } from '@angular/cdk/platform';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { Subject, filter, map, switchMap, takeUntil } from 'rxjs';
import { AppPlatform, AppState } from '../../models/app.model';
import { RecognitionStatus } from '../../models/recognition.model';
import { recognitionStatusSelector } from '../../selectors/recognition.selector';
import { MenuItem } from './header.model';
import { animate, style, transition, trigger } from '@angular/animations';
import { platformSelector } from '../../selectors/app.selector';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('growshrink', [
      transition('true => false', [style({ height: '{{startHeight}}px', opacity: 0 }), animate('.5s ease')], {
        params: { startHeight: 24 }
      }),
      transition('false => true', [style({ height: '{{startHeight}}px', opacity: 0 }), animate('.5s ease')], {
        params: { startHeight: 72 }
      })
    ])
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('menu', {read: ElementRef}) menuElement!: ElementRef;
  public menuItems: MenuItem[];
  public activeRoute: WritableSignal<string>;
  public showRecordButton: Signal<boolean | undefined>;
  public isActive: Signal<boolean | undefined>;
  
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private router: Router,
              private store: Store<AppState>,
              private renderer: Renderer2) {
    
    this.isActive = toSignal(this.store.pipe(
      select(recognitionStatusSelector),
      map((status: RecognitionStatus) => status === RecognitionStatus.connected)
    ))

    this.activeRoute = signal(this.router.url);
    this.router.events.pipe(
      filter((ev) => ev instanceof NavigationStart),
      takeUntil(this.onDestroy$)
    ).subscribe((ev) => {
      this.renderer.removeAttribute(this.menuElement.nativeElement, 'open')
    })
    this.menuItems = this.router.config.map((route: Route) => {
      return {
        label: route.data?.['name'] || route.path,
        routerOutlet: `/${route.path}`
      }
    });
    this.showRecordButton = toSignal(this.store.pipe(select(platformSelector), map((platform) => platform === AppPlatform.desktop)))
  }

  ngOnInit(): void {
    this.router.events.pipe(
      takeUntil(this.onDestroy$),
      filter((ev: any) => ev instanceof NavigationEnd)
    ).subscribe((ev: NavigationEnd) => {
      this.activeRoute.set(ev.url);
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
