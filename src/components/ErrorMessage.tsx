"use client";

import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

export default function ErrorMessage() {
	const searchParams = useSearchParams();
	const error = searchParams.get("error");

	return <div>{error && <p className="text-red-600">Error: {error}</p>}</div>;
}
