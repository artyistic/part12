import { render, screen, cleanup } from "@testing-library/react";
import Todo from "../Todos/Todo";
// afterEach function runs after each test suite is executed
afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
});

describe("Button Component", () => {
  const mockDelete = jest.fn();
  const mockComplete = jest.fn();

  test("Button Text", () => {
    const testTodo = {
      text: "jest test",
      done: false
    }
    render(<Todo todo={testTodo} onClickComplete={mockComplete} onClickDelete={mockDelete}/>);
    const status = screen.getByTestId("status");
    expect(status).toHaveTextContent("This todo is not done");
  });

  test("Button complete", () => {
    const testTodo = {
      text: "jest test",
      done: false
    }
    render(<Todo todo={testTodo} onClickComplete={mockComplete} onClickDelete={mockDelete}/>);
    const completeButton = screen.getByTestId("completeButton")
    // const deleteButton = screen.getByTestId("deleteButton")
    const status = screen.getByTestId("status");

    // const todoText = screen.getByTestId("todoText")
    expect(completeButton).toHaveTextContent("Set as done");
  })

  test("Button complete", () => {
    const testTodo = {
      text: "jest test",
      done: false
    }
    render(<Todo todo={testTodo} onClickComplete={mockComplete} onClickDelete={mockDelete}/>);
    const deleteButton = screen.getByTestId("deleteButton")
    expect(deleteButton).toHaveTextContent("Delete");
  })

  test("Button done==true", () => {
    const testTodo = {
      text: "jest test",
      done: true
    }
    render(<Todo todo={testTodo} onClickComplete={mockComplete} onClickDelete={mockDelete}/>);
    const deleteButton = screen.getByTestId("deleteButton")
    const completeButton = screen.queryByTestId("completeButton")
    expect(deleteButton).toHaveTextContent("Delete");
    expect(completeButton).not.toBeInTheDocument();
  })
});