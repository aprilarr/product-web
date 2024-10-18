import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ProductApprovalComponent = () => {

    const [productsApproval, setProductsApproval] = useState([]);

    useEffect(()=> {
        getProductPending();
    }, []);

    const getProductPending = async () => {
        const response = await axios.get("http://localhost:8080/products/pending");
        setProductsApproval(response.data);
    };

    const approveProduct = async (id) => {
        try {
            await axios.put(`http://localhost:8080/products/${id}/approve`);
            getProductPending();
            toast.success( "APPROVED", {
                position: "top-center",
            });
        }catch (error){
            toast.error( error.message, {
                position: "top-center",
            });
            console.log(error)
        }
    };

    const rejectProduct = async (id) => {
        try {
            await axios.put(`http://localhost:8080/products/${id}/reject`);
            getProductPending();
            toast.success( "REJECTED", {
                position: "top-center",
            });
        }catch (error) {
            toast.error( error.message, {
                position: "top-center",
            });
            console.log(error)
        }
    };

    return (
        <div className="columns mt-5 is-centered">
            <Link to={`/`} className= "button is-success mr-3">Back</Link>
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
                    {productsApproval.map((product, index) => (
                        <tr key={index}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.status}</td>
                            <td>
                                <button onClick={()=> approveProduct(product.id)} className="button is-success mr-2">Approve</button>
                                <button onClick={()=> rejectProduct(product.id)} className="button is-danger mr-2">Reject</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductApprovalComponent;