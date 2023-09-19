const Layout = ({ children }) => {
	return (
		<main className="min-h-screen w-full flex items-center justify-center">
			<div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%] xxl:w-[33%]">{children}</div>
		</main>
	);
};

export default Layout;
