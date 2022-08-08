import Stats from '../components/Stats/Stats';
export default {
    title: "Stats",
    component: Stats
}

const Template = args => <Stats {...args}></Stats>

export const EmptyStats = Template.bind({});
EmptyStats.args = {
    rating: [
        {
            id: "1",
            voteCount: 0,
            iconColor: "grey",
        },
        {
            id: "2",
            voteCount: 0,
            iconColor: "purple",
        }, {
            id: "3",
            voteCount: 0,
            iconColor: "green",
        }, {
            id: "4",
            voteCount: 0,
            iconColor: "yellow",
        }
    ]
}

export const FilledStats = Template.bind({});
FilledStats.args = {
    rating: [
        {
            id: "1",
            voteCount: 12,
            iconColor: "grey",
        },
        {
            id: "2",
            voteCount: 2,
            iconColor: "purple",
        }, {
            id: "3",
            voteCount: 98,
            iconColor: "green",
        }, {
            id: "4",
            voteCount: 65,
            iconColor: "yellow",
        }
    ]
}
