document.getElementById('btn-buscar').addEventListener('click', buscarCEP);

// Permite buscar também ao apertar a tecla "Enter" no input
document.getElementById('cep').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        buscarCEP();
    }
});

// Máscara automática para o CEP (adiciona o hífen dinamicamente)
document.getElementById('cep').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número
    if (value.length > 5) {
        value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }
    e.target.value = value;
});

async function buscarCEP() {
    const cepInput = document.getElementById('cep');
    const errorBox = document.getElementById('error-message');
    const resultContainer = document.getElementById('result-container');
    
    // Remove o hífen para enviar apenas números para a API
    const cepValue = cepInput.value.replace(/\D/g, ''); 

    // Oculta elementos antes de uma nova busca
    errorBox.classList.add('hidden');
    resultContainer.classList.add('hidden');

    // 4. VALIDAÇÃO: Se o campo estiver vazio
    if (cepInput.value.trim() === "") {
        exibirErro("Por favor, digite um CEP.");
        return;
    }

    // Validação complementar: tamanho correto do CEP
    if (cepValue.length !== 8) {
        exibirErro("O CEP deve conter exatamente 8 números.");
        return;
    }

    try {
        // Faz a requisição para a API ViaCEP
        const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
        const dados = await response.json();

        // EXIBIR MENSAGEM CASO O CEP NÃO EXISTA
        if (dados.erro) {
            exibirErro("O CEP informado não foi encontrado na base de dados.");
            return;
        }

        // MOSTRAR TODAS AS INFORMAÇÕES RETORNADAS
        // Preenche os campos do HTML com os dados da API (usando fallback "Não informado" se vazio)
        document.getElementById('rua').innerText = dados.logradouro || 'Não informado';
        document.getElementById('bairro').innerText = dados.bairro || 'Não informado';
        document.getElementById('complemento').innerText = dados.complemento || 'Nenhum';
        document.getElementById('cidade').innerText = dados.localidade;
        document.getElementById('estado').innerText = `${dados.uf} - ${dados.estado || ''}`;
        document.getElementById('ddd').innerText = dados.ddd || '-';
        document.getElementById('ibge').innerText = dados.ibge || '-';

        // Mostra o container de resultados
        resultContainer.classList.remove('hidden');

    } catch (error) {
        exibirErro("Ocorreu um erro ao conectar com o servidor. Tente novamente mais tarde.");
        console.error(error);
    }
}

// Função auxiliar para exibir mensagens de erro amigáveis
function exibirErro(mensagem) {
    const errorBox = document.getElementById('error-message');
    errorBox.innerText = mensagem;
    errorBox.classList.remove('hidden');
}