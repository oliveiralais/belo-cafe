import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';
import { GlebaService } from '../../services/gleba.service';
import { FuncionarioService } from '../../services/funcionario.service';
import { InsumoService } from '../../services/insumo.service';
import { AtividadeService } from '../../services/atividade.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userId!: number;

  constructor(
    private atividadeService: AtividadeService,
    private glebaService: GlebaService,
    private funcionarioService: FuncionarioService,
    private insumoService: InsumoService,
  ) {
    this.userId = parseInt(localStorage.getItem('user_id')!);
  }

  atividadeCount: number = 0;
  glebaCount: number = 0;
  funcionarioCount: number = 0;
  insumoCount: number = 0;

  adubacaoCount: number = 0;
  beneficiamentoCount: number = 0;
  calagemCount: number = 0;
  colheitaCount: number = 0;
  irrigacaoCount: number = 0;
  plantioCount: number = 0;
  pulverizacaoCount: number = 0;

  chartOption!: EChartsOption;
  barChartOption!: EChartsOption;
  barChartOption2!: EChartsOption;
  pieChartOption!: EChartsOption;

  months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  ngOnInit() {
    this.atividadeService.getAll().subscribe((atividades) => {
      this.atividadeCount = atividades.length;
    });
    this.glebaService.getAll().subscribe((glebas) => {
      this.glebaCount = glebas.length;
    });
    this.funcionarioService.getAll().subscribe((funcionarios) => {
      this.funcionarioCount = funcionarios.length;
    });
    this.insumoService.getAll().subscribe((insumos) => {
      this.insumoCount = insumos.length;
    });

    this.getCustoPrevistoPorMes();
    this.getAtividadesPorMes();
    this.getAtividadesPorTipo();
    this.getCustoPrevistoPorGleba();
  }

  getCustoPrevistoPorMes(){
    this.atividadeService.getCustoPrevistoPorMes(this.userId).subscribe((data) => {
      this.chartOption = {
        color: '#c00',
        xAxis: {
          type: 'category',
          data: data.map((item: any) => this.months[item[0] - 1]),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: data.map((item: any) => item[1]),
            type: 'line',
            areaStyle: {
              color: '#f00',
              opacity: 0.4
            }
          },
        ],
      };
    });
  }

  getAtividadesPorMes(){
    this.atividadeService.getAtividadesPorMes(this.userId).subscribe((data) => {
      this.barChartOption = {
        color: '#060',
        xAxis: {
          type: 'category',
          data: data.map((item: any) => this.months[item[0] - 1]),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: data.map((item: any) => item[1]),
            type: 'bar',
          },
        ],
      };
    });
  }

  getAtividadesPorTipo() {
    const observables = [
      this.atividadeService.findByTipoAtividadeIdAndUsuarioIdPaginate(1, this.userId, 0, 1),
      this.atividadeService.findByTipoAtividadeIdAndUsuarioIdPaginate(2, this.userId, 0, 1),
      this.atividadeService.findByTipoAtividadeIdAndUsuarioIdPaginate(3, this.userId, 0, 1),
      this.atividadeService.findByTipoAtividadeIdAndUsuarioIdPaginate(4, this.userId, 0, 1),
      this.atividadeService.findByTipoAtividadeIdAndUsuarioIdPaginate(5, this.userId, 0, 1),
      this.atividadeService.findByTipoAtividadeIdAndUsuarioIdPaginate(6, this.userId, 0, 1),
      this.atividadeService.findByTipoAtividadeIdAndUsuarioIdPaginate(7, this.userId, 0, 1),
    ];

    forkJoin(observables).subscribe((dataArray:any) => {
      this.adubacaoCount = dataArray[0].page.totalElements;
      this.beneficiamentoCount = dataArray[1].page.totalElements;
      this.calagemCount = dataArray[2].page.totalElements;
      this.colheitaCount = dataArray[3].page.totalElements;
      this.irrigacaoCount = dataArray[4].page.totalElements;
      this.plantioCount = dataArray[5].page.totalElements;
      this.pulverizacaoCount = dataArray[6].page.totalElements;

      this.pieChartOption = {
        legend: {
          orient: 'horizontal',
          align: 'left',
          data: ['Adubação', 'Beneficiamento', 'Calagem', 'Colheita', 'Irrigação', 'Plantio', 'Pulverização']
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '16',
                fontWeight: 'bold'
              }
            },
            data: [
              { value: this.adubacaoCount, name: 'Adubação' },
              { value: this.beneficiamentoCount, name: 'Beneficiamento' },
              { value: this.calagemCount, name: 'Calagem' },
              { value: this.colheitaCount, name: 'Colheita' },
              { value: this.irrigacaoCount, name: 'Irrigação' },
              { value: this.plantioCount, name: 'Plantio' },
              { value: this.pulverizacaoCount, name: 'Pulverização' }
            ]
          }
        ]
      };
    });
  }

  getCustoPrevistoPorGleba(){
    this.atividadeService.getCustoPrevistoPorGleba(this.userId).subscribe((data) => {
      this.barChartOption2 = {
        color: '#006',
        xAxis: {
          type: 'category',
          data: data.map((item: any) => item[0]),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: data.map((item: any) => item[1]),
            type: 'bar',
          },
        ],
      };
    });
  }

}
