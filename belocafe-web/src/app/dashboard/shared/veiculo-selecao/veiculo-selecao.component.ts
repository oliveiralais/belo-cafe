import { Component, Inject } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Veiculo } from '../../models/veiculo';

@Component({
  selector: 'app-veiculo-selecao',
  templateUrl: './veiculo-selecao.component.html',
  styleUrls: ['./veiculo-selecao.component.css']
})
export class VeiculoSelecaoComponent {
  displayedColumns: string[] = ['selecionar', 'nome', 'anoFabricacao', 'manutencao'];

  constructor(
    public dialogRef: MatDialogRef<VeiculoSelecaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { veiculos: Veiculo[], selected: Veiculo[] }
  ) {}

  toggleAllSelection(event: MatCheckboxChange) {
    if (event.checked) {
      // Se o checkbox "Selecionar todos" estiver marcado, seleciona todos os funcionários
      this.data.selected = [...this.data.veiculos];
    } else {
      // Caso contrário, desmarca todos os funcionários
      this.data.selected = [];
    }
  }

  toggleSelection(veiculo: Veiculo) {
    const index = this.data.selected.findIndex(
      (selected) => selected.id === veiculo.id
    );

    if (index === -1) {
      // Se o funcionário não estiver na lista de selecionados, adiciona-o
      this.data.selected.push(veiculo);
    } else {
      // Caso contrário, remove-o
      this.data.selected.splice(index, 1);
    }
  }

  verifySelection(veiculo: Veiculo) {
    return this.data.selected.findIndex(
      (selected) => selected.id === veiculo.id
    ) !== -1;
  }

  verifyAllSelection() {
    return this.data.selected.length === this.data.veiculos.length;
  }

  onSave() {
    this.dialogRef.close(this.data.selected);
  }
}
