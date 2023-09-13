import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { RequestStatus } from 'src/app/models/request-status.model';
import { CommercialService } from '../../../../services/commercial.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  form = this.formBuilder.nonNullable.group({
    code: ['', [Validators.required]],
    name: ['', [Validators.required]],
    password: ['', [Validators.minLength(4), Validators.required]],
  });

  status: RequestStatus = 'init';
  statusUser: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  showRegister = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private commercialService: CommercialService
  ) {}

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { code, name, password } = this.form.getRawValue();
      const codeString = String(code);
      this.commercialService.register(codeString, name, password).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.status = 'failed';
          console.log(error);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
