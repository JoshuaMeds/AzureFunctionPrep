module.exports = async function (context, req) {
    context.log('Processando novo aluguel de item...');

    // Dados que esperamos receber do Body
    const { usuario_id, item_id, dias_aluguel, valor_diaria } = req.body;

    // Lógica Simples de Validação
    if (usuario_id && item_id && dias_aluguel) {
        
        // Cálculo básico de custo (Lógica de negócio)
        const valor_total = dias_aluguel * (valor_diaria || 0);

        // Resposta de Sucesso (Simulando gravação no banco)
        context.res = {
            status: 201, 
            body: {
                mensagem: "Aluguel registrado com sucesso!",
                protocolo: `ALUG-${Math.floor(1000 + Math.random() * 9000)}`,
                resumo: {
                    cliente_id: usuario_id,
                    objeto_alugado: item_id,
                    prazo: `${dias_aluguel} dias`,
                    total_estimado: `R$ ${valor_total.toFixed(2)}`
                },
                data_registro: new Date().toISOString()
            }
        };
    } else {
        // Resposta de Erro se faltar dados
        context.res = {
            status: 400,
            body: "Erro: Informe usuario_id, item_id e dias_aluguel para processar o aluguel."
        };
    }
};