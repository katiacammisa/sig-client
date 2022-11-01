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
import { FinishedProductionOrder } from './pages/productionOrder/FinishedProductionOrder';
import { CreateFailure } from './pages/failure/CreateFailure';
import { ViewFailures } from './pages/failure/ViewFailures';
import { CreateTurn } from './pages/turn/CreateTurn';
import { TurnList } from './pages/turn/TurnList';
import { CreateControlPrensa } from './pages/control/CreateControlPrensa';
import { ViewTurnsControl } from './pages/control/ViewTurnsControl';
import { CreateControlSinterizado } from './pages/control/CreateControlSinterizado';
import { CreateControlRoscado } from './pages/control/CreateControlRoscado';
import { CreateControlTorno } from './pages/control/CreateControlTorno';
import { CreateControlPavonado } from './pages/control/CreateControlPavonado';
import { ViewControlPrensa } from './pages/control/ViewControlPrensa';
import { ViewControlSinterizado } from './pages/control/ViewControlSinterizado';
import { ViewControlRoscado } from './pages/control/ViewControlRoscado';
import { ViewControlTorno } from './pages/control/ViewControlTorno';
import { ViewControlPavonado } from './pages/control/ViewControlPavonado';
import { ScrapItems } from './pages/scrap/ScrapItems';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/productionOrder/creation'} element={<CreateProductionOrder />} />
        <Route path={'/dust/enter'} element={<EnterDust />} />
        <Route path={'/storedItems'} element={<StoredItems />} />
        <Route path={'/activeProductionOrders'} element={<ActiveProductionOrder />} />
        <Route path={'/endedProductionOrders'} element={<FinishedProductionOrder />} />
        <Route path={'/checklist/:id'} element={<ChecklistProductionOrder />} />
        <Route path={'/details/:id'} element={<DetailProductionOrder />} />
        <Route path={'/createChecklist/:id'} element={<CreateChecklist />} />
        <Route path={'/stock'} element={<Stock />} />
        <Route path={'/scrap'} element={<ScrapItems />} />
        <Route path={'/indicators'} element={<Home />} />

        <Route path={'/failures/creation'} element={<CreateFailure />} />
        <Route path={'/failures/view'} element={<ViewFailures />} />

        <Route path={'/createTurn/:machine/:id'} element={<CreateTurn />} />
        <Route path={'/turns/:machine/:id'} element={<TurnList />} />

        <Route path={'/controlTurns/:machine/:id'} element={<ViewTurnsControl />} />
        <Route path={'/controlPrensa/:turnId'} element={<CreateControlPrensa />} />
        <Route path={'/controlSinterizado/:turnId'} element={<CreateControlSinterizado />} />
        <Route path={'/controlRoscadora/:turnId'} element={<CreateControlRoscado />} />
        <Route path={'/controlTorno/:turnId'} element={<CreateControlTorno />} />
        <Route path={'/controlPavonado/:turnId'} element={<CreateControlPavonado />} />

        <Route path={'/viewControlPrensa/:turnId'} element={<ViewControlPrensa />} />
        <Route path={'/viewControlSinterizado/:turnId'} element={<ViewControlSinterizado />} />
        <Route path={'/viewControlRoscadora/:turnId'} element={<ViewControlRoscado />} />
        <Route path={'/viewControlTorno/:turnId'} element={<ViewControlTorno />} />
        <Route path={'/viewControlPavonado/:turnId'} element={<ViewControlPavonado />} />

        <Route path={'/'} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
