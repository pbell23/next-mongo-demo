// components/ItemList.tsx
'use client'

import React, { useState } from 'react';

import { IItem } from '../interfaces';
import Item from './Item';

interface ItemListProps {
    items: IItem[];
    onDelete: (id: string) => void;
    onUpdate: (id: string, newName: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onDelete, onUpdate }) => {
    const [editItemId, setEditItemId] = useState<string | null>(null);
    const [newItemName, setNewItemName] = useState<string>('');

    const handleEdit = (id: string, name: string) => {
        setEditItemId(id);
        setNewItemName(name);
    };

    const handleCancelEdit = () => {
        setEditItemId(null);
        setNewItemName('');
    };

    const handleUpdate = (id: string) => {
        onUpdate(id, newItemName);
        setEditItemId(null);
        setNewItemName('');
    };

    return (
        <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-2">Items</h2>
            <ul className="grid grid-cols-1 gap-4">
                {items.map(item => (
                    <li key={item._id} className="bg-white shadow-md rounded-md p-4 flex justify-between items-center">
                        {editItemId === item._id ? (
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={newItemName}
                                    onChange={e => setNewItemName(e.target.value)}
                                    className="border border-gray-300 rounded-md p-2 mr-2"
                                />
                                <button onClick={() => handleUpdate(item._id)} className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2">Update</button>
                                <button onClick={handleCancelEdit} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md">Cancel</button>
                            </div>
                        ) : (
                            <Item item={item} onDelete={onDelete} onEdit={handleEdit} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
