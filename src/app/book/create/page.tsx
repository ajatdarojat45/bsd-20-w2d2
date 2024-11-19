import ErrorMessage from "@/components/ErrorMessage";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function CreateBook() {
	async function create(formData: FormData) {
		"use server";

		const payload = {
			title: formData.get("title"),
			excerpt: formData.get("excerpt"),
			description: formData.get("description"),
			price: formData.get("price"),
		};

		const response = await fetch("http://localhost:3000/api/books", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			const data = await response.json();

			const message = data.message.join(" & ");

			redirect(`/book/create?error=${message}`);
		}

		await response.json();

		revalidatePath("/book");
		redirect("/book");
	}
	return (
		<div>
			<h1>Create Book</h1>
			<ErrorMessage />
			<form action={create}>
				<label>Title</label>
				<br />
				<input type="text" name="title" />
				<br />
				<label>Excerpt</label>
				<br />
				<input type="text" name="excerpt" />
				<br />
				<label>Descrption</label>
				<br />
				<textarea name="description" />
				<br />
				<label>Price</label>
				<br />
				<input type="number" name="price" />
				<br />
				<input type="submit" value={"create"} />
			</form>
		</div>
	);
}
