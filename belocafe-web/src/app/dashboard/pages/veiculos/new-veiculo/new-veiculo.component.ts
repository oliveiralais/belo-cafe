import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/dashboard/models/user';
import { Veiculo } from 'src/app/dashboard/models/veiculo';
import { VeiculoService } from 'src/app/dashboard/services/veiculo.service';

@Component({
  selector: 'app-new-veiculo',
  templateUrl: './new-veiculo.component.html',
  styleUrls: ['./new-veiculo.component.css']
})
export class NewVeiculoComponent {
  veiculoFormGroup!: FormGroup;
  veiculo!: Veiculo;
  usuario!: User;

  constructor(
    private veiculoService: VeiculoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.veiculoFormGroup = this.formBuilder.group({

      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),

      identificacao: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),

      descricao: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),

      fabricante: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),

      anoFabricacao: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),

      modelo: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),

      valorCompra: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),

      dataCompra: new FormControl('', [
        Validators.required,
      ]),

      depreciacao: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(100)
      ]),

      manutencao: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),

    });

    this.getUsuario(+localStorage.getItem('user_id')!);

  }

  get nome() {
    return this.veiculoFormGroup.get('nome');
  }
  get identificacao() {
    return this.veiculoFormGroup.get('identificacao');
  }
  get descricao() {
    return this.veiculoFormGroup.get('descricao');
  }
  get fabricante() {
    return this.veiculoFormGroup.get('fabricante');
  }
  get anoFabricacao() {
    return this.veiculoFormGroup.get('anoFabricacao');
  }
  get modelo() {
    return this.veiculoFormGroup.get('modelo');
  }
  get valorCompra() {
    return this.veiculoFormGroup.get('valorCompra');
  }
  get dataCompra() {
    return this.veiculoFormGroup.get('dataCompra');
  }
  get depreciacao() {
    return this.veiculoFormGroup.get('depreciacao');
  }
  get manutencao() {
    return this.veiculoFormGroup.get('manutencao');
  }

  getUsuario(id: number): any {
    this.veiculoService.getUsuario(id).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
      },
    });
  }

  createVeiculo(): Veiculo {
    return new Veiculo(
      this.nome!.value,
      this.identificacao!.value,
      this.descricao!.value,
      this.fabricante!.value,
      this.anoFabricacao!.value,
      this.modelo!.value,
      this.valorCompra!.value,
      this.dataCompra!.value,
      this.depreciacao!.value,
      this.manutencao!.value,
      this.usuario
    );
  }

  onSubmit(): void {
    if (this.veiculoFormGroup.invalid) {
      this.veiculoFormGroup.markAllAsTouched();
      return;
    } else {
      this.veiculo = this.createVeiculo();

      this.veiculoService.save(this.veiculo).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/veiculos']);
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }
  }

}
