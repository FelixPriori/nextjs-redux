import { createAppSlice } from '@/lib/createAppSlice'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Filters, Todo, Todos } from '@/app/types/todo'
import { v4 as uuidv4 } from 'uuid'

export interface CounterSliceState {
	value: Todos
	filter: Filters
}

const initialState: CounterSliceState = {
	value: [],
	filter: 'all',
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const todoSlice = createAppSlice({
	name: 'counter',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: create => ({
		addTodo: create.reducer((state, action: PayloadAction<string>) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			const newTodo: Todo = {
				id: uuidv4(),
				text: action.payload,
				completed: false,
			}
			state.value.unshift(newTodo)
		}),
		toggleTodo: create.reducer((state, action: PayloadAction<string>) => {
			const todoIndex = state.value.findIndex(
				todo => todo.id === action.payload,
			)
			if (todoIndex >= 0) {
				state.value[todoIndex].completed = !state.value[todoIndex].completed
			}
		}),
		changeFilter: create.reducer((state, action: PayloadAction<Filters>) => {
			state.filter = action.payload
		}),
	}),
	// You can define your selectors here. These selectors receive the slice
	// state as their first argument.
	selectors: {
		selectTodos: todos => todos.value,
		selectFilter: todos => todos.filter,
	},
})

// Action creators are generated for each case reducer function.
export const { addTodo, toggleTodo, changeFilter } = todoSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectTodos, selectFilter } = todoSlice.selectors
