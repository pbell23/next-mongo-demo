'use client'

import { addItem, deleteItem, fetchItems, updateItem } from "./lib/items-api";
import { useEffect, useState } from "react";

import { IItem } from "./interfaces";
import ItemList from "./components/ItemList";
import NewItemForm from "./components/NewItemForm";

const ItemsPage = () => {
    const [items, setItems] = useState<IItem[]>([]);

    useEffect(() => {
        fetchItems().then((data) => setItems(data)).catch((err) => console.error('Error fetching items:', err))
    }, []);

    const handleAddItem = async (name: string) => {
        try {
            const newItem = await addItem(name);
            setItems([...items, newItem]);
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const handleDeleteItem = async (id: string) => {
        try {
            await deleteItem(id)
            setItems(items.filter(item => item._id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleUpdateItem = async (id: string, newName: string) => {
        try {
            await updateItem(id, newName)
            setItems(items.map(item => (item._id === id ? { ...item, name: newName } : item)));
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-semibold mb-4">Items App</h1>
            <NewItemForm onAdd={handleAddItem} />
            <ItemList items={items} onDelete={handleDeleteItem} onUpdate={handleUpdateItem} />
        </div>
    )
}

export default ItemsPage