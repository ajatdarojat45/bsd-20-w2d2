import Book, { IBook, IBookInput } from "@/db/models/Book";
import { ZodError } from "zod";

export async function GET(request: Request) {
	const books: IBook[] = await Book.find();

	return Response.json(books);
}

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const payload: IBookInput = {
			title: body.title,
			excerpt: body.excerpt,
			description: body.description,
			price: body.price,
		};

		const book = await Book.create(payload);

		return Response.json(book, { status: 201 });
	} catch (error: unknown) {
		if (error instanceof ZodError) {
			console.log("masuk sini");
			const errors: string[] = error.errors.map((el) => el.message);
			return Response.json({ message: errors }, { status: 400 });
		} else {
			console.log("internal");
			return Response.json({ message: "Internal server error" }, { status: 500 });
		}
	}
}
