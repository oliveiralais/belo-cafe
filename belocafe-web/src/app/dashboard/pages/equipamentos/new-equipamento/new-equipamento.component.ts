import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/dashboard/models/user';
import { Equipamento } from 'src/app/dashboard/models/equipamento';
import { EquipamentoService } from 'src/app/dashboard/services/equipamento.service';

@Component({
  selector: 'app-new-equipamento',
  templateUrl: './new-equipamento.component.html',
  styleUrls: ['./new-equipamento.component.css']
})
export class NewEquipamentoComponent {
  equipamentoFormGroup!: FormGroup;
  equipamento!: Equipamento;
  usuario!: User;

  constructor(
    private equipamentoService: EquipamentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.equipamentoFormGroup = this.formBuilder.group({

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
    return this.equipamentoFormGroup.get('nome');
  }
  get descricao() {
    return this.equipamentoFormGroup.get('descricao');
  }
  get fabricante() {
    return this.equipamentoFormGroup.get('fabricante');
  }
  get anoFabricacao() {
    return this.equipamentoFormGroup.get('anoFabricacao');
  }
  get modelo() {
    return this.equipamentoFormGroup.get('modelo');
  }
  get valorCompra() {
    return this.equipamentoFormGroup.get('valorCompra');
  }
  get dataCompra() {
    return this.equipamentoFormGroup.get('dataCompra');
  }
  get depreciacao() {
    return this.equipamentoFormGroup.get('depreciacao');
  }
  get manutencao() {
    return this.equipamentoFormGroup.get('manutencao');
  }

  getUsuario(id: number): any {
    this.equipamentoService.getUsuario(id).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
      },
    });
  }

  createEquipamento(): Equipamento {
    return new Equipamento(
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
    if (this.equipamentoFormGroup.invalid) {
      this.equipamentoFormGroup.markAllAsTouched();
      return;
    } else {
      this.equipamento = this.createEquipamento();

      this.equipamentoService.save(this.equipamento).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/equipamentos']);
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }
  }

}
