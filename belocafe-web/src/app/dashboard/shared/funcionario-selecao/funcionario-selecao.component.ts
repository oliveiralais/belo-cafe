import { Component, Inject } from '@angular/core';
import { Funcionario } from '../../models/funcionario';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-funcionario-selecao',
  templateUrl: './funcionario-selecao.component.html',
  styleUrls: ['./funcionario-selecao.component.css']
})
export class FuncionarioSelecaoComponent {

  displayedColumns: string[] = ['selecionar', 'nome', 'funcao', 'salario'];

  constructor(
    public dialogRef: MatDialogRef<FuncionarioSelecaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { funcionarios: Funcionario[], selected: Funcionario[] }
  ) {}

  toggleAllSelection(event: MatCheckboxChange) {
    if (event.checked) {
      // Se o checkbox "Selecionar todos" estiver marcado, seleciona todos os funcionários
      this.data.selected = [...this.data.funcionarios];
    } else {
      // Caso contrário, desmarca todos os funcionários
      this.data.selected = [];
    }
  }

  toggleSelection(funcionario: Funcionario) {
    const index = this.data.selected.findIndex(
      (selected) => selected.id === funcionario.id
    );

    if (index === -1) {
      // Se o funcionário não estiver na lista de selecionados, adiciona-o
      this.data.selected.push(funcionario);
    } else {
      // Caso contrário, remove-o
      this.data.selected.splice(index, 1);
    }
  }

  verifySelection(funcionario: Funcionario) {
    return this.data.selected.findIndex(
      (selected) => selected.id === funcionario.id
    ) !== -1;
  }

  verifyAllSelection() {
    return this.data.selected.length === this.data.funcionarios.length;
  }

  onSave() {
    this.dialogRef.close(this.data.selected);
  }
}
