import { Product } from "../types.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

let products: Product[] = [
    {

        id: "1",
        name: "prod one",
        description: "this prod1",
        price: 29.99,
    },
    {

        id: "2",
        name: "prod two",
        description: "this prod2",
        price: 39.99,
    },
    {

        id: "3",
        name: "prod trei",
        description: "this prod3",
        price: 49.99,
    },
];


// @route get api/v1/products
const getProducts = ({response} : {response: any}) => {
    response.body = {
        succes: true,
        data: products,
    }
}

//get single product
// @route get api/v1/products/:id
const getProduct = ({params, response} : {params: {id: string}, response: any}) => {
    //for each product we want to get the product where the id == params.id
    const product : Product | undefined = products.find(p => p.id === params.id)

    //daca product e gasit
    if(product){
        response.status = 200
        response.body = {
            succes : true,
            data : product,
        }
    } else {
        response.status = 404
        response.body = {
            succes : false,
            msg : "no product found",
        }
    }
}

// @route  Post api/v1/products
//pass request, to also use the data sent from the client
    //no longer in the global scope, so we need async
const addProduct = async ({request, response} : {request: any, response: any}) => {
    const body = await request.body()

    if (!request.hasBody) {
        response.status = 400 // bad request
        response.body = {
            succes: false,
            msg: "no data",
        } 
    } else {
        //din body.value citesti valoarea introdusa la frontend(postman..)
            const product : Product = body.value
            //generez eu un id cu uuid, pt ca atm nu am database
            product.id = v4.generate(); //adaug id generat de uuid obiectului product
            products.push(product) // adaug ce vine din fronten la lista produselor existente
            response.status = 201
            response.body = {
                succes: true,
                data: product // va contine si id pus de uuid
            }
    }
}


// @route  Put api/v1/products/:id
//tre sa identific produsul de modificat -> params
//tre sa primesc input de la fronted -> request
//raspund catre front -> response
const updateProduct = async ({params, request, response} : {params: {id: string}, request: any ,response: any}) => {
        //for each product we want to get the product where the id == params.id
        const product : Product | undefined = products.find(p => p.id === params.id)

        //daca product e gasit
        if(product){
     const body = await request.body()
     //datele de actualizat vin din frontend si intra in body.value
     // semnul intrebarii la type means OPTIONAL
     const updateData : {name?: string, description?: string, price?: number} = body.value

     //daca gaseste p.id identic cu ce caut eu in params
     // spread operator, adica ia p-ul existent la care adauga ce vine din frontend (body.value)
     //altminteri va ramane produsul ca si pama amu ( p )
            products = products.map(p => p.id === params.id ? {...p, ...updateData} : p)

            response.status = 200 //totul ok
            response.body = {
                succes: true,
                data: products,
            }
        } else {
            response.status = 404
            response.body = {
                succes : false,
                msg : "no product found",
            }
        }
}

// @route  DELETE api/v1/products/:id
const deleteProduct = ({params, response} : {params: {id : string}, response: any}) => {
    //returns all the products EXCEPT the one..
    products = products.filter(p => p.id !== params.id )
    response.body = {
        succes: true,
        msg: "product deleted"
    }
}

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct};