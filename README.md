<h1>Meu primeiro desafio node</h1>

<h3> Faaala rede!! </h3>
<br>

Compartilho meu primeiro projeto node, que consiste numa api de uma hamburgueira usando Node e Express e que possui as seguintes rotas:
<br>
<br>
<p>
🍔 POST /order:
Recebe um pedido, nome do cliente e valor no corpo da requisição.
Registra o novo pedido em um array.

🍔 GET /order:
Lista todos os pedidos feitos.

🍔 PUT /order/:id:
Altera um pedido existente.
Pode modificar um ou todos os dados do pedido.
O ID do pedido é enviado nos parâmetros da rota.

🍔 DELETE /order/:id:
Exclui um pedido existente com o ID fornecido nos parâmetros da rota.

🍔 GET /order/:id:
Retorna um pedido específico com base no ID fornecido nos parâmetros da rota.

🍔 PATCH /order/:id:
Altera o status de um pedido para "Pronto".
Recebe o ID nos parâmetros da rota.

<br>
<p> Além de:
 <br>
 
- Middleware de Verificação de ID:
Valida a existência do parâmetro ID em todas as rotas.
Retorna um erro se o ID não existir; caso contrário, permite a continuidade da requisição.
 
- Middleware de Log de Requisição:
Exibe no console o método da requisição (GET, POST, PUT, DELETE, etc.) e a URL.
Aplicado a todas as requisições.</p>
 </p>

