import React, { Component } from 'react';
import InputSalario from './components/inputs/InputSalario';
import DisplayValores from './components/inputs/DisplayValores';
import Grafico from './components/grafico/Grafico';
import { calcAll } from './helpers/CalcHelper';
import css from './app.module.css'

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      salarioBruto: 0,
    }
  }

  /**
   * Atribui valor do salário bruto ao state do componente
   * @param {*} salarioBruto Valor do salário bruto recebido pelo compoenente InputSalario
   */
  handldeSalarioBruto = (salarioBruto) => {
    let salarioNumber = Number(salarioBruto);
    if (salarioNumber && salarioNumber >= 0) {
      this.setState({
        salarioBruto,
      })
    } else {
      this.setState({
        salarioBruto : "",
      })
    }
  }

  render() {
    const { salarioBruto } = this.state;
    const dadosSalarioLiquido = calcAll(salarioBruto);
    return <div className="container">

      <h1 className={css.title}>Calculadora de salário líquido</h1>
      <div className={css.mainContainer}>
        <InputSalario onInputSalarioChange={this.handldeSalarioBruto} />
        <DisplayValores valores={dadosSalarioLiquido} />
        <Grafico valores={dadosSalarioLiquido} />
      </div>
      <div className={css.footerContainer}>
        <a href="https://www.todacarreira.com/calculo-salario-liquido/" target="_blank">
          <span className={css.linkFonte}><em>fonte dos cálculos</em></span>
        </a>
      </div>
    </div>;
  }
}

// componente input editavel (vai alterar o salario)

// componente input para mostrar os valores (vai receber o salario)

// componente grafico para mostrar os valores como uma barra