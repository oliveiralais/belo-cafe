package br.edu.ifsp.sbv.belocafeapi.controllers;

import br.edu.ifsp.sbv.belocafeapi.controllers.dtos.*;
import br.edu.ifsp.sbv.belocafeapi.entities.*;
import br.edu.ifsp.sbv.belocafeapi.repositories.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping( "/api/atividades" )
public class AtividadeController {
    @Autowired
    private AtividadeRepository atividadeRepository;

    @Autowired
    private InsumoRepository insumoRepository;

    @Autowired
    private AdubacaoRepository adubacaoRepository;

    @Autowired
    private BeneficiamentoRepository beneficiamentoRepository;

    @Autowired
    private CalagemRepository calagemRepository;

    @Autowired
    private ColheitaRepository colheitaRepository;

    @Autowired
    private IrrigacaoRepository irrigacaoRepository;

    @Autowired
    private PlantioRepository plantioRepository;

    @Autowired
    private PulverizacaoRepository pulverizacaoRepository;

    @PostMapping("/inserir-adubacao")
    @Transactional
    public Adubacao inserirAdubacao( @RequestBody AdubacaoDTO adubacaoDTO ) {
        Atividade atv = adubacaoDTO.getAtividade();
        atv = atividadeRepository.save(atv);

        Insumo ins = atv.getInsumo();
        ins.setQuantidadeDisponivel(ins.getQuantidadeDisponivel() - atv.getQtdeInsumo());
        insumoRepository.save(ins);

        Adubacao adb = new Adubacao();
        adb.setAtividade(atv);
        adb.setOcorrenciaAno(adubacaoDTO.getOcorrenciaAno());

        adb = adubacaoRepository.save(adb);

        return adb;
    }

    @PatchMapping("/editar-adubacao")
    @Transactional
    public Adubacao editarAdubacao( @RequestBody AdubacaoDTO adubacaoDTO ) {
        Atividade atv = adubacaoDTO.getAtividade();
        atividadeRepository.save(atv);
        Insumo ins = atv.getInsumo();

        Double diferencaQtde = adubacaoDTO.getDiferencaQtdeInsumo();

        if(diferencaQtde < 0)
            ins.setQuantidadeDisponivel(ins.getQuantidadeDisponivel() + Math.abs(diferencaQtde));
        else
            ins.setQuantidadeDisponivel(ins.getQuantidadeDisponivel() - diferencaQtde);

        insumoRepository.save(ins);

        Adubacao adb = new Adubacao();
        adb.setId(adubacaoDTO.getId());
        adb.setAtividade(atv);
        adb.setOcorrenciaAno(adubacaoDTO.getOcorrenciaAno());

        adubacaoRepository.save(adb);

        return adb;
    }

    @DeleteMapping("/excluir-adubacao")
    @Transactional
    public void excluirAdubacao( @RequestParam Long id ){
        Adubacao adb = adubacaoRepository.findById(id).get();
        Atividade atv = adb.getAtividade();

        adubacaoRepository.delete(adb);
        atividadeRepository.delete(atv);
    }

    @PostMapping("/inserir-beneficiamento")
    @Transactional
    public Beneficiamento inserirBeneficiamento(@RequestBody BeneficiamentoDTO beneficiamentoDTO ) {
        Atividade atv = beneficiamentoDTO.getAtividade();
        atv = atividadeRepository.save(atv);

        Beneficiamento b = new Beneficiamento();
        b.setAtividade(atv);
        b.setRendimento(beneficiamentoDTO.getRendimento());
        b.setTipoBeneficiamento(beneficiamentoDTO.getTipoBeneficiamento());

        b = beneficiamentoRepository.save(b);

        return b;
    }

    @PatchMapping("/editar-beneficiamento")
    @Transactional
    public Beneficiamento editarBeneficiamento(@RequestBody BeneficiamentoDTO beneficiamentoDTO ) {
        Atividade atv = beneficiamentoDTO.getAtividade();
        atividadeRepository.save(atv);

        Beneficiamento b = new Beneficiamento();
        b.setId(beneficiamentoDTO.getId());
        b.setAtividade(atv);
        b.setRendimento(beneficiamentoDTO.getRendimento());
        b.setTipoBeneficiamento(beneficiamentoDTO.getTipoBeneficiamento());

        beneficiamentoRepository.save(b);

        return b;
    }

    @DeleteMapping("/excluir-beneficiamento")
    @Transactional
    public void excluirBeneficiamento( @RequestParam Long id ){
        Beneficiamento b = beneficiamentoRepository.findById(id).get();
        Atividade atv = b.getAtividade();

        beneficiamentoRepository.delete(b);
        atividadeRepository.delete(atv);
    }

    @PostMapping("/inserir-calagem")
    @Transactional
    public Calagem inserirCalagem(@RequestBody CalagemDTO calagemDTO ) {
        Atividade atv = calagemDTO.getAtividade();
        atv = atividadeRepository.save(atv);

        Calagem c = new Calagem();
        c.setAtividade(atv);
        c.setTipoCalcario(calagemDTO.getTipoCalcario());
        c.setQtdeCalcario(calagemDTO.getQtdeCalcario());

        c = calagemRepository.save(c);

        return c;
    }

    @PatchMapping("/editar-calagem")
    @Transactional
    public Calagem editarCalagem(@RequestBody CalagemDTO calagemDTO ) {
        Atividade atv = calagemDTO.getAtividade();
        atividadeRepository.save(atv);

        System.out.println(calagemDTO);

        Calagem c = new Calagem();
        c.setId(calagemDTO.getId());
        c.setAtividade(atv);
        c.setTipoCalcario(calagemDTO.getTipoCalcario());
        c.setQtdeCalcario(calagemDTO.getQtdeCalcario());

        calagemRepository.save(c);

        return c;
    }

    @DeleteMapping("/excluir-calagem")
    @Transactional
    public void excluirCalagem( @RequestParam Long id ){
        Calagem c = calagemRepository.findById(id).get();
        Atividade atv = c.getAtividade();

        calagemRepository.delete(c);
        atividadeRepository.delete(atv);
    }

    @PostMapping("/inserir-colheita")
    @Transactional
    public Colheita inserirColheita(@RequestBody ColheitaDTO colheitaDTO ) {
        Atividade atv = colheitaDTO.getAtividade();
        atv = atividadeRepository.save(atv);

        Colheita c = new Colheita();
        c.setAtividade(atv);
        c.setTipoColheita(colheitaDTO.getTipoColheita());
        c.setMassaColhida(colheitaDTO.getMassaColhida());
        c.setRendimento(colheitaDTO.getRendimento());

        c = colheitaRepository.save(c);

        return c;
    }

    @PatchMapping("/editar-colheita")
    @Transactional
    public Colheita editarColheita(@RequestBody ColheitaDTO colheitaDTO ) {
        Atividade atv = colheitaDTO.getAtividade();
        atividadeRepository.save(atv);

        Colheita c = new Colheita();
        c.setId(colheitaDTO.getId());
        c.setAtividade(atv);
        c.setTipoColheita(colheitaDTO.getTipoColheita());
        c.setMassaColhida(colheitaDTO.getMassaColhida());
        c.setRendimento(colheitaDTO.getRendimento());

        colheitaRepository.save(c);

        return c;
    }

    @DeleteMapping("/excluir-colheita")
    @Transactional
    public void excluirColheita( @RequestParam Long id ){
        Colheita c = colheitaRepository.findById(id).get();
        Atividade atv = c.getAtividade();

        colheitaRepository.delete(c);
        atividadeRepository.delete(atv);
    }

    @PostMapping("/inserir-irrigacao")
    @Transactional
    public Irrigacao inserirIrrigacao(@RequestBody IrrigacaoDTO irrigacaoDTO ) {
        Atividade atv = irrigacaoDTO.getAtividade();
        atv = atividadeRepository.save(atv);

        Irrigacao i = new Irrigacao();
        i.setAtividade(atv);
        i.setFertirrigacao(irrigacaoDTO.getFertirrigacao());
        i.setTipoIrrigacao(irrigacaoDTO.getTipoIrrigacao());

        i = irrigacaoRepository.save(i);

        return i;
    }

    @PatchMapping("/editar-irrigacao")
    @Transactional
    public Irrigacao editarIrrigacao(@RequestBody IrrigacaoDTO irrigacaoDTO ) {
        Atividade atv = irrigacaoDTO.getAtividade();
        atividadeRepository.save(atv);

        Irrigacao i = new Irrigacao();
        i.setId(irrigacaoDTO.getId());
        i.setAtividade(atv);
        i.setFertirrigacao(irrigacaoDTO.getFertirrigacao());
        i.setTipoIrrigacao(irrigacaoDTO.getTipoIrrigacao());

        irrigacaoRepository.save(i);

        return i;
    }

    @DeleteMapping("/excluir-irrigacao")
    @Transactional
    public void excluirIrrigacao( @RequestParam Long id ){
        Irrigacao i = irrigacaoRepository.findById(id).get();
        Atividade atv = i.getAtividade();

        irrigacaoRepository.delete(i);
        atividadeRepository.delete(atv);
    }

    @PostMapping("/inserir-plantio")
    @Transactional
    public Plantio inserirPlantio(@RequestBody PlantioDTO plantioDTO ) {
        Atividade atv = plantioDTO.getAtividade();
        atv = atividadeRepository.save(atv);

        Plantio p = new Plantio();
        p.setAtividade(atv);
        p.setMassaPlantio(plantioDTO.getMassaPlantio());
        p.setTipoPlantio(plantioDTO.getTipoPlantio());

        p = plantioRepository.save(p);

        return p;
    }

    @PatchMapping("/editar-plantio")
    @Transactional
    public Plantio editarPlantio(@RequestBody PlantioDTO plantioDTO ) {
        Atividade atv = plantioDTO.getAtividade();
        atividadeRepository.save(atv);

        Plantio p = new Plantio();
        p.setId(plantioDTO.getId());
        p.setAtividade(atv);
        p.setMassaPlantio(plantioDTO.getMassaPlantio());
        p.setTipoPlantio(plantioDTO.getTipoPlantio());

        plantioRepository.save(p);

        return p;
    }

    @DeleteMapping("/excluir-plantio")
    @Transactional
    public void excluirPlantio( @RequestParam Long id ){
        Plantio p = plantioRepository.findById(id).get();
        Atividade atv = p.getAtividade();

        plantioRepository.delete(p);
        atividadeRepository.delete(atv);
    }

    @PostMapping("/inserir-pulverizacao")
    @Transactional
    public Pulverizacao inserirPulverizacao(@RequestBody PulverizacaoDTO pulverizacaoDTO ) {
        Atividade atv = pulverizacaoDTO.getAtividade();
        atv = atividadeRepository.save(atv);

        Insumo ins = atv.getInsumo();
        ins.setQuantidadeDisponivel(ins.getQuantidadeDisponivel() - atv.getQtdeInsumo());
        insumoRepository.save(ins);

        Pulverizacao p = new Pulverizacao();
        p.setAtividade(atv);
        p.setOcorrenciaAno(pulverizacaoDTO.getOcorrenciaAno());

        p = pulverizacaoRepository.save(p);

        return p;
    }

    @PatchMapping("/editar-pulverizacao")
    @Transactional
    public Pulverizacao editarPulverizacao(@RequestBody PulverizacaoDTO pulverizacaoDTO ) {
        Atividade atv = pulverizacaoDTO.getAtividade();
        atividadeRepository.save(atv);

        Insumo ins = atv.getInsumo();

        Double diferencaQtde = pulverizacaoDTO.getDiferencaQtdeInsumo();

        if(diferencaQtde < 0)
            ins.setQuantidadeDisponivel(ins.getQuantidadeDisponivel() + Math.abs(diferencaQtde));
        else
            ins.setQuantidadeDisponivel(ins.getQuantidadeDisponivel() - diferencaQtde);

        insumoRepository.save(ins);

        Pulverizacao p = new Pulverizacao();
        p.setId(pulverizacaoDTO.getId());
        p.setAtividade(atv);
        p.setOcorrenciaAno(pulverizacaoDTO.getOcorrenciaAno());

        pulverizacaoRepository.save(p);

        return p;
    }

    @DeleteMapping("/excluir-pulverizacao")
    @Transactional
    public void excluirPulverizacao( @RequestParam Long id ){
        Pulverizacao p = pulverizacaoRepository.findById(id).get();
        Atividade atv = p.getAtividade();

        pulverizacaoRepository.delete(p);
        atividadeRepository.delete(atv);
    }

    @GetMapping("/custo-previsto-por-mes")
    @Transactional
    public List<Object[]> obterCustoPrevistoPorMes(@RequestParam Long userId) {
        int anoDesejado = 2023;

        return atividadeRepository.findCustoPrevistoByMonthAndUserId(anoDesejado, userId);
    }

    @GetMapping("/atividades-por-mes")
    @Transactional
    public List<Object[]> obterAtividadesPorMes(@RequestParam Long userId) {
        int anoDesejado = 2023;

        return atividadeRepository.findNumeroAtividadesByMonthAndUserId(anoDesejado, userId);
    }

    @GetMapping("/custo-previsto-por-gleba")
    @Transactional
    public List<Object[]> obterCustoPrevistoPorGlebaEUsuario(@RequestParam Long userId) {
        int anoDesejado = 2023;

        return atividadeRepository.findCustoPrevistoPorGlebaEUsuario(anoDesejado, userId);
    }
}
