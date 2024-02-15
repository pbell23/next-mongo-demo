import { IItem } from "../interfaces"
import Link from "next/link"
import React from "react"

interface ItemProps {
    item: IItem;
    onDelete: (id: string) => void;
    onEdit: (id: string, name: string) => void;
}

const Item = ({ item, onDelete, onEdit }: ItemProps) => {
    return <React.Fragment>
        <Link href={`/items/${item._id}`}>
            <span className="text-lg font-semibold">{item.name}</span>
        </Link>
        <div>
            <button onClick={() => onEdit(item._id, item.name)} className="text-blue-500 mr-2">Edit</button>
            <button onClick={() => onDelete(item._id)} className="text-red-500">Delete</button>
        </div>
    </React.Fragment>
}

export default Item