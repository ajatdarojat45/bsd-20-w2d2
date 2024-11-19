import { ObjectId, WithId } from "mongodb";
import { db } from "../config/index";
import { z } from "zod";
import { title } from "process";

export interface IBookInput {
	title: string;
	excerpt: string;
	description: string;
	price: number;
}

export type IBook = WithId<IBookInput>;

const BookSchema = z.object({
	title: z.string().min(3),
	excerpt: z.string(),
	description: z.string(),
	price: z.number().min(10000).max(100000),
});

export default class Book {
	static getCollection() {
		return db.collection<IBookInput>("books");
	}

	static async find(): Promise<IBook[]> {
		const collection = this.getCollection();

		const books: IBook[] = await collection.find().toArray();

		return books;
	}

	static async findById(id: string): Promise<IBook | null> {
		const _id = new ObjectId(id);
		const collection = this.getCollection();

		const book: IBook | null = await collection.findOne({ _id });

		return book;
	}

	static async create(body: IBookInput): Promise<{ message: string }> {
		const collection = this.getCollection();

		BookSchema.parse(body);

		await collection.insertOne(body);

		return { message: "Successfully added data" };
	}
}
