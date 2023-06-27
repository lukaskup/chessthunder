import { Navigation } from "../src/components/navigation/index";
import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
jest.mock("next-auth/react");

describe("Navigation component", () => {
  it("nav renders", () => {
    async () => {
      render(<Navigation />);
      expect(screen.getByText("chessthunder")).toBeInTheDocument();
    };
  });

  it("sign in button shows if unauthenticated", () => {
    async () => {
      render(<Navigation />);
      expect(screen.getByText("Sign in")).toBeInTheDocument();
    };
  });

  it("profile picture if authenticated", () => {
    async () => {
      const mockSession = {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: { username: "admin" },
      };
      (useSession as jest.Mock).mockReturnValueOnce([
        mockSession,
        "authenticated",
      ]);
      render(<Navigation />);
      expect(screen.getByTestId("XD")).toBeInTheDocument();
    };
  });
});
