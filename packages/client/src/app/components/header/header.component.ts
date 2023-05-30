import { Component, OnDestroy, OnInit, WritableSignal, signal } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, filter, takeUntil } from 'rxjs';
import { AppState } from '../../models/app.model';
import { AudioStreamActions, AudioStreamStatus } from '../../models/audio-stream.model';
import { statusSelector } from '../../selectors/audio-stream.selector';
import { MenuItem } from './header.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public menuItems: MenuItem[];
  public activeRoute: WritableSignal<string>;
  public inputState$!: Observable<AudioStreamStatus>;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private router: Router,
              private store: Store<AppState>) {

    this.inputState$ = this.store.pipe(select(statusSelector));
    
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
    })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  connectMicrophone(): void {
    this.store.dispatch(AudioStreamActions.connectStream());
  }
}
