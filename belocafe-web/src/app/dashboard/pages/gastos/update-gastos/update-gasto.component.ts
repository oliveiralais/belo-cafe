import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/dashboard/models/user';
import { Gasto } from 'src/app/dashboard/models/gasto';
import { GastoService } from 'src/app/dashboard/services/gasto.service';

@Component({
  selector: 'app-update-gasto',
  templateUrl: './update-gasto.component.html',
  styleUrls: ['./update-gasto.component.css'],
})
export class UpdateGastoComponent {
  gastoFormGroup!: FormGroup;
  gasto!: Gasto;
  usuario!: User;
  gastoId!: number;

  constructor(
    private gastoService: GastoService,
    private router: Router,
    private route: ActivatedRoute,
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

    this.gastoId = this.route.snapshot.params['id'];

    this.initializeForm(this.gastoId);
  }

  initializeForm(id: number): void {
    this.gastoService.getById(id).subscribe({
      next: (gasto) => {
        this.gastoFormGroup.patchValue(gasto);
      },
    });
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
      this.usuario,
      this.gastoId
    );
  }

  onSubmit(): void {
    if (this.gastoFormGroup.invalid) {
      this.gastoFormGroup.markAllAsTouched();
      return;
    } else {
      this.gasto = this.createGasto();

      this.gastoService.update(this.gasto).subscribe({
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
