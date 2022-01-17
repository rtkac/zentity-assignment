import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocialNetwork } from 'src/app/models/user.model';

import { UserFacade } from '../../../store/user/user.facade';

@Component({
  selector: 'app-edit-profile-socials',
  templateUrl: './edit-form-socials.component.html',
  styleUrls: ['./edit-form-socials.component.scss'],
})
export class EditProfileSocials implements OnInit, OnDestroy {
  socialItems?: SocialNetwork[];
  userSubscription$ = new Subscription();

  constructor(private userFacade: UserFacade) {}

  ngOnInit(): void {
    this.userSubscription$ = this.userFacade.user$.subscribe((userState) => {
      this.socialItems = userState.user?.user.contact.socialNetworks;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription$.unsubscribe();
  }
}
