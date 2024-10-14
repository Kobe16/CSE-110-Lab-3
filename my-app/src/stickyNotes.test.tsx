import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";


describe("Create StickyNote", () => {
    test("renders create note form", () => {
        render(<StickyNotes />);

        const createNoteButton = screen.getByText("Create Note");
        expect(createNoteButton).toBeInTheDocument();
    });

    test("creates a new note", () => {
        render(<StickyNotes />);

        // Please make sure your sticky note has a title and content input field with the following placeholders.
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea =
            screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "Note content" },
        });
        fireEvent.click(createNoteButton);

        const newNoteTitle = screen.getByText("New Note");
        const newNoteContent = screen.getByText("Note content");

        expect(newNoteTitle).toBeInTheDocument();
        expect(newNoteContent).toBeInTheDocument();
    });
});


describe("Update StickyNote", () => {
    test("Check sticky note after update", () => {
        const handleContentChange = jest.fn();
        render(<StickyNotes />);

        const editableTitleDivs = screen.getAllByTestId('editable-title');

        expect(editableTitleDivs[0]).toHaveTextContent('test note 1 title');
        expect(editableTitleDivs[1]).toHaveTextContent('test note 2 title');

        fireEvent.input(editableTitleDivs[0], { target: { textContent: 'Updated first title' } });
        fireEvent.input(editableTitleDivs[1], { target: { textContent: 'Updated second title' } });

        expect(editableTitleDivs[0]).toHaveTextContent('Updated first title');
        expect(editableTitleDivs[1]).toHaveTextContent('Updated second title');

    });


});



describe("Read StickyNote", () => {
    test("reads old sticky notes", () => {
        render(<StickyNotes />);
        for(let i = 1; i <= 6; i++) {
            const newNoteTitle = screen.getByText("test note " + i + " title");
            const newNoteContent = screen.getByText("test note " + i + " content");

            expect(newNoteTitle).toBeInTheDocument();
            expect(newNoteContent).toBeInTheDocument();
        }
    });

    test("reads new sticky notes", () => {
        render(<StickyNotes />);

        for(let i = 0; i < 4; i++) {
            // Please make sure your sticky note has a title and content input field with the following placeholders.
            const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
            const createNoteContentTextarea =
                screen.getByPlaceholderText("Note Content");
            const createNoteButton = screen.getByText("Create Note");

            fireEvent.change(createNoteTitleInput, { target: { value: "New Note "+ i } });
            fireEvent.change(createNoteContentTextarea, {
                target: { value: "Note content. Additional content " + i },
            });
            fireEvent.click(createNoteButton);

            const newNoteTitle = screen.getByText("New Note " + i);
            const newNoteContent = screen.getByText("Note content. Additional content " + i);

            expect(newNoteTitle).toBeInTheDocument();
            expect(newNoteContent).toBeInTheDocument();
        }
    });
});

describe("Delete StickyNote", () => {
    test("Delete sticky check for removal", () => {
        render(<StickyNotes />);

        const deleteNoteButton = screen.getAllByText("x");
        fireEvent.click(deleteNoteButton[0]);

        const newNoteTitle = screen.queryByText("New Note 1");
        const newNoteContent = screen.queryByText("Note 1 content");

        expect(newNoteTitle).toBeNull();
        expect(newNoteContent).toBeNull();
    });

    test("Delete all sticky notes", () => {
        render(<StickyNotes />);

        const deleteNoteButtons = screen.getAllByText("x");

        for (const deleteButton of deleteNoteButtons) {
            fireEvent.click(deleteButton);
        }
        
        const editableTitleDivs = screen.queryAllByTestId('editable-title');

        expect(editableTitleDivs.length).toEqual(0)
    });



});
