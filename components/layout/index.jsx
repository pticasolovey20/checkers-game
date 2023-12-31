import { classNames } from "@/utils";

const Layout = ({ children }) => {
	return (
		<main
			className={classNames(
				"min-h-screen w-full bg-gray-600",
				"flex items-start",
				"sm:items-center justify-center",
				"pt-6 sm:pt-0"
			)}
		>
			<section className="w-[95%] md:w-[70%] lg:w-[60%] xl:w-[45%] xxl:w-[35%]">{children}</section>
		</main>
	);
};

export default Layout;
