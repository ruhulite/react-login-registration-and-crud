import {useEffect, useState} from "react";
import api from "../service/api.js";

const AddToDoForm = ({editId, onSubmitData}) => {
    const [todoData, setTodoData] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (editId) {
            api.get('/todos').then((response) => {
                const item = response.data.find(item => item.id === editId);
                setTodoData(item.value);
            }).catch((error) => {
                console.log(error);
                setError(error);
            })
        }
    }, [editId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmitData(todoData)
        setTodoData('')
    }

    return <form
        className="width-full pb-6"
        onSubmit={handleSubmit}
    >
        <div className="pt-6">
            {error && (<p className="text-red-500 text-center text-sm mb-3">{error}</p>)}
            <div className="flex gap-2">
                <input
                    type="text"
                    className="w-full p-2 border rounded capitalize"
                    value={todoData}
                    onChange={(e) => setTodoData(e.target.value)}
                    placeholder="Add todo"
                    required
                />
                <button
                    className=" bg-blue-500 text-white py-2 rounded-md cursor-pointer min-w-25"
                    type="submit"
                >
                    {editId ? "Update" : "Add Item"}
                </button>
            </div>
        </div>
    </form>
};

export default AddToDoForm;