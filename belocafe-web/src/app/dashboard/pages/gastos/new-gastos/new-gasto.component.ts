import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/dashboard/models/user';
import { Gasto } from 'src/app/dashboard/models/gasto';
import { GastoService } from 'src/app/dashboard/services/gasto.service';

@Component({
  selector: 'app-new-gasto',
  templateUrl: './new-gasto.component.html',
  styleUrls: ['./new-gasto.component.css']
})
export class NewGastoComponent {
  gastoFormGroup!: FormGroup;
  gasto!: Gasto;
  usuario!: User;

  constructor(
    private gastoService: GastoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.gastoFormGroup = this.formBuilder.group({

      type: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),

      code: new FormControl('', [
        Validators.required,
        Validators.min(3),
      ]),

      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),

      amount: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),

      issueDate: new FormControl('', [
        Validators.required,
      ]),

      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),

      cpfCnpj: new FormControl('', [
        Validators.required,
        Validators.minLength(14),
        Validators.maxLength(18)
      ]),

    });

    this.getUsuario(+localStorage.getItem('user_id')!);

  }

  get type() {
    return this.gastoFormGroup.get('type');
  }
  get code() {
    return this.gastoFormGroup.get('code');
  }
  get description() {
    return this.gastoFormGroup.get('description');
  }
  get amount() {
    return this.gastoFormGroup.get('amount');
  }
  get issueDate() {
    return this.gastoFormGroup.get('issueDate');
  }
  get name() {
    return this.gastoFormGroup.get('name');
  }
  get cpfCnpj() {
    return this.gastoFormGroup.get('cpfCnpj');
  }

  getUsuario(id: number): any {
    this.gastoService.getUsuario(id).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
      },
    });
  }

  createGasto(): Gasto {
    return new Gasto(
      this.type!.value,
      this.code!.value,
      this.description!.value,
      this.amount!.value,
      this.issueDate!.value,
      this.name!.value,
      this.cpfCnpj!.value,
      this.usuario
    );
  }

  onSubmit(): void {
    if (this.gastoFormGroup.invalid) {
      this.gastoFormGroup.markAllAsTouched();
      return;
    } else {
      this.gasto = this.createGasto();

      this.gastoService.save(this.gasto).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/gastos']);
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }
  }

}
