import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/dashboard/models/user';
import { Maquina } from 'src/app/dashboard/models/maquina';
import { MaquinaService } from 'src/app/dashboard/services/maquina.service';

@Component({
  selector: 'app-new-maquina',
  templateUrl: './new-maquina.component.html',
  styleUrls: ['./new-maquina.component.css']
})
export class NewMaquinaComponent {
  maquinaFormGroup!: FormGroup;
  maquina!: Maquina;
  usuario!: User;

  constructor(
    private maquinaService: MaquinaService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.maquinaFormGroup = this.formBuilder.group({

      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
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
    return this.maquinaFormGroup.get('nome');
  }
  get descricao() {
    return this.maquinaFormGroup.get('descricao');
  }
  get fabricante() {
    return this.maquinaFormGroup.get('fabricante');
  }
  get anoFabricacao() {
    return this.maquinaFormGroup.get('anoFabricacao');
  }
  get modelo() {
    return this.maquinaFormGroup.get('modelo');
  }
  get valorCompra() {
    return this.maquinaFormGroup.get('valorCompra');
  }
  get dataCompra() {
    return this.maquinaFormGroup.get('dataCompra');
  }
  get depreciacao() {
    return this.maquinaFormGroup.get('depreciacao');
  }
  get manutencao() {
    return this.maquinaFormGroup.get('manutencao');
  }

  getUsuario(id: number): any {
    this.maquinaService.getUsuario(id).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
      },
    });
  }

  createMaquina(): Maquina {
    return new Maquina(
      this.nome!.value,
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
    if (this.maquinaFormGroup.invalid) {
      this.maquinaFormGroup.markAllAsTouched();
      return;
    } else {
      this.maquina = this.createMaquina();

      this.maquinaService.save(this.maquina).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/maquinas']);
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }
  }

}
