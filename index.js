const { response } = require("express")
const express = require("express")
const { request } = require("http")
const { url } = require("inspector")
const uuid = require("uuid")

const port = 3000

const app = express()

app.use(express.json())

const orders = []

const checkOrderId = (request, response, next) => {

    const {id} = request.params
    
    const index = orders.findIndex(order => order.id ===id)
    
    if (index < 0) {
        return response.json({"error":"order not found"}).status(404)
       }

       request.Orderindex = index
       request.OrderId = id

       next()
}

const checkRequire = (request, response, next) => {

const url = request.url
const method = request.method

    next(console.log(url, method))
}

app.post("/order",checkRequire, (request, response) => {

    
const status = "Em preparação"

const {Order,ClientName,Price} = request.body

const comand = {id: uuid.v4(),Order,ClientName,Price,status} 

orders.push(comand)

return response.json(comand).status(201)
})

app.get("/order",checkRequire, (request, response) =>{

return response.json(orders).status(201)

})

app.put("/order/:id",checkOrderId,checkRequire, (request, response) =>{

    const {Order,Price,ClientName} = request.body

    const id = request.OrderId

    const index = request.Orderindex

    const status = "Em preparação"

    const newOrder = {id,Order,Price,ClientName,status}

    orders[index] = newOrder

    return response.json(newOrder)
    })

app.delete("/order/:id",checkOrderId,checkRequire, (request, response) =>{

    const index = request.Orderindex

    orders.splice(index,1)
    
    return response.status(204).json("o pedido foi deletado")
    })

app.get("/order/:id",checkOrderId,checkRequire, (request, response) => {

    const index = request.Orderindex
    
    return response.json(orders[index])
})

app.patch("/order/:id",checkOrderId,checkRequire, (request, response) => {

    const index = request.Orderindex  

    orders[index].status = "pedido pronto"

    return response.json(orders[index])
})

app.listen(port, () => {
    console.log(`o server esta rodando na porta ${port}`)
})