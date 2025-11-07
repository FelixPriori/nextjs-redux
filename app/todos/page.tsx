import type { Metadata } from 'next'
import { Todos } from '../components/todos/Todos'

export default function TodosPage() {
	return <Todos />
}

export const metadata: Metadata = {
	title: 'Redux Toolkit',
}
