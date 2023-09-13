import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { RequestStatus } from 'src/app/models/request-status.model';
import { CommercialService } from '../../../../services/commercial.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  form = this.formBuilder.nonNullable.group({
    code: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: RequestStatus = 'init';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private commercialService: CommercialService
  ) {}

  login() {
    if (this.form.valid) {
      this.status = 'loading';
      const { code, password } = this.form.getRawValue();
      const codeString = String(code);
      this.commercialService.login(codeString, password).subscribe({
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
