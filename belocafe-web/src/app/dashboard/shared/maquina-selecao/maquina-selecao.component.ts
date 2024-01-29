import { Component, Inject } from '@angular/core';
import { Maquina } from '../../models/maquina';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-maquina-selecao',
  templateUrl: './maquina-selecao.component.html',
  styleUrls: ['./maquina-selecao.component.css']
})
export class MaquinaSelecaoComponent {
  displayedColumns: string[] = ['selecionar', 'nome', 'anoFabricacao', 'manutencao'];

  constructor(
    public dialogRef: MatDialogRef<MaquinaSelecaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { maquinas: Maquina[], selected: Maquina[] }
  ) {}

  toggleAllSelection(event: MatCheckboxChange) {
    if (event.checked) {
      // Se o checkbox "Selecionar todos" estiver marcado, seleciona todos os funcionários
      this.data.selected = [...this.data.maquinas];
    } else {
      // Caso contrário, desmarca todos os funcionários
      this.data.selected = [];
    }
  }

  toggleSelection(maquina: Maquina) {
    const index = this.data.selected.findIndex(
      (selected) => selected.id === maquina.id
    );

    if (index === -1) {
      // Se o funcionário não estiver na lista de selecionados, adiciona-o
      this.data.selected.push(maquina);
    } else {
      // Caso contrário, remove-o
      this.data.selected.splice(index, 1);
    }
  }

  verifySelection(maquina: Maquina) {
    return this.data.selected.findIndex(
      (selected) => selected.id === maquina.id
    ) !== -1;
  }

  verifyAllSelection() {
    return this.data.selected.length === this.data.maquinas.length;
  }

  onSave() {
    this.dialogRef.close(this.data.selected);
  }
}
