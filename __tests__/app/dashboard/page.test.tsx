import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "@/app/dashboard/(overview)/page";

describe("Dashboard Overview Page", () => {
	it("Renders a WIP message", () => {
		render(<Page />);

		const mainWIP = screen.getByRole("heading", { level: 1 });
		expect(mainWIP).toBeInTheDocument();
		//TO-DO: figure out how to check the value of the header
	});
});
