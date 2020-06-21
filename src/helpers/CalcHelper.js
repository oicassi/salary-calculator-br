// Faixas salárias para INSS
const inssTier1 = {
    min: 0,
    max: 1045,
    aliq: 0.075
}
const inssTier2 = {
    min: 1045.01,
    max: 2089.60,
    aliq: 0.09
}
const inssTier3 = {
    min: 2089.61,
    max: 3134.40,
    aliq:0.12
}
const inssTier4 = {
    min: 3134.41,
    max: 6101.06,
    aliq:0.14
}
const inssMax = 713.10;

// Faixas salariais para IRPF
const irpfTier1 = {
    min: 0,
    max: 1903.98,
    aliq: 0,
    ded: 0
}
const irpfTier2 = {
    min: 1903.99,
    max: 2826.65,
    aliq: 0.075,
    ded: 142.80
}
const irpfTier3 = {
    min: 2826.66,
    max: 3751.05,
    aliq: 0.15,
    ded: 354.80
}
const irpfTier4 = {
    min: 3751.06,
    max: 4664.68,
    aliq: 0.225,
    ded: 636.13
}
const ifprTierMax = {
    min: 4664.69,
    aliq: 0.275,
    ded: 869.36
}

/**
 * Calcula a fração do INSS conforme a faixa salaria
 * @param {*} value Valor do salário
 * @param {*} sum   Cumulativo do desconto do INSS
 * @param {*} tier  Infos da faixa salarial
 */
function calcFracaoInss(value, sum, tier) {
    if (value < tier.min) {
        return sum
    }
    if (value >= tier.min && value <= tier.max) {
        return sum + ((value - tier.min) * tier.aliq)
    }
    if (value > tier.max) {
        return sum + ((tier.max - tier.min) * tier.aliq)
    }
}

/**
 * Cálculo dos descontos do INSS
 * @param {*} value Salário bruto
 */
function calcInssValue(value = 0) {
    let inssSum = 0;

    // Cálculo do valor do INSS
    if (value > inssTier4.max) {
        inssSum = inssMax;
    } else {
        // Verificação primeira faixa salarial
        inssSum = calcFracaoInss(value, inssSum, inssTier1);

        // Verificação segunda faixa salarial
        inssSum = calcFracaoInss(value, inssSum, inssTier2);

        // Verificação terceira faixa salarial
        inssSum = calcFracaoInss(value, inssSum, inssTier3);

        // Verificação quarta faixa salarial
        inssSum = calcFracaoInss(value, inssSum, inssTier4);
    }

    return inssSum;
}

/**
 * Cálculo da porcentagem de desconto
 * @param {*} salario Salário bruto
 * @param {*} desconto Valor de desconto
 */
function calcPercentage(salario = 0, desconto = 0) {
    let percentage = (0).toFixed(2);
    if (salario > 0 && desconto > 0) {
        percentage = ((desconto / salario) * 100).toFixed(2);
    }
    return percentage;
}

/**
 * Cálculo do desconto do IRPF
 * @param {*} salario Salario com o desconto do INSS
 */
function calcIrpfValue(salario, tierId) {
    let tier;
    switch (tierId) {
        case 1:
            tier = irpfTier1
            break;
        case 2:
            tier = irpfTier2
            break;
        case 3:
            tier = irpfTier3
            break;
        case 4:
            tier = irpfTier4
            break;
        default:
            tier = ifprTierMax
            return ((salario * tier.aliq) - tier.ded);
    }
    if (salario >= tier.min && salario <= tier.max) {
        return ((salario * tier.aliq) - tier.ded);
    } else {
        return calcIrpfValue(salario, ++tierId)
    }
}

/**
 * Calculo dos valores de descontos e porcentagens
 * @param {*} salario Salário bruto
 */
function calcAll(salario) {
    const baseInss = salario;
    const inss = calcInssValue(salario);
    const inssPercentage = calcPercentage(salario, inss);
    const baseIrpf = salario - inss;
    const irpf = calcIrpfValue(baseIrpf, 1);
    const irpfPercentage = calcPercentage(salario, irpf);
    const salarioLiquido = baseIrpf - irpf;
    const salarioLiquidoPercentage = calcPercentage(salario, salarioLiquido);

    return {
        baseInss,
        inss,
        inssPercentage,
        baseIrpf,
        irpf,
        irpfPercentage,
        salarioLiquido,
        salarioLiquidoPercentage
    }
}


export { calcAll };