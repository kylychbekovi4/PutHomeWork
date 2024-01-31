import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
	const [todo, setTodo] = useState([]);
	const [input, setInput] = useState("");
	const [isedit, setisEdit] = useState(false);
	const [editeridToDo, setediteridToDo] = useState(null);
	const [editInputValue, seteditInputValue] = useState("");

	const handleAdd = async () => {
		const newData = {
			name: input,
		};
		const response = await axios.post(
			`https://elchocrud.pro/api/v1/546bfa332e47aefe19c47643c09ceed3/homework`,
			newData
		);
		setTodo (response.data);
		setInput("");
	};

	const getTodo = async () => {
		const response = await axios.get(
			`https://elchocrud.pro/api/v1/546bfa332e47aefe19c47643c09ceed3/homework`
		);
		setTodo(response.data);
	};

	const deleteTodo = async (id) => {
		const response = await axios.delete(
			`https://elchocrud.pro/api/v1/546bfa332e47aefe19c47643c09ceed3/homework/${id}`
		);
		setTodo(response.data);
	};

	const deleteAllTodo = async () => {
		const response = await axios.delete(
			`https://elchocrud.pro/api/v1/546bfa332e47aefe19c47643c09ceed3/homework`
		);
		setTodo(response.data || []);
	};

	const putToDo = async (id) => {
		const updateData = {
			name: editInputValue,
		};
		const response = await axios.put(
			`https://elchocrud.pro/api/v1/546bfa332e47aefe19c47643c09ceed3/homework/${id}`,
			updateData
		);
		console.log(response.data);
		setTodo(response.data);
	};

	useEffect(() => {
		getTodo();
	}, []);
	return (
		<div>
			<input
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<button onClick={handleAdd}>Add</button>
			<button onClick={deleteAllTodo}>DeleteAll</button>
			{todo.map((item) => (
				<div key={item._id}>
					<h1>{item.name}</h1>
					<button
						onClick={() => {
							setisEdit(true);
							setediteridToDo(item._id);
              seteditInputValue(item.name);
						}}>
						Edit
					</button>
					<button
						onClick={() => {
							deleteTodo(item._id);
						}}>
						delete
					</button>
					{isedit && editeridToDo === item._id ? (
						<div>
							<input
								value={editInputValue}
								type="text"
								onChange={(e) => {
									seteditInputValue(e.target.value);
								}}
							/>
							<button
								onClick={() => {
									putToDo(item._id);
									setisEdit(false);
								}}>
								Save
							</button>
						</div>
					) : null}
				</div>
			))}
		</div>
	);
};

export default App;
