import { IBook } from "@/db/models/Book";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
	params: Params;
};

type Params = {
	id: string;
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const id = (await params).id;

	const response: Response = await fetch(
		`http://localhost:3000/api/books/${id}`
	);
	const book: IBook = await response.json();

	return {
		title: book.title,
		description: book.excerpt,
		openGraph: {
			images: ["/some-specific-page-image.jpg"],
		},
	};
}

export default async function BookDetail(props: Props) {
	const { id } = props.params;

	const response: Response = await fetch(
		`http://localhost:3000/api/books/${id}`
	);
	const book: IBook = await response.json();
	return (
		<div>
			<h1>Book Detail</h1>
			<pre>{JSON.stringify(book, null, 2)}</pre>
		</div>
	);
}
