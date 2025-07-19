const TodoList = ({items, itemDelete, editItem}) => {
    const handleEdit = (id) => {
        editItem(id);
    }

    const handleDelete = (id) => {
        itemDelete(id)
    }


    return <>
        {items.map((item, index) => (
            <div
                key={item.id || index}
                className="capitalize p-3 flex gap-3"
            >
                <p className="w-full">{item.value}</p>
                <button
                    className="bg-green-700 py-1 px-2 rounded-sm text-white text-xs cursor-pointer hover:bg-green-900"
                    onClick={() => handleEdit(item.id)}
                >Edit</button>
                <button
                    className="bg-red-700 py-1 px-2 rounded-sm text-white text-xs cursor-pointer hover:bg-red-900"
                    onClick={() => handleDelete(item.id)}
                >Delete</button>
            </div>
        ))}
    </>
};

export default TodoList;