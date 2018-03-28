import { createSelector } from "@ngrx/store";


import * as fromRoot from "../../../app/store";

import * as fromFeature from "../reducers";

import * as fromPizzas from "../reducers/pizzas.reducer";
import * as fromToppings from "./toppings.selectors";
import { Pizza } from "../../models/pizza.model";

export const getPizzaState = createSelector(
	fromFeature.getProductsState,
	(state: fromFeature.ProductsState) => state.pizzas
);

//gets the state of products: data, loaded, loading in products model
//separate our app state with comp trees and pass slices of state we need to particular component
export const getPizzasEntities = createSelector(
	getPizzaState,
	fromPizzas.getPizzasEntities
);

export const getSelectedPizza = createSelector(
	getPizzasEntities,
	fromRoot.getRouterState,
	(entities, router): Pizza => {
		console.log('entities', entities);
		return router.state && entities[router.state.params.pizzaId];
	}
);

export const getPizzaVisualised = createSelector(
	getSelectedPizza, //gets the current pizza selected
	fromToppings.getToppingEntities,//get all entities toppings
	fromToppings.getSelectedToppings,//ref array of selected topping entities
	(pizza, toppingEntities, selectedToppings) => {
		const toppings = selectedToppings.map(id => toppingEntities[id]);
		return { ...pizza, toppings };
	}
)

export const getAllPizzas = createSelector(getPizzasEntities, entities => {
	return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getPizzasLoaded = createSelector(
	getPizzaState,
	fromPizzas.getPizzasLoaded
);
export const getPizzasLoading = createSelector(
	getPizzaState,
	fromPizzas.getPizzasLoading
);
