import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

import Swal from 'sweetalert2';
import { RequestStatus } from 'src/app/models/request-status.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
})
export class TodoDialogComponent {
  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private dialogRef: DialogRef<any>,
    @Inject(DIALOG_DATA) data: any
  ) {
    this.clientData = data;
    this.initializeForm();
  }
  status: RequestStatus = 'init';
  faX = faX;
  clientData!: any;
  form: any = FormGroup;

  initializeForm() {
    const defaultFormValues = {
      code: '',
      fullName: '',
      income: '',
      age: '',
      passwordAccess: '',
      city: '',
    };

    if (this.clientData) {
      this.form = this.formBuilder.group({
        code: [this.clientData.code || '', [Validators.required]],
        fullName: [this.clientData.fullName || '', [Validators.required]],
        passwordAccess: [
          this.clientData.passwordAccess || '',
          [Validators.required],
        ],
        age: [this.clientData.age || ''],
        income: [this.clientData.income || ''],
        city: [this.clientData.city || ''],
      });
    } else {
      this.form = this.formBuilder.group(defaultFormValues);
    }
  }

  create() {
    if (this.form.valid) {
      const { code, fullName, passwordAccess } = this.form.getRawValue();
      const stringCode = String(code);
      this.clientService
        .create(stringCode, fullName, passwordAccess)
        .subscribe({
          next: () => {
            this.status = 'success';
            Swal.fire({
              icon: 'success',
              title: `Se ha creado correctamente el cliente`,
            }).then((status) => {
              if (status.isConfirmed) {
                window.location.reload();
              }
            });
          },
          error: (error) => {
            this.status = 'failed';
            Swal.fire({
              icon: 'error',
              title: `${error.error.message} con este tipo de cliente`,
            });
          },
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  update() {
    const { code, fullName, city, age, passwordAccess, income } =
      this.form.getRawValue();
    const stringCode = String(code);

    this.clientService
      .update(stringCode, fullName, passwordAccess, city, income, age)
      .subscribe({
        next: () => {
          this.status = 'success';
          Swal.fire({
            icon: 'success',
            title: `Se ha actualizado correctamente el cliente`,
          }).then((status) => {
            if (status.isConfirmed) {
              window.location.reload();
            }
          });
        },
        error: (error) => {
          this.status = 'failed';
          Swal.fire({
            icon: 'error',
            title: `${error.error.message}`,
          });
        },
      });
  }

  exit() {
    this.dialogRef.close();
  }
}
