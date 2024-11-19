export default function BookLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<p>ini dari layout book</p>
			{children}
		</div>
	);
}
