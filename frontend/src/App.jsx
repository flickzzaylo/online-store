import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Header from './layout/Header'
import ListBrands from './pages/task/ListBrands'
import AddBrand from './pages/task/AddBrand'
import BrandData from './pages/task/BrandData'

import ListCategories from "./pages/categories/listCategories";
import AddCategory from "./pages/categories/addCategory";

import Login from "./pages/authorization/Login";
import Register from "./pages/authorization/Register";
import Profile from "./pages/authorization/Profile";
import { connect } from "react-redux";
import CategoryData from "./pages/categories/categoryData";
import ListSales from "./pages/sales/listSales";
import AddSale from "./pages/sales/addSale";
import SaleData from "./pages/sales/saleData";
import ListGoods from "./pages/goods/ListGoods";
import AddGoods from "./pages/goods/AddGoods";
import GoodsData from "./pages/goods/GoodsData";
import SelectGoods from "./pages/SelectGoods";

function App({ user }) {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/listBrands' element={<ListBrands/>} />
                    <Route path='/addBrand' element={<AddBrand/>} />
                    <Route path="/brand/:id" element={<BrandData/>}/>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/listCategories" element={<ListCategories/>} />
                    <Route path="/addCategory" element={<AddCategory/>} />
                    <Route path="/category/:id" element={<CategoryData/>}/>
                    <Route path="/listSales" element={<ListSales/>}/>
                    <Route path="/addSale" element={<AddSale/>}/>
                    <Route path="/sale/:id" element={<SaleData/>}/>
                    <Route path="/listGoods" element={<ListGoods/>}/>
                    <Route path="/addGoods" element={<AddGoods/>}/>
                    <Route path="/good/:id" element={<GoodsData/>}/>
                    <Route path="/selectGoods" element={<SelectGoods/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(App);