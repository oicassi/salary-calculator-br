import React, { Component } from 'react'

export default class InputSalario extends Component {
    handleChangeSalario = (event) => {
        this.props.onInputSalarioChange(event.target.value);
    }

    render() {
        return (
            <div>
                <label htmlFor="salarioBruto">Salário Bruto</label>
                <input 
                type="number"
                id="salarioBruto" 
                placeholder="Informe o salário bruto (utilize ponto . para separador decimal)"
                onChange= {this.handleChangeSalario} />
            </div>
        )
    }
}
