import ProductListComponent from "./components/ProductListComponent";
import ProductApprovalComponent from "./components/ProductApprovalComponent";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProductFormComponent from "./components/ProductFormComponent";
import ProductFormEditComponent from "./components/ProductFormEditComponent";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<ProductListComponent/>}/>
            <Route path="approval" element={<ProductApprovalComponent/>}/>
            <Route path="create" element={<ProductFormComponent/>}/>
            <Route path="update/:id" element={<ProductFormEditComponent/>}/>
        </Routes>
        <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
