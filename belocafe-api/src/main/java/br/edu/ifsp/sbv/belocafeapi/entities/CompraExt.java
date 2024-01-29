package br.edu.ifsp.sbv.belocafeapi.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
// Compras Extraordinárias
// não coloquei o nome completo porque não sei se
// iria ficar muito grande, depois dá pra ajustar
public class CompraExt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @NotNull(message = "Título é obrigatório")
    @NotEmpty()
    @Length(max = 20)
    private String titulo;

    @NotNull(message = "Descrição é obrigatória")
    @NotEmpty()
    @Length(max = 50)
    private String descricao;

    // resolvi deixar aqui como String porque não sei
    // ainda se vai ser melhor colocar como data direto
    @NotNull(message = "Data é obrigatória")
    @Length(max = 13)
    private String data;

    @NotNull(message = "valor é obrigatório")
    @NotEmpty()
    @Min(0)
    private Float valor;

    @NotNull(message = "código é obrigatório")
    @NotEmpty()
    private String codigo;

    @NotNull(message = "Nome ou Razão Social é obrigatório")
    @NotEmpty()
    private String razaoSocial;

    @NotNull(message = "Cpf ou CNPJ é obrigatório")
    @NotEmpty()
    private  String cpfCnpj;

    @NotNull(message = "Usuário é obrigatório")
    @ManyToOne
    private User usuario;
}
