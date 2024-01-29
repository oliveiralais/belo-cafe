package br.edu.ifsp.sbv.belocafeapi.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Atividade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne
    private Insumo insumo;

    @Min(0)
    private Double qtdeInsumo;

    @Min(0)
    private Double custoInsumos;

    @NotNull(message = "Tipo da Atividade é obrigatório")
    @ManyToOne
    private TipoAtividade tipoAtividade;

    @NotNull(message = "Gleba é obrigatório")
    @ManyToOne
    private Gleba local;

    @ManyToMany( fetch = FetchType.LAZY )
    @JoinTable( name = "funcionarios_atividade",
            joinColumns = @JoinColumn( name = "atividade_id" ),
            inverseJoinColumns = @JoinColumn( name = "funcionario_id" ) )
    private Set<Funcionario> funcionarios = new HashSet<>();

    @Min(0)
    private Double custoFuncionarios;

    @ManyToMany( fetch = FetchType.LAZY )
    @JoinTable( name = "maquinas_atividade",
            joinColumns = @JoinColumn( name = "atividade_id" ),
            inverseJoinColumns = @JoinColumn( name = "maquina_id" ) )
    private Set<Maquina> maquinas = new HashSet<>();

    @Min(0)
    private Double custoMaquinas;

    @ManyToMany( fetch = FetchType.LAZY )
    @JoinTable( name = "equipamentos_atividade",
            joinColumns = @JoinColumn( name = "atividade_id" ),
            inverseJoinColumns = @JoinColumn( name = "equipamento_id" ) )
    private Set<Equipamento> equipamentos = new HashSet<>();

    @Min(0)
    private Double custoEquipamentos;

    @ManyToMany( fetch = FetchType.LAZY )
    @JoinTable( name = "veiculos_atividade",
            joinColumns = @JoinColumn( name = "atividade_id" ),
            inverseJoinColumns = @JoinColumn( name = "veiculo_id" ) )
    private Set<Veiculo> veiculos = new HashSet<>();

    @Min(0)
    private Double custoVeiculos;

    @NotNull(message = "Status da atividade é obrigatório")
    @ManyToOne
    private StatusAtividade statusAtividade;

    @NotNull(message = "Data de Início é obrigatória")
    private LocalDate dataInicio;

    @NotNull(message = "Data de Início é obrigatória")
    private LocalDate dataFim;

    @Min(0)
    private Double despesasExtras;

    @Min(0)
    private Double custoPrevisto;

    private String observacoes;

    @NotNull(message = "Usuário é obrigatório")
    @ManyToOne
    private User usuario;
}
