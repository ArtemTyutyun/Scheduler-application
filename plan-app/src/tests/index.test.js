// test for List.js //
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import List from './List';

const tasks = [
  { id: 1, name: 'Task 1' },
  { id: 2, name: 'Task 2' },
  { id: 3, name: 'Task 3' },
];

const onDeleteMock = jest.fn();
const onEditMock = jest.fn();

describe('List component', () => {
  beforeEach(() => {
    onDeleteMock.mockClear();
    onEditMock.mockClear();
  });

  test('renders list of tasks', () => {
    const selectedDate = new Date('2023-05-30');
    render(
      <List
        tasks={tasks}
        onDelete={onDeleteMock}
        onEdit={onEditMock}
        selectedDate={selectedDate}
      />
    );

    const taskElements = screen.getAllByTestId('task');
    expect(taskElements).toHaveLength(tasks.length);
  });

  test('displays "No tasks" message when tasks array is empty', () => {
    const selectedDate = new Date('2023-05-30');
    render(
      <List
        tasks={[]}
        onDelete={onDeleteMock}
        onEdit={onEditMock}
        selectedDate={selectedDate}
      />
    );

    const noTasksElement = screen.getByText('No tasks for the selected date.');
    expect(noTasksElement).toBeInTheDocument();
  });

  test('calls onDelete function when delete button is clicked', () => {
    const selectedDate = new Date('2023-05-30');
    render(
      <List
        tasks={tasks}
        onDelete={onDeleteMock}
        onEdit={onEditMock}
        selectedDate={selectedDate}
      />
    );

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    expect(onDeleteMock).toHaveBeenCalledTimes(1);
    expect(onDeleteMock).toHaveBeenCalledWith(tasks[0].id);
  });

  test('enters edit mode when edit button is clicked', () => {
    const selectedDate = new Date('2023-05-30');
    render(
      <List
        tasks={tasks}
        onDelete={onDeleteMock}
        onEdit={onEditMock}
        selectedDate={selectedDate}
      />
    );

    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);

    const taskInput = screen.getByRole('textbox');
    expect(taskInput).toBeInTheDocument();
    expect(taskInput.value).toEqual(tasks[0].name);
  });

  test('calls onEdit function when save button is clicked', () => {
    const selectedDate = new Date('2023-05-30');
    render(
      <List
        tasks={tasks}
        onDelete={onDeleteMock}
        onEdit={onEditMock}
        selectedDate={selectedDate}/>
        );
    
        const editButtons = screen.getAllByText('Edit');
        fireEvent.click(editButtons[0]);
    
        const taskInput = screen.getByRole('textbox');
        fireEvent.change(taskInput, { target: { value: 'Updated Task' } });
    
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
    
        expect(onEditMock).toHaveBeenCalledTimes(1);
        expect(onEditMock).toHaveBeenCalledWith(tasks[0].id, 'Updated Task');
      });
    });







    // tests for Calendar.js //
    import React from 'react';
    import { render, screen, fireEvent } from '@testing-library/react';
    import Calendar from '../components/Calendar';
    
    describe('Calendar', () => {
      test('renders with selected date', () => {
        const selectedDate = new Date('2023-05-28');
        const onChangeMock = jest.fn();
    
        render(<Calendar selected={selectedDate} onChange={onChangeMock} />);
    
        const calendarInput = screen.getByRole('textbox', { name: 'datepicker-input' });
        expect(calendarInput).toBeInTheDocument();
        expect(calendarInput.value).toBe('05/28/2023');
      });
    
      test('triggers onChange when date is selected', () => {
        const selectedDate = new Date('2023-05-28');
        const onChangeMock = jest.fn();
    
        render(<Calendar selected={selectedDate} onChange={onChangeMock} />);
    
        const calendarInput = screen.getByRole('textbox', { name: 'datepicker-input' });
    
        fireEvent.change(calendarInput, { target: { value: '05/30/2023' } });
        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(onChangeMock).toHaveBeenCalledWith(new Date('2023-05-30'));
      });
    });










    // tests for CalendarParent.js //
    import React from 'react';
    import { render, screen, fireEvent } from '@testing-library/react';
    import ParentComponent from '../components/ParentComponent';
    
    describe('ParentComponent', () => {
      test('renders without errors', () => {
        render(<ParentComponent />);
        expect(screen.getByRole('textbox', { name: 'datepicker-input' })).toBeInTheDocument();
      });
    
      test('adds a plan when a date is selected', () => {
        render(<ParentComponent />);
        const calendarInput = screen.getByRole('textbox', { name: 'datepicker-input' });
    
        fireEvent.change(calendarInput, { target: { value: '05/30/2023' } });
        fireEvent.keyDown(calendarInput, { key: 'Enter', code: 'Enter' });
    
        expect(screen.getByText('05/30/2023')).toBeInTheDocument();
      });
    
      test('removes a plan when the remove button is clicked', () => {
        render(<ParentComponent />);
        const calendarInput = screen.getByRole('textbox', { name: 'datepicker-input' });
    
        fireEvent.change(calendarInput, { target: { value: '05/30/2023' } });
        fireEvent.keyDown(calendarInput, { key: 'Enter', code: 'Enter' });
    
        const removeButton = screen.getByRole('button', { name: 'Remove' });
        fireEvent.click(removeButton);
    
        expect(screen.queryByText('05/30/2023')).not.toBeInTheDocument();
      });
    });










    // tests for Input.js //
    import React from 'react';
    import { render, screen, fireEvent } from '@testing-library/react';
    import Input from '../components/Input';
    
    describe('Input', () => {
      test('renders without errors', () => {
        render(<Input onSave={() => {}} />);
        expect(screen.getByPlaceholderText('Enter task')).toBeInTheDocument();
      });
    
      test('calls onSave function with task name when Add button is clicked', () => {
        const onSaveMock = jest.fn();
        render(<Input onSave={onSaveMock} />);
        const input = screen.getByPlaceholderText('Enter task');
        const addButton = screen.getByRole('button', { name: 'Add' });
    
        fireEvent.change(input, { target: { value: 'Task 1' } });
        fireEvent.click(addButton);
    
        expect(onSaveMock).toHaveBeenCalledTimes(1);
        expect(onSaveMock).toHaveBeenCalledWith('Task 1');
      });
    
      test('clears the input field after saving a task', () => {
        const onSaveMock = jest.fn();
        render(<Input onSave={onSaveMock} />);
        const input = screen.getByPlaceholderText('Enter task');
        const addButton = screen.getByRole('button', { name: 'Add' });
    
        fireEvent.change(input, { target: { value: 'Task 1' } });
        fireEvent.click(addButton);
    
        expect(input.value).toBe('');
      });
    
      test('does not call onSave function if task name is empty', () => {
        const onSaveMock = jest.fn();
        render(<Input onSave={onSaveMock} />);
        const addButton = screen.getByRole('button', { name: 'Add' });
    
        fireEvent.click(addButton);
    
        expect(onSaveMock).not.toHaveBeenCalled();
      });
    
      test('calls onSave function with trimmed task name', () => {
        const onSaveMock = jest.fn();
        render(<Input onSave={onSaveMock} />);
        const input = screen.getByPlaceholderText('Enter task');
        const addButton = screen.getByRole('button', { name: 'Add' });
    
        fireEvent.change(input, { target: { value: '   Task 1   ' } });
        fireEvent.click(addButton);
    
        expect(onSaveMock).toHaveBeenCalledTimes(1);
        expect(onSaveMock).toHaveBeenCalledWith('Task 1');
      });
    
      test('calls onSave function when Enter key is pressed', () => {
        const onSaveMock = jest.fn();
        render(<Input onSave={onSaveMock} />);
        const input = screen.getByPlaceholderText('Enter task');
    
        fireEvent.change(input, { target: { value: 'Task 1' } });
        fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' });
    
        expect(onSaveMock).toHaveBeenCalledTimes(1);
        expect(onSaveMock).toHaveBeenCalledWith('Task 1');
      });
    }); 