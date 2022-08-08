import NavigationBar from '../components/NavigationBar/NavigationBar';

export default {
    title: "NavigationBar",
    component: NavigationBar
}

const Template = args => <NavigationBar {...args}></NavigationBar>

export const NotVoted = Template.bind({});
NotVoted.args = {
    onClick: () => { },
    quotes: [{
        id: '1',
        hasVoted: false
    },
    {
        id: '2',
        hasVoted: false
    }, {
        id: '3',
        hasVoted: false
    }, {
        id: '4',
        hasVoted: false
    }, {
        id: '5',
        hasVoted: false
    }, {
        id: '6',
        hasVoted: false
    }, {
        id: '7',
        hasVoted: false
    }, {
        id: '8',
        hasVoted: false
    }]
}

export const SomeVoted = Template.bind({});
SomeVoted.args = {
    onClick: () => { },
    quotes: [{
        id: '1',
        hasVoted: false
    },
    {
        id: '2',
        hasVoted: true
    }, {
        id: '3',
        hasVoted: false
    }, {
        id: '4',
        hasVoted: false
    }, {
        id: '5',
        hasVoted: true
    }, {
        id: '6',
        hasVoted: false
    }, {
        id: '7',
        hasVoted: false
    }, {
        id: '8',
        hasVoted: true
    }]
}
// export const NotVoted = Template.bind({});
// NotVoted.args = {
//     onClick: () => { },
//     quotes: [{
//         id: '1',
//         hasVoted: true
//     }]
// }