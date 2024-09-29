import { Component, ElementRef, OnDestroy, OnInit, Renderer2, Signal, ViewChild, ViewEncapsulation, WritableSignal, effect, signal } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import { animate, style, transition, trigger } from '@angular/animations';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { Subject, filter, map, takeUntil } from 'rxjs';
import { AppPlatform, AppState } from '../../models/app.model';
import { RecognitionStatus } from '../../models/recognition.model';
import { platformSelector, windowControlsOverlaySelector } from '../../selectors/app.selector';
import { selectIsBroadcasting, selectIsViewing } from '../../selectors/peer.selectors';
import { recognitionStatusSelector } from '../../selectors/recognition.selector';
import { MenuItem } from './header.model';
import { ObsConnectionState } from '../../reducers/obs.reducer';
import { selectObsConnected } from '../../selectors/obs.selectors';
import { selectUserLoggedIn } from '../../selectors/auth.selectors';
import { AuthActions } from '../../actions/auth.actions';
import { selectTranscriptionEnabled } from '../../selectors/settings.selector';
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
  ],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('menu', {read: ElementRef}) menuElement!: ElementRef;
  public menuItems: MenuItem[];
  public activeRoute: WritableSignal<string>;
  public showRecordButton: Signal<boolean | undefined>;
  public isActive: Signal<boolean | undefined>;
  public isBroadcasting: Signal<boolean | undefined>;
  public isViewingBroadcast: Signal<boolean | undefined>;
  public windowControlsOverlay: Signal<boolean | undefined>;
  public showObsConnectionState: Signal<boolean | undefined>;
  public isLoggedIn: Signal<boolean | undefined>;
  public transcriptionEnabled: Signal<boolean | undefined>;
  
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private router: Router,
              private store: Store<AppState>,
              private renderer: Renderer2) {
    
    this.isActive = toSignal(this.store.pipe(
      select(recognitionStatusSelector),
      map((status: RecognitionStatus) => status === RecognitionStatus.connected)
    ));

    this.isBroadcasting = toSignal(this.store.select(selectIsBroadcasting));
    this.isViewingBroadcast = toSignal(this.store.select(selectIsViewing));
    this.showObsConnectionState = toSignal<boolean>(this.store.pipe(select(selectObsConnected), map((state) => state !== ObsConnectionState.uninitialized)));

    this.isLoggedIn = toSignal<boolean | undefined>(this.store.select(selectUserLoggedIn));
    this.transcriptionEnabled = toSignal(this.store.select(selectTranscriptionEnabled));

    this.activeRoute = signal(this.router.url);
    this.router.events.pipe(
      filter((ev) => ev instanceof NavigationStart),
      takeUntil(this.onDestroy$)
    ).subscribe((ev) => {
      if (this.menuElement?.nativeElement) {
        this.renderer.removeAttribute(this.menuElement.nativeElement, 'open')
      }
    })
    
    this.menuItems = [
      { label: 'home', routerOutlet: '/'},
      { label: 'stream', routerOutlet: '/stream' },
      { label: 'settings', routerOutlet: '/settings' },
      { label: 'transcript', routerOutlet: '/user/transcripts', loginRequired: true },
      { label: 'auth', routerOutlet: '/user', loginRequired: true },
      { label: 'policies', children: [
        { label: 'privacy', routerOutlet: '/privacy' },
        { label: 'terms', routerOutlet: '/terms' },
        { label: 'cookies', routerOutlet: '/cookies' }
      ]},
      { label: 'support', children: [
        { label: 'github', href: 'https://github.com/jptrsn/zip-captions/issues' },
        { label: 'help', href: 'https://help.zipcaptions.app' },
        { label: 'donate', href: 'https://www.patreon.com/zipcaptions' }
      ]}
    ]
    this.showRecordButton = toSignal(this.store.pipe(select(platformSelector), map((platform) => platform === AppPlatform.desktop)));

    this.windowControlsOverlay = toSignal(this.store.select(windowControlsOverlaySelector))
  }

  ngOnInit(): void {
    this.router.events.pipe(
      takeUntil(this.onDestroy$),
      filter((ev: any) => ev instanceof NavigationEnd)
    ).subscribe((ev: NavigationEnd) => {
      console.log('active route', ev.url.substring(0, ev.url.indexOf('?')))
      this.activeRoute.set(ev.url.substring(0, ev.url.indexOf('?')));
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
    if (this.menuElement?.nativeElement) {
      this.renderer.removeAttribute(this.menuElement.nativeElement, 'open')
    }
  }
}
