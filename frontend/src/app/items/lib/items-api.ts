import { IItem } from "../interfaces";

const itemsApiUrl = process.env.NEXT_PUBLIC_ITEMS_API_URL!

export const fetchItems = async () => {
    const res = await fetch(itemsApiUrl);
    const data: IItem[] = await res.json();
    return data
};

export const addItem = async (name: string) => {
    const res = await fetch(itemsApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    });
    const newItem: IItem = await res.json();
    return newItem;
};

export const deleteItem = async (id: string) => {
    await fetch(`${itemsApiUrl}/${id}`, {
        method: 'DELETE',
    });
};

export const updateItem = async (id: string, newName: string) => {
    await fetch(`${itemsApiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
    });
};