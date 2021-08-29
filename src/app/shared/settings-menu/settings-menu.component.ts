import { Component, OnDestroy, OnInit } from '@angular/core';

import { NbDialogService, NbMenuItem, NbMenuService, NbWindowService } from '@nebular/theme';

import { BehaviorSubject, concat, fromEvent, Observable, of, Subject } from 'rxjs';
import { debounceTime, filter, map, switchMap, takeUntil } from 'rxjs/operators';

import { AuthService } from '@core/services';

import { ProfileComponent } from '@shared/profile';

import { User } from '@core/models';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss']
})
export class SettingsMenuComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();
  private menuItems: NbMenuItem[] = [
    { title: 'Perfil', icon: 'person-outline' },
    { title: 'Sair', icon: 'log-out-outline' }
  ];
  public menuItems$: Observable<NbMenuItem[]> = of();
  public menuTag = 'settings-menu';
  public user$: Observable<User> = of();
  public innerWidth$ = new BehaviorSubject<number>(window.innerWidth);

  constructor(
    private windowService: NbWindowService,
    private dialogService: NbDialogService,
    private menuService: NbMenuService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.user$ = this.getUser();
    this.menuItems$ = this.getMenuItems();

    this.menuClickEvents();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private openProfileModal() {
    const modal = this.windowService.open(
      ProfileComponent,
      {
        title: 'Perfil',
        hasBackdrop: true,
        context: { user: this.authService.currentUserValue },
        windowClass: 'profile-modal'
      }
    );
  }

  private menuClickEvents(): void {
    this.menuService.onItemClick()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(menu => menu.tag === this.menuTag)
      )
      .subscribe(menu => {
        switch (menu.item.title.toLowerCase()) {
          case 'sair':
            this.authService.logout();
            break;

          case 'perfil':
            this.openProfileModal();
            break;

          default:
            break;
        }
      });
  }

  private getUser(): Observable<User> {
    return this.authService.currentUser$;
  }

  private getMenuItems(): Observable<NbMenuItem[]> {
    const resize$ = concat(
      of(window.innerWidth),
      fromEvent(window, 'resize').pipe(debounceTime(200)),
    );
    return of(this.menuItems)
      .pipe(
        switchMap(menuItems => this.user$.pipe(map(user => ({ user, menuItems })))),
        map(res => {
          const { menuItems, user } = res;
          if (!user) {
            return this.removeMenuEntries(menuItems, [
              'sair',
            ]);
          }

          return this.removeMenuEntries(menuItems, ['entrar']);
        }),
        switchMap(menuItems => resize$.pipe(
          map((ev: any) => {
            let restrictions = [];
            if (typeof ev != 'number') {
              this.innerWidth$.next(ev.target.innerWidth);

              if (ev.target.innerWidth >= 1026) {
                restrictions.push('pesquisar');
              }

            } else if (typeof ev === 'number' && ev >= 1026) {
              this.innerWidth$.next(ev);
              restrictions.push('pesquisar');

              if (ev >= 769) {
                restrictions.push('endereço');
              }
            }
            return this.removeMenuEntries(menuItems, restrictions);
          })
        ))
      );
  }

  private removeMenuEntries(menuItems: NbMenuItem[], entriesToRemove: string[]): NbMenuItem[] {
    entriesToRemove = entriesToRemove.map(s => s.toLowerCase());
    return menuItems.filter(m => entriesToRemove.indexOf(m.title.toLowerCase()) == -1);
  }
}
