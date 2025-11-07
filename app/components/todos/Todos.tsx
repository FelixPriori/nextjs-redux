'use client'

import {
	addTodo,
	toggleTodo,
	changeFilter,
	selectTodos,
	selectFilter,
} from '@/lib/features/todo/todoSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { ChangeEvent, SyntheticEvent, useCallback, useState } from 'react'
import { Filters, Todo } from '@/app/types/todo'
import styles from './Todos.module.css'

export const Todos = () => {
	const dispatch = useAppDispatch()
	const [todoValue, setTodoValue] = useState('')
	const todos = useAppSelector(selectTodos)
	const filter = useAppSelector(selectFilter)

	const handleTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTodoValue(e.target.value)
	}

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault()
		dispatch(addTodo(todoValue))
		setTodoValue('')
	}

	const handleCompleteTodo = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(toggleTodo(e.target.value))
	}

	const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(changeFilter(e.target.value as Filters))
	}

	const filterTodos = useCallback(
		(todo: Todo): boolean => {
			if (filter === 'active') {
				return !todo.completed
			} else if (filter === 'completed') {
				return todo.completed
			}
			return true
		},
		[filter],
	)

	return (
		<div>
			<form onSubmit={handleSubmit} className={styles.row}>
				<input
					className={styles.input}
					type="text"
					value={todoValue}
					onChange={handleTodoChange}
					placeholder="Write your todo"
				></input>
				<button
					type="submit"
					className={styles.button}
					aria-label="Add todo"
					disabled={!todoValue}
				>
					+
				</button>
			</form>
			<fieldset>
				<legend>Filter todos</legend>
				<div>
					<input
						type="radio"
						id="all"
						name="filter"
						value="all"
						onChange={handleFilterChange}
						checked={filter === 'all'}
					/>
					<label htmlFor="all">All</label>
				</div>

				<div>
					<input
						type="radio"
						id="active"
						name="filter"
						value="active"
						onChange={handleFilterChange}
						checked={filter === 'active'}
					/>
					<label htmlFor="active">Active</label>
				</div>

				<div>
					<input
						type="radio"
						id="completed"
						name="filter"
						value="completed"
						onChange={handleFilterChange}
						checked={filter === 'completed'}
					/>
					<label htmlFor="completed">Completed</label>
				</div>
			</fieldset>
			<fieldset>
				<legend>Your todos</legend>
				{todos?.filter(filterTodos).map(todo => (
					<div key={todo.id}>
						<input
							type="checkbox"
							onChange={handleCompleteTodo}
							checked={todo.completed}
							id={todo.id}
							name="todos"
							value={todo.id}
						/>
						<label htmlFor={todo.id}>{todo.text}</label>
					</div>
				))}
			</fieldset>
		</div>
	)
}
