import { MyApp } from "./../src/pages/_app";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { trpc } from "../src/utils/trpc";
import client from "next-auth";

jest.mock("next-auth/client");
describe("App", () => {
  it("renders app without crashing", () => {
    // jest.spyOn(trpc, "useQuery").mockReturnValue({ greeting: "Greeting" });
    const mockSession = {
      expires: "1",
      user: { email: "a", name: "Delta", image: "c" },
    };

    // render(<MyApp />);

    const logo = screen.findByText("chessthunder");
    expect(logo).toBeInTheDocument();
  });
});
