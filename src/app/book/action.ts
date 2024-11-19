"use server";

import { revalidatePath } from "next/cache";

export async function deleteBook(id: string) {
	const response: Response = await fetch(`http://localhost:4000/books/${id}`, {
		method: "DELETE",
	});

	await response.json();
	revalidatePath("/book");
}
