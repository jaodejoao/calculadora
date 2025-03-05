let historico = '';

function insert(num) {
    const resultado = document.getElementById('resultado');
    
    // Evita múltiplos operadores seguidos
    const ultimoCaractere = resultado.innerHTML.slice(-1);
    if (['+', '-', '*', '/'].includes(ultimoCaractere) && ['+', '-', '*', '/'].includes(num)) {
        return;
    }
    
    // Evita múltiplos pontos decimais no mesmo número
    if (num === '.' && resultado.innerHTML.split(/[\+\-\*\/]/).pop().includes('.')) {
        return;
    }
    
    resultado.innerHTML += num;
    
    if (resultado.innerHTML.length > 12) {
        resultado.style.fontSize = '24px';
    }
}

function clean() {
    document.getElementById('resultado').innerHTML = '';
    document.querySelector('.historico').innerHTML = '';
    document.getElementById('resultado').style.fontSize = '36px';
}

function back() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = resultado.innerHTML.slice(0, -1);
}

function calcular() {
    const resultado = document.getElementById('resultado');
    const historicoElement = document.querySelector('.historico');
    
    if (resultado.innerHTML) {
        try {
            // Guarda a expressão original
            const expressao = resultado.innerHTML;
            
            // Substitui × por * para cálculo
            let calculo = expressao.replace(/×/g, '*');
            
            // Calcula o resultado
            let resultadoCalculo = Function('"use strict";return (' + calculo + ')')();
            
            // Formata o resultado
            if (Number.isFinite(resultadoCalculo)) {
                // Limita a 8 casas decimais e remove zeros à direita
                resultadoCalculo = Number(resultadoCalculo.toFixed(8)).toString();
                
                // Atualiza o histórico e o resultado
                historicoElement.innerHTML = expressao + ' =';
                resultado.innerHTML = resultadoCalculo;
            } else {
                throw new Error('Resultado inválido');
            }
        } catch (e) {
            resultado.innerHTML = 'Erro';
            setTimeout(clean, 1500);
        }
    }
}

// Adiciona suporte a teclado
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (/[0-9]/.test(key)) {
        insert(key);
    } else if (['+', '-', '*', '/', '.'].includes(key)) {
        insert(key);
    } else if (key === 'Enter') {
        calcular();
    } else if (key === 'Backspace') {
        back();
    } else if (key === 'Escape') {
        clean();
    }
}); 