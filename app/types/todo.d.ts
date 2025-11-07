export type Todo = {
	id: string
	text: string
	completed: boolean
}

export type Todos = Array<Todo>

export type Filters = 'all' | 'active' | 'completed'
