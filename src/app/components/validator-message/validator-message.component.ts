import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import * as vMsg from 'src/app/constants/validationMessages';

@Component({
  selector: 'app-validator-message',
  templateUrl: './validator-message.component.html',
  styleUrls: ['./validator-message.component.scss'],
})
export class ValidatorMessageComponent {
  @Input() field: FormControl;

  get validatorMessages() {
    if (!this.field || !this.field.errors) {
      return false;
    }

    const validators = this.field.errors;
    const config = {
      required: vMsg.required(),
      requiredTrue: vMsg.requiredTrue(),
      email: vMsg.email(),
    };

    if (validators.hasOwnProperty('custom')) {
      config['custom'] =
        typeof validators.custom === 'string' && validators.custom.length
          ? validators.custom
          : vMsg.custom();
    }

    if (validators.hasOwnProperty('minlength')) {
      config['minlength'] = vMsg.minLength(validators.minlength.requiredLength);
    }
    if (validators.hasOwnProperty('maxlength')) {
      config['maxlength'] = vMsg.maxLength(validators.maxlength.requiredLength);
    }

    const errors = [];
    Object.keys(validators).forEach((error: string) => {
      errors.push(config[error]);
    });

    return errors;
  }
}
