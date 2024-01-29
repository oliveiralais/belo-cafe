import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/dashboard/models/user';
import { Insumo } from 'src/app/dashboard/models/insumo';
import { InsumoService } from 'src/app/dashboard/services/insumo.service';
import { TipoInsumo } from 'src/app/dashboard/models/tipo-insumo';
import { TipoInsumoService } from 'src/app/dashboard/services/tipo-insumo.service';

@Component({
  selector: 'app-new-insumo',
  templateUrl: './new-insumo.component.html',
  styleUrls: ['./new-insumo.component.css'],
})
export class NewInsumoComponent {
  insumoFormGroup!: FormGroup;
  insumo!: Insumo;
  user!: User;
  tiposInsumo!: TipoInsumo[];

  constructor(
    private insumoService: InsumoService,
    private tiposInsumoService: TipoInsumoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.insumoFormGroup = this.formBuilder.group({
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),

      alvo: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),

      principioAtivo: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),

      unidade: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20),
      ]),

      valor: new FormControl('', [Validators.required, Validators.min(0)]),

      quantidadeAdquirida: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),

      tipoInsumo: new FormControl('', [Validators.required]),

      detalhamentoTipo: new FormControl({ value: '', disabled: true }),
    });

    this.getUser(+localStorage.getItem('user_id')!);
    this.getTiposInsumo();
  }

  get nome() {
    return this.insumoFormGroup.get('nome');
  }
  get alvo() {
    return this.insumoFormGroup.get('alvo');
  }
  get principioAtivo() {
    return this.insumoFormGroup.get('principioAtivo');
  }
  get unidade() {
    return this.insumoFormGroup.get('unidade');
  }
  get valor() {
    return this.insumoFormGroup.get('valor');
  }
  get quantidadeAdquirida() {
    return this.insumoFormGroup.get('quantidadeAdquirida');
  }
  get tipoInsumo() {
    return this.insumoFormGroup.get('tipoInsumo');
  }
  get detalhamentoTipo() {
    return this.insumoFormGroup.get('detalhamentoTipo');
  }

  getUser(id: number): any {
    this.insumoService.getUsuario(id).subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }

  getTiposInsumo(): any {
    this.tiposInsumoService.getAll().subscribe({
      next: (tiposInsumo) => {
        this.tiposInsumo = tiposInsumo;
      },
    });
  }

  handleTipoSelection(): any {
    if (this.tipoInsumo!.value.nome === 'OUTROS') {
      this.detalhamentoTipo!.setValidators([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]);
      this.detalhamentoTipo!.enable();
    } else {
      this.detalhamentoTipo!.clearValidators();
      this.detalhamentoTipo!.disable();
    }

    this.detalhamentoTipo!.updateValueAndValidity();
  }

  createInsumo(): Insumo {
    return new Insumo(
      this.nome!.value,
      this.alvo!.value,
      this.principioAtivo!.value,
      this.unidade!.value,
      this.valor!.value,
      this.quantidadeAdquirida!.value,
      this.quantidadeAdquirida!.value,
      this.valor!.value * this.quantidadeAdquirida!.value,
      this.tipoInsumo!.value,
      this.detalhamentoTipo!.value,
      this.user
    );
  }

  onSubmit(): void {
    if (this.insumoFormGroup.invalid) {
      this.insumoFormGroup.markAllAsTouched();
      return;
    } else {
      this.insumo = this.createInsumo();

      this.insumoService.save(this.insumo).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/insumos']);
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }
  }
}
