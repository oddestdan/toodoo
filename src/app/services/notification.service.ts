import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(public snackBar: MatSnackBar, private zone: NgZone) {}

  public open(message: string, duration = 20000, action = 'Got it'): void {
    console.error(message);

    this.zone.run(() => {
      this.snackBar.open(message, action, { duration });
    });
  }
}
