import { Component, ElementRef, OnDestroy, OnInit, Renderer2, Signal, ViewChild, WritableSignal, signal } from '@angular/core';
import { NavigationEnd, NavigationStart, Route, Router } from '@angular/router';

import { Platform } from '@angular/cdk/platform';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { Subject, filter, map, takeUntil } from 'rxjs';
import { AppState } from '../../models/app.model';
import { RecognitionStatus } from '../../models/recognition.model';
import { recognitionStatusSelector } from '../../selectors/recognition.selector';
import { MenuItem } from './header.model';
import { animate, style, transition, trigger } from '@angular/animations';
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
  public showRecordButton: WritableSignal<boolean> = signal(true);
  public isActive: Signal<boolean | undefined>;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private router: Router,
              private platform: Platform,
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
      console.log('close nav menu', this.menuElement)
      this.renderer.removeAttribute(this.menuElement.nativeElement, 'open')
      // TODO: Close nav menu
    })
    this.menuItems = this.router.config.map((route: Route) => {
      return {
        label: $localize`${route.data?.['name'] || route.path}`,
        routerOutlet: `/${route.path}`
      }
    })
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
