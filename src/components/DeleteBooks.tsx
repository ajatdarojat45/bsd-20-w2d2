"use client";

import { deleteBook } from "@/app/book/action";
import { ObjectId } from "mongodb";

type Props = { bookId: string };
export default function DeleteBook({ bookId }: Props) {
	return <button onClick={() => deleteBook(bookId)}>Delete Book</button>;
}
