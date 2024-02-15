// components/NewItemForm.tsx
'use client'

import React, { useState } from 'react';

interface NewItemFormProps {
    onAdd: (name: string) => void;
}

const NewItemForm: React.FC<NewItemFormProps> = ({ onAdd }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() !== '') {
            onAdd(name);
            setName('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter item name"
                className="border border-gray-300 rounded-md p-2 mr-2"
            />
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Add Item</button>
        </form>
    );
};

export default NewItemForm;
