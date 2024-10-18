import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductListComponent = () => {

    const [products, setProducts] = useState([]);

    useEffect(()=> {
        getProductList();
    }, []);


    const getProductList = async () => {
        const response = await axios.get("http://localhost:8080/products");
        setProducts(response.data);
    };


    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/products/${id}`);
            getProductList();
            toast.success("DELETED", {
                position: "top-center",
            });
        } catch (error) {
            toast.error( error.message, {
                position: "top-center",
            });
            console.log(error)
        }
    }

    return (
        <div className="is-centered">
            <h1 className="title has-text-centered mt-5">Product List</h1>
            <div className="columns mt-5 is-centered">
                <Link to={`create`} className="button is-success mr-3">Create Product</Link>
                <Link to={`approval`} className="button is-warning">List Product Pending (Need Approval)</Link>
                <div className="column is-half">
                    <table className="table is-striped is-fullwidth">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.status}</td>
                                <td>
                                    <Link to={`update/${product.id}`} className="button is-family-secondary mr-2">Edit</Link>
                                    <button onClick={()=> deleteProduct(product.id)} className="button is-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
  );
}

export default ProductListComponent;