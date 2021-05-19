'use strict';

const firebase = require('../db');
const Product = require('../models/product');
const firestore = firebase.firestore();


const addProduct = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('products').doc(data.name).set(data);
        res.send('Produto adicionado com sucesso!');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllProducts = async (req, res, next) => {
    try {
        const name = req.query.name;
        const products = (!name ? await firestore.collection('products')
        : await firestore.collection('products').doc(name));
        const data = await products.get();

        const productsArray = [];

        if(data.empty) {
            res.status(404).send('Nenhum produto foi encontrado!');  
        } else { 
            if(!name){
            data.forEach(doc => {
                const product = new Product(
                    doc.id,
                    doc.data().name,
                    doc.data().description,
                    doc.data().img,
                    doc.data().price,
                    doc.data().quantity
                );
                productsArray.push(product);
            });
            res.send(productsArray);
         } else {
             if(name && data.data() == null){
                res.status(404).send(error.message);
            } else {
                productsArray.push(data.data())
                res.send(productsArray);
                
            }
         }
    }
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const getProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await firestore.collection('products').doc(id);
        const data = await product.get();
        if(!data.exists) {
            res.status(404).send('O Produto com ID informado não foi encontrado');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const product =  await firestore.collection('products').doc(id);
        await product.update(data);
        res.send('Produto atualizado com sucesso!');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('products').doc(id).delete();
        res.send('Produto apagado com sucesso');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addProduct, 
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
}