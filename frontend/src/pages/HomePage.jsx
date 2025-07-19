import {useEffect, useState} from 'react';
import AddToDoForm from "../components/AddToDoForm.jsx";
import TodoList from "../components/TodoList.jsx";
import api from "../service/api.js";
import {useNavigate} from "react-router-dom";
import {useSession} from "../context/SessionContext.jsx";

const HomePage = () => {
    const navigate = useNavigate();
    const { user, logout } = useSession()

    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [editId, setEditId] = useState(null);

    const getData = () => {
        api.get('/todos').then((response) => {
            setItems(response.data);
        }).catch((error) => {
            console.log(error);
            setError(error);
        })
    }

    useEffect( () => {
        getData();
    }, []);

    const handleAddDataSubmit = (item) => {
        // console.log(item);
        // setItems([...items, item]);

        api.post('/todos', {value: item.toLowerCase()}).then(() => {
            setMessage(`Item added successfully`);
            setEditId(null);
            setError('');
            getData();
        }).catch(error => {
            console.log('error', error);
            setError("There is something went wrong");
            setMessage('')
        });
    }

    const handleEditDataSubmit = (item) => {
        // console.log(item);
        // setItems([...items, item]);

        api.put(`/todos/${editId}`, {value: item.toLowerCase()}).then(() => {
            setMessage(`Item updated successfully`);
            setEditId(null);
            setError('');
            getData();
        }).catch(error => {
            console.log('error', error);
            setError("There is something went wrong");
            setMessage('')
        });
    }

    const handleEditItem = (id) => {
        setEditId(id);
    }

    const handleDeleteItem = async (id) => {
        await api.delete(`/todos/${id}`).then((response) => {
            const itemDelete = items.filter((item) => item.id !== response.data.id);
            setItems(itemDelete);
            setMessage('Item deleted Successfully');
        }).catch((error) => {
            console.log(error);
            setError(error);
            setMessage(null);
        })
    }

    const handleLogout = () => {
        logout(user);
        navigate('/login');
    }

    return <div className="container container-md mx-auto px-2 flex flex-col w-full items-center h-screen">
        <div className="bg-white rounded-lg shadow-md w-xl p-4 mt-10">
            <h2 className="text-center items-center justify-center text-gray-900 text-lg font-bold w-full">TODO List</h2>
            <hr className="text-gray-200 mt-6" />
            {error && (<p className="text-red-500 text-center text-sm mb-3 mt-4">{error}</p>)}
            {message && (<p className="text-green-600 text-center text-sm mb-3 mt-4">{message}</p>)}
            {editId ? (
                <AddToDoForm onSubmitData={handleEditDataSubmit} editId={editId} />
            ) : (
                <AddToDoForm onSubmitData={handleAddDataSubmit} />
            )}
            <div className="w-full pt-3">
                <TodoList items={items} itemDelete={handleDeleteItem} editItem={handleEditItem} />
            </div>
            <hr className="text-gray-200 mt-6" />
            <div className="flex justify-center items-center">
                <button
                    className="bg-red-600 py-3 px-5 rounded my-6 text-white cursor-pointer"
                    onClick={handleLogout}
                >Logout</button>
            </div>
        </div>
    </div>
};

export default HomePage;