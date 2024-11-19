import Book, { IBook } from "@/db/models/Book";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const book: IBook | null = await Book.findById(params.id);

	if (!book) Response.json({ message: "Book not found" }, { status: 404 });

	return Response.json(book);
}
