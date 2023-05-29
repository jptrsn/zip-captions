import { Component, OnDestroy, OnInit, WritableSignal, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject, takeUntil, filter, Observable } from 'rxjs';
import { MenuItem } from './header.model';
import { Store } from '@ngrx/store';
import { AudioStreamState, AudioStreamStatus, AudioStreamActions } from '../../models/audio-stream.model';
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
              private store: Store<AudioStreamState>) {

    this.inputState$ = this.store.select('status')
    
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

    this.store.dispatch(AudioStreamActions.connectStream())
    
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

  spanishMessage(): void {
    this.store.dispatch({type: 'SPANISH'})
  }
}
