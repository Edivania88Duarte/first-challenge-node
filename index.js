const express = require('express')
const uuid = require('uuid')


const port = 3000
const app = express()
app.use(express.json(   ))


//ROTA GET - LISTA TODOS OS PEDIDOS

const orders = []

const checkOrderId = (request, response, next)=> {
    const { id } = request.params

    const index = orders.findIndex(order =>order.id === id)//interar user /user e verificar se id existe

    if(index < 0){
        return response.status(404).json({error: "Order not found"}) //retorna resposta caso não exista
    }

    request.orderIndex = index
    request.orderId = id
    next()
}

const showMetod = (request, response, next) => {
  console.log(`[${request.method}] - ${request.originalUrl}`);
  
    next();
};

// Aplica o middleware para todas as requisições
app.use(showMetod);

// orders.push({
//     id: uuid.v4(),
//     order: 'Pedido 1',
//     clientName: 'Cliente 1',
//     price: 19.99,
//     status: 'Em andamento'
// });

// orders.push({
//     id: uuid.v4(),
//     order: 'Pedido 2',
//     clientName: 'Cliente 2',
//     price: 29.99,
//     status: 'Concluído'
// });


app.get('/orders', (request, response) => {
    return response.json(orders)
})

//ROTA POST - ENVIA OS PEDIDOS

app.post('/orders', (request, response) => {
    const { order, clientName, price, status } = request.body

    const orderClient = { id: uuid.v4(), order, clientName, price, status }

    orders.push(orderClient)

    return response.status(201).json(orders)
})

// ROTA PUT - ATUALIZA OS DADOS DO PEDIDO (UM DADO ESPECÍFICO OU TODOS OS DADOS)

app.put('/orders/:id', checkOrderId, (request, response) => {
    const { id } = request.params
    const { order, clientName, price, status } = request.body
    
    const updateclientName = { order, clientName, price, status }

    const index = orders.findIndex(order => order.id === id)

    if(index < 0){
        return response.status(404).json({message:"Order not found"})
    }

    orders[index] = updateclientName


    return response.json(updateclientName)
})


// ROTA DELETE - Deleta um usuário a partir do id dele.

app.delete('/orders/:id', checkOrderId, (request, response) => {
    const { id } = request.params
    
    const index = orders.findIndex(order => order.id === id)

    if(index < 0){
        return response.status(404).json({message:"Order not found"})
    }

    orders.splice(index,1)

    return response.status(204).json()
})


app.get('/orders/:id', (request, response) => {
    const orderId = request.params.id;

    // Encontra o pedido no array de pedidos pelo ID
    const foundOrder = orders.find(order => order.id === orderId);

    if (!foundOrder) {
        return response.status(404).json({ message: "Pedido não encontrado" });
    }

   
    return response.status(200).json(foundOrder);
});



app.patch('/orders/:id', (request, response) => {
    const  id  = request.params.id;
    const orderIndex = orders.findIndex((order) => order.id ===id);
    
    orders[orderIndex].status= "Pronto";
    return response.json(orders[orderIndex]);
});

// app.patch('/orders/:id', (request, response) => {
//     const orderId = request.params.id;

//     // Verifique se o ID está vazio
//     if (!orderId) {
//         return response.status(400).json({ message: "ID cannot be empty" });
//     }

//     const index = orders.findIndex(order => order.id === orderId);

//     if (orders[index].status = "pronto"){
//         return response.status(400).json({ message: "Orders is already 'pronto'" })
//     }

//     // Verifique se o pedido está definido antes de atualizar o status
//     // if (orders[index]){
//     //     // Atualize o status para "pronto"
//     //     orders[index].status = "pronto";
//     //     return response.json({ message: "Order status updated to 'pronto'", order: orders[index] });
//     // } else {
//     //     return response.status(500).json({ message: "Internal server error: Order is undefined" });
//     // }
// });


app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
})