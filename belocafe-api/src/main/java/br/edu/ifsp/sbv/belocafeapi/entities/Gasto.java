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

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Gasto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @NotNull(message = "Tipo é obrigatório")
    @NotEmpty(message = "Tipo não pode ser vazio")
    @Length(min = 3, max = 100)
    private String type;

    @NotNull(message = "Código é obrigatório")
    @NotEmpty(message = "Código não pode ser vazio")
    @Min(3)
    private Long code;

    @NotNull(message = "Descrição é obrigatório")
    @NotEmpty(message = "Descrição não pode ser vazio")
    @Length(min = 3, max = 255)
    private String description;

    @Min(0)
    private Double amount;
    
    @NotNull
    private Date issueDate;
    
    @NotNull(message = "Nome/Razão Social é obrigatório")
    @NotEmpty(message = "Nome/Razão Social não pode ser vazio")
    @Length(min = 3, max = 255)
    private String name;
    
    @NotNull(message = "CPF/CNPJ é obrigatório")
    @NotEmpty(message = "CPF/CNPJ não pode ser vazio")
    @Length(min = 14, max = 18)
    private String cpfCnpj;
    
    @NotNull(message = "Usuário é obrigatório")
    @ManyToOne
    private User usuario;
    
}
