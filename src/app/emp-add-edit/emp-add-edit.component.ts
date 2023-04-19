import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css'],
})
export class EmpAddEditComponent implements OnInit {
  education: string[] = ['Matric', 'Diplom', 'Under Graduate', 'Post Graduate'];
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _empservice: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      {
        if (this.data) {
          this._empservice
            .updateEmployee(this.data.id, this.empForm.value)
            .subscribe({
              next: (val: any) => {
                this._coreService.openSnackBar('Employee Updated successfully');
                this._dialogRef.close(true);
              },
              error: (err: any) => {
                console.log(err);
              },
            });
        } else {
          this._empservice.addEmployee(this.empForm.value).subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Employee added successfully');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.log(err);
            },
          });
        }
      }
    }
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
}
