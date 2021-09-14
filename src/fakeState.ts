import { ISnapShotList } from './Types/Types';

export const fakeState: ISnapShotList = [
    [
        {
            name: 'count',
            value: 5
        },
        {
            name: 'isLoggedIn',
            value: false.toString()
        },
        {
            name: 'name',
            value: 'Cameron'
        },
    ],
    [
        {
            name: 'count',
            value: 6
        },
        {
            name: 'isLoggedIn',
            value: true.toString()
        },
        {
            name: 'name',
            value: 'Cameron'
        },
    ],
    [
        {
            name: 'count',
            value: 7
        },
        {
            name: 'isLoggedIn',
            value: true.toString()
        },
        {
            name: 'name',
            value: 'Gordon'
        },
    ]
];