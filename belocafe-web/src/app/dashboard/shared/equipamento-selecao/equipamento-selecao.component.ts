import { Component, Inject } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Equipamento } from '../../models/equipamento';

@Component({
  selector: 'app-equipamento-selecao',
  templateUrl: './equipamento-selecao.component.html',
  styleUrls: ['./equipamento-selecao.component.css']
})
export class EquipamentoSelecaoComponent {
  displayedColumns: string[] = ['selecionar', 'nome', 'anoFabricacao', 'manutencao'];

  constructor(
    public dialogRef: MatDialogRef<EquipamentoSelecaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { equipamentos: Equipamento[], selected: Equipamento[] }
  ) {}

  toggleAllSelection(event: MatCheckboxChange) {
    if (event.checked) {
      // Se o checkbox "Selecionar todos" estiver marcado, seleciona todos os funcionários
      this.data.selected = [...this.data.equipamentos];
    } else {
      // Caso contrário, desmarca todos os funcionários
      this.data.selected = [];
    }
  }

  toggleSelection(equipamento: Equipamento) {
    const index = this.data.selected.findIndex(
      (selected) => selected.id === equipamento.id
    );

    if (index === -1) {
      // Se o funcionário não estiver na lista de selecionados, adiciona-o
      this.data.selected.push(equipamento);
    } else {
      // Caso contrário, remove-o
      this.data.selected.splice(index, 1);
    }
  }

  verifySelection(equipamento: Equipamento) {
    return this.data.selected.findIndex(
      (selected) => selected.id === equipamento.id
    ) !== -1;
  }

  verifyAllSelection() {
    return this.data.selected.length === this.data.equipamentos.length;
  }

  onSave() {
    this.dialogRef.close(this.data.selected);
  }
}
