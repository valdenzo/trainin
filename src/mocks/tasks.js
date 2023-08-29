export const tasks = {
    swimlines: [
        {
            id: 1,
            title: 'To Do',
            tasks: [
                { id: 1, title: 'Task 1', swimline_id: 1, order: 1, assignee_id: 1 },
                { id: 2, title: 'Task 2', swimline_id: 1, order: 2, assignee_id: 2 },
                { id: 3, title: 'Task 3', swimline_id: 1, order: 3, assignee_id: 2 },
            ]
        },
        {
            id: 2,
            title: 'Doing',
            tasks: [
                { id: 4, title: 'Task 4', swimline_id: 2, order: 1, assignee_id: 2 },
                { id: 5, title: 'Task 5', swimline_id: 2, order: 2, assignee_id: 1 },
                { id: 6, title: 'Task 6', swimline_id: 2, order: 3, assignee_id: 1 },
            ]
        },
        {
            id: 3,
            title: 'Done',
            tasks: [
                { id: 7, title: 'Task 7', swimline_id: 3, order: 1, assignee_id: 1 },
                { id: 8, title: 'Task 8', swimline_id: 3, order: 2, assignee_id: 3 },
                { id: 9, title: 'Task 9', swimline_id: 3, order: 3, assignee_id: 3 },
            ]
        }
    ],
    assignees: [
        {id: 1, name: 'John Doe'},
        {id: 2, name: 'Coca Cola'},
        {id: 3, name: 'John Smith'},
    ]
};