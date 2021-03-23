import React, { useState } from 'react';

const Todos = ({ title, subTitle }) => {
	const [todo, setTodo] = useState('');
	const [todoList, setTodoList] = useState([]);

	const handlerAddTodo = () => {
		const todos = [...todoList];
		todos.push(todo);

		setTodoList(todos);
	};

	return (
		<div style={{ width: '100%', textAlign: 'center' }}>
			<h1>{title}</h1>
			<div>
				<input
					type='text'
					placeholder='Add Todo'
					onChange={(e) => setTodo(e.target.value)}
				/>
				<button type='button' onClick={handlerAddTodo}>
					Add Todo
				</button>
			</div>
			<br />
			<div style={{ width: '100%', textAlign: 'center' }}>
				<h2>{subTitle}</h2>
				<ul>
					{todoList.map((todo) => (
						<li key={todo}>{todo}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Todos;
