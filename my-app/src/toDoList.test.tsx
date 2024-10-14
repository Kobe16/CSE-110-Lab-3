import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { dummyGroceryList } from "./constants";


describe("Read Todo List", () => {
    test("Check that all items are displayed on test", () => {
        render(<ToDoList />);
        for (const element of dummyGroceryList) {
            const grocItem = screen.getByText(element.name);
            expect(grocItem).toBeInTheDocument();
        }
    });

    test("Check items bought before clicking anything", () => {
        render(<ToDoList />);

        const checkboxes0 = screen.getAllByTestId('todo-list-checkbox');
        const itemsBought0 = screen.getByText("Items bought: 0");

        // Before anything is checked
        expect(itemsBought0).toBeInTheDocument();


    });

    test("Check items bought after clicking both", () => {
        render(<ToDoList />);


        const checkboxes1 = screen.getAllByTestId('todo-list-checkbox');

        for (let i = 0; i < 2; i++) {
            fireEvent.click(checkboxes1[0])
        }

        const itemsBought1 = screen.getByText("Items bought: 2")
        expect(itemsBought1).toBeInTheDocument();

    });

});
