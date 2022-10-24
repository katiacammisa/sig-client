import {BrowserRouter, HashRouter, Route, Routes} from 'react-router-dom';

import React from 'react';
import Home from "./pages/home/Home";
import {CreateProductionOrder} from "./pages/productionOrder/CreateProductionOrder";
import {EnterDust} from "./pages/dust/EnterDust";
import {StoredItems} from "./pages/storage/StoredItems";
import {Stock} from "./pages/stock/Stock";
import {ActiveProductionOrder} from "./pages/productionOrder/ActiveProductionOrder";
import {DetailProductionOrder} from "./pages/productionOrder/DetailProductionOrder";
import {ChecklistProductionOrder} from "./pages/productionOrder/ChecklistProductionOrder";
import { CreateChecklist } from './pages/productionOrder/CreateChecklist';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/productionOrder/creation'} element={<CreateProductionOrder />} />
        <Route path={'/dust/enter'} element={<EnterDust />} />
        <Route path={'/storedItems'} element={<StoredItems />} />
        <Route path={'/activeProductionOrders'} element={<ActiveProductionOrder />} />
        <Route path={'/checklist/:id'} element={<ChecklistProductionOrder />} />
        <Route path={'/details/:id'} element={<DetailProductionOrder />} />
        <Route path={'/createChecklist/:id'} element={<CreateChecklist />} />
        <Route path={'/stock'} element={<Stock />} />
        <Route path={'/indicators'} element={<Home />} />
        <Route path={'/'} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
