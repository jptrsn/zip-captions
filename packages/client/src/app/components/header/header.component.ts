import { Component, OnDestroy, OnInit, WritableSignal, computed, signal } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { Observable, Subject, filter, takeUntil } from 'rxjs';
import { AppState } from '../../models/app.model';
import { AudioStreamState } from '../../models/audio-stream.model';
import { selectAudioStream } from '../../selectors/audio-stream.selector';
import { MenuItem } from './header.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { Platform } from '@angular/cdk/platform';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public menuItems: MenuItem[];
  public activeRoute: WritableSignal<string>;
  public showRecordButton: WritableSignal<boolean> = signal(true);
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private router: Router,
              private platform: Platform) {
    
    this.activeRoute = signal(this.router.url);
    this.router.events.pipe(
      filter((ev) => ev instanceof NavigationStart),
      takeUntil(this.onDestroy$)
    ).subscribe((ev) => {
      // TODO: Close nav menu
    })
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
    });

    this._checkPlatform();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  private _checkPlatform(): void {
    if (this.platform.ANDROID) {
      this.showRecordButton.set(false);
    }
  }
}
