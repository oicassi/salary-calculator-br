import React, { Component } from 'react'
import { formatNumber } from '../../helpers/FormatHelper'
import css from './inputs.module.css';

export default class DisplayValores extends Component {
    render() {
        const { baseInss,
            inss,
            inssPercentage,
            baseIrpf,
            irpf,
            irpfPercentage,
            salarioLiquido,
            salarioLiquidoPercentage } = this.props.valores;
        return (
            <div className={css.flexRow}>
                <div className={css.divInput}>
                    <label htmlFor='baseINSS' className={css.label}>Base INSS</label> <br />
                    <input
                        type='text'
                        disabled
                        id='baseINSS'
                        className={`${css.genericInput}`}
                        value={formatNumber(baseInss)} />
                </div>
                <div className={css.divInput}>
                    <label htmlFor='descontoINSS' className={css.label}>Desconto INSS</label>
                    <input
                        type='text'
                        disabled
                        id='descontoINSS'
                        className={`${css.genericInput} ${css.inss}`}
                        value={`${formatNumber(inss)}${inssPercentage > 0.0 ? (' (' + inssPercentage + '%)') : ''}`} />
                </div>
                <div className={css.divInput}>
                    <label htmlFor='baseIRPF' className={css.label}>Base IRPF</label>
                    <input
                        type='text'
                        disabled
                        id='baseIRPF'
                        className={`${css.genericInput}`}
                        value={formatNumber(baseIrpf)} />
                </div>
                <div className={css.divInput}>
                    <label htmlFor='descontoIRPF' className={css.label}>Desconto IRPF</label>
                    <input
                        type='text'
                        disabled
                        id='descontoIRPF'
                        className={`${css.genericInput} ${css.irpf}`}
                        value={`${formatNumber(irpf)}${irpfPercentage > 0.0 ? (' (' + irpfPercentage + '%)') : ''}`} />
                </div>
                <div className={css.divInput}>
                    <label htmlFor='salarioLiquido' className={css.label}>Salário Líquido</label>
                    <input
                        type='text'
                        disabled
                        id='salarioLiquido'
                        className={`${css.genericInput} ${css.liquid}`}
                        value={`${formatNumber(salarioLiquido)}${salarioLiquidoPercentage > 0.0 ? (' (' + salarioLiquidoPercentage + '%)') : ''}`} />
                </div>
            </div>
        )
    }
}
