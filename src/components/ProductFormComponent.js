import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductFormComponent = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();

    const createProduct = async (e) => {
        e.preventDefault();
        const newProduct = {
            name: name,
            description: description,
            price: price
        };
        try {
            await axios.post("http://localhost:8080/products", newProduct);
            toast.success( "SUCCESS", {
                position: "top-center",
            });
            navigate("/");
        }catch (error){
            toast.error( error.message, {
                position: "top-center",
            });
            console.log(error)
        }

        setName("");
        setDescription("");
        setPrice("");
    }

    return (
        <div className="columns mt-5 is-centered">
            <Link to={`/`} className= "button is-family-secondary mr-3">Back</Link>
            <div className="column is-half">
                <form onSubmit={createProduct}>
                    <div className="field">
                        <label className="label">Product Name</label>
                        <div className="control">
                            <input className="input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Description</label>
                        <div className="control">
                            <textarea className="textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Price</label>
                        <div className="control">
                            <input className="input" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price"></input>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-success">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductFormComponent;