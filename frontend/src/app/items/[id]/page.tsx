'use client'

import { useEffect, useState } from "react";

import { IItem } from "../interfaces";

const ItemPage = ({
    params
}: {
    params: { id: string };
}) => {
    const itemId = params.id
    const [item, setItem] = useState<IItem | null>(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/items/${itemId}`);
                const data: IItem = await res.json();
                setItem(data);
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        };

        if (itemId) {
            fetchItem();
        }
    }, [itemId]);

    if (!item) {
        return;
    }

    return (
        <div>
            <h1 className="text-3xl font-semibold">{item.name}</h1>
        </div>
    );
}

export default ItemPage