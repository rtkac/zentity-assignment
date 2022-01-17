import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  PRIMARY_OUTLET,
  Router,
  UrlSegment,
  UrlSegmentGroup,
  UrlTree,
} from '@angular/router';
import { filter, map, Subscription, distinctUntilChanged, BehaviorSubject, first } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { HeaderParams } from '../../models/header.model';
import { UserFacade } from '../../store/user/user.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() className = '';
  isUserOnboarded = false;
  userFullName?: string = '';
  userSubscription$ = new Subscription();
  headerParamsSubscription$ = new BehaviorSubject<HeaderParams | null>(null);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private userFacade: UserFacade,
  ) {}

  ngOnInit(): void {
    this.userSubscription$ = this.userFacade.user$.subscribe((userState) => {
      this.userFullName = userState.user?.user.username;
    });
    this.authService.isAuthorized.then((isUserAuthorized) => {
      if (isUserAuthorized) {
        this.isUserOnboarded = true;
      }
    });

    this.listenForRouteChange();
    this.createHeaderParams();
  }

  private listenForRouteChange(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        distinctUntilChanged(),
      )
      .subscribe(() => {
        this.createHeaderParams();
      });
  }

  private createHeaderParams() {
    const tree: UrlTree = this.router.parseUrl(window.location.pathname);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const segments: UrlSegment[] = g?.segments;

    if (segments?.length) {
      return segments.map((segment) => {
        switch (segment.path) {
          case 'username':
            return this.headerParamsSubscription$.next({
              routePath: '/',
            });
          case 'password':
            return this.headerParamsSubscription$.next({
              routePath: '/username',
              title: this.userFullName,
            });
          case 'profile':
            return this.headerParamsSubscription$.next({
              title: 'Edit your profile',
            });
        }
      });
    }
    return this.headerParamsSubscription$.next({
      routePath: undefined,
      title: undefined,
    });
  }

  handleRoute(): void {
    this.headerParamsSubscription$.pipe(first()).subscribe((param) => {
      this.router.navigate([param?.routePath]);
    });
  }

  ngOnDestroy(): void {
    this.userSubscription$.unsubscribe();
  }
}
