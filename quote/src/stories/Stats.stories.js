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
            iconColor: "#c9ccd6",
        },
        {
            id: "2",
            voteCount: 0,
            iconColor: "#9D85FF",
        }, {
            id: "3",
            voteCount: 0,
            iconColor: "#69B59E",
        }, {
            id: "4",
            voteCount: 0,
            iconColor: "#FAC94C",
        }
    ]
}

export const FilledStats = Template.bind({});
FilledStats.args = {
    rating: [
        {
            id: "1",
            voteCount: 12,
            iconColor: "#c9ccd6",
        },
        {
            id: "2",
            voteCount: 2,
            iconColor: "#9D85FF",
        }, {
            id: "3",
            voteCount: 98,
            iconColor: "#69B59E",
        }, {
            id: "4",
            voteCount: 65,
            iconColor: "#FAC94C",
        }
    ]
}
