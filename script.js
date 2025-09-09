document.addEventListener('DOMContentLoaded', function() {
    // Elementos da interface
    const numeroInput = document.getElementById('numero');
    const inicioInput = document.getElementById('inicio');
    const fimInput = document.getElementById('fim');
    const gerarBtn = document.getElementById('gerar-btn');
    const resultSection = document.getElementById('result-section');
    const resultTitle = document.getElementById('result-title');
    const tabuadaContainer = document.getElementById('tabuada-container');
    const numeroError = document.getElementById('numero-error');
    const rangeError = document.getElementById('range-error');

    // Adicionar evento de clique ao botão
    gerarBtn.addEventListener('click', gerarTabuada);

    // Função para validar os inputs
    function validarInputs() {
        let valido = true;
        
        // Validar número
        const numero = parseInt(numeroInput.value);
        if (isNaN(numero) || numero < 1 || numero > 100) {
            numeroError.classList.add('active');
            valido = false;
        } else {
            numeroError.classList.remove('active');
        }
        
        // Validar intervalo
        const inicio = parseInt(inicioInput.value);
        const fim = parseInt(fimInput.value);
        
        if (isNaN(inicio) || isNaN(fim) || inicio >= fim) {
            rangeError.classList.add('active');
            valido = false;
        } else {
            rangeError.classList.remove('active');
        }
        
        return valido;
    }

    // Função principal para gerar a tabuada
    function gerarTabuada() {
        // Validar inputs
        if (!validarInputs()) {
            return;
        }
        
        // Obter valores dos inputs
        const numero = parseInt(numeroInput.value);
        const inicio = parseInt(inicioInput.value);
        const fim = parseInt(fimInput.value);
        
        // Limpar conteúdo anterior
        tabuadaContainer.innerHTML = '';
        
        // Atualizar título
        resultTitle.textContent = `Tabuada do ${numero}`;
        
        // Criar card da tabuada
        const tabuadaCard = document.createElement('div');
        tabuadaCard.className = 'tabuada-card';
        
        // Criar título do card
        const tabuadaTitle = document.createElement('div');
        tabuadaTitle.className = 'tabuada-title';
        tabuadaTitle.textContent = `Tabuada do ${numero}`;
        tabuadaCard.appendChild(tabuadaTitle);
        
        // Criar lista de multiplicações
        const tabuadaList = document.createElement('ul');
        tabuadaList.className = 'tabuada-list';
        
        // Gerar os itens da tabuada
        for (let i = inicio; i <= fim; i++) {
            const resultado = numero * i;
            const tabuadaItem = document.createElement('li');
            tabuadaItem.className = 'tabuada-item';
            tabuadaItem.textContent = `${numero} × ${i} = ${resultado}`;
            tabuadaList.appendChild(tabuadaItem);
        }
        
        // Adicionar lista ao card
        tabuadaCard.appendChild(tabuadaList);
        
        // Adicionar card ao container
        tabuadaContainer.appendChild(tabuadaCard);
        
        // Mostrar seção de resultados com animação
        resultSection.classList.add('active');
        
        // Adicionar efeito de destaque ao card
        setTimeout(() => {
            tabuadaCard.style.transform = 'translateY(-5px)';
            tabuadaCard.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
        }, 100);
    }

    // Função para gerar múltiplas tabuadas (funcionalidade extra)
    function gerarMultiplasTabuadas(numero, quantidade) {
        tabuadaContainer.innerHTML = '';
        
        for (let i = numero; i < numero + quantidade; i++) {
            // Criar card da tabuada
            const tabuadaCard = document.createElement('div');
            tabuadaCard.className = 'tabuada-card';
            
            // Criar título do card
            const tabuadaTitle = document.createElement('div');
            tabuadaTitle.className = 'tabuada-title';
            tabuadaTitle.textContent = `Tabuada do ${i}`;
            tabuadaCard.appendChild(tabuadaTitle);
            
            // Criar lista de multiplicações
            const tabuadaList = document.createElement('ul');
            tabuadaList.className = 'tabuada-list';
            
            // Gerar os itens da tabuada
            for (let j = 1; j <= 10; j++) {
                const resultado = i * j;
                const tabuadaItem = document.createElement('li');
                tabuadaItem.className = 'tabuada-item';
                tabuadaItem.textContent = `${i} × ${j} = ${resultado}`;
                tabuadaList.appendChild(tabuadaItem);
            }
            
            // Adicionar lista ao card
            tabuadaCard.appendChild(tabuadaList);
            
            // Adicionar card ao container
            tabuadaContainer.appendChild(tabuadaCard);
            
            // Adicionar efeito de destaque com delay
            setTimeout(() => {
                tabuadaCard.style.transform = 'translateY(-5px)';
                tabuadaCard.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
            }, 100 * (i - numero));
        }
    }

    // Adicionar eventos para validação em tempo real
    numeroInput.addEventListener('input', function() {
        if (this.value !== '') {
            const numero = parseInt(this.value);
            if (isNaN(numero) || numero < 1 || numero > 100) {
                numeroError.classList.add('active');
            } else {
                numeroError.classList.remove('active');
            }
        } else {
            numeroError.classList.remove('active');
        }
    });

    // Validar intervalo em tempo real
    function validarIntervalo() {
        if (inicioInput.value !== '' && fimInput.value !== '') {
            const inicio = parseInt(inicioInput.value);
            const fim = parseInt(fimInput.value);
            
            if (isNaN(inicio) || isNaN(fim) || inicio >= fim) {
                rangeError.classList.add('active');
            } else {
                rangeError.classList.remove('active');
            }
        } else {
            rangeError.classList.remove('active');
        }
    }

    inicioInput.addEventListener('input', validarIntervalo);
    fimInput.addEventListener('input', validarIntervalo);

    // Permitir gerar tabuada ao pressionar Enter
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            gerarTabuada();
        }
    });
});
