import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.container.html',
  styleUrls: ['./not-found.container.scss'],
})
export class NotFoundContainer implements OnInit {
  isUserOnboarded = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthorized.then((isUserAuthorized) => {
      if (isUserAuthorized) {
        this.isUserOnboarded = true;
      }
    });
  }
}
