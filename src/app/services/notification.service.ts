import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(public snackBar: MatSnackBar, private zone: NgZone) {}

  public alert(message: string, duration = 10000, action = 'Got it'): void {
    this.zone.run(() => {
      this.snackBar.open(message, action, { duration });
    });
  }

  public undoAlert(
    mode: { undo: boolean },
    revertCallback: Function,
    message: string,
    duration = 3000,
    action = 'Undo'
  ): void {
    this.zone.run(() => {
      this.snackBar
        .open(message, action, { duration })
        .onAction()
        .subscribe(() => revertCallback());
    });
  }
}
