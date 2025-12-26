import User from "./User";
import Test from "./Test"
import Product from "./Product";
import QuantityUnit from "./QuantityUnit";
import Brand from "./Brand";
import Branch from "./Branch";
import Area from "./Area";
import Price from "./Price";
import Product_lot from "./Product_lot";
import Promotion from "./Promotion";
import Customer from "./Customer";
import Product_sub from "./Product_sub";
import Item from "./Item";
import ItemExchange from "./Item_exchange";
export const routes = [
    ...ItemExchange,
    ...Item,
    ...Product_sub,
    ...Customer,
    ...Promotion,
    ...Product_lot,
    ...Price,
    ...Area,
    ...Branch,
    ...Brand,
    ...QuantityUnit,
    ...Product,
    ...User,
    ...Test
];