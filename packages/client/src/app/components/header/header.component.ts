import { Component, ElementRef, OnDestroy, OnInit, Renderer2, Signal, ViewChild, WritableSignal, signal } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import { animate, style, transition, trigger } from '@angular/animations';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { Subject, filter, map, takeUntil } from 'rxjs';
import { AppPlatform, AppState } from '../../models/app.model';
import { RecognitionStatus } from '../../models/recognition.model';
import { platformSelector } from '../../selectors/app.selector';
import { selectIsBroadcasting } from '../../selectors/peer.selectors';
import { recognitionStatusSelector } from '../../selectors/recognition.selector';
import { MenuItem } from './header.model';
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
  public isBroadcasting: Signal<boolean | undefined>;
  
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private router: Router,
              private store: Store<AppState>,
              private renderer: Renderer2) {
    
    this.isActive = toSignal(this.store.pipe(
      select(recognitionStatusSelector),
      map((status: RecognitionStatus) => status === RecognitionStatus.connected)
    ));

    this.isBroadcasting = toSignal(this.store.select(selectIsBroadcasting));

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
      { label: 'about', routerOutlet: '/about' },
      { label: 'policies', children: [
        { label: 'privacy', routerOutlet: '/privacy' },
        { label: 'terms', routerOutlet: '/terms' },
        { label: 'cookies', routerOutlet: '/cookies' }
      ]},
      { label: 'settings', routerOutlet: '/settings' },
      { label: 'support', children: [
        { label: 'github', href: 'https://github.com/jptrsn/zip-captions/issues' },
        { label: 'discord', href: 'https://discord.gg/Swe2JeHnPc' },
        { label: 'helpdesk', href: 'https://zipcaptions.zohodesk.com/portal/en/home' },
        { label: 'donate', href: 'https://www.buymeacoffee.com/zipcaptions' }
      ]}
    ]
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
