import React, { Component } from 'react'
import css from './grafico.module.css';

export default class Grafico extends Component {
    render() {
        const {
            inssPercentage,
            irpfPercentage,
            salarioLiquidoPercentage} = this.props.valores;
        return (
            <div className={css.containerGrafico}>
                <span className={css.inss} style={{width:`${inssPercentage}%`}}></span>
                <span className={css.irpf} style={{width:`${irpfPercentage}%`}}></span>
                <span className={css.liquid} style={{width:`${salarioLiquidoPercentage}%`}}></span>
            </div>
        )
    }
}