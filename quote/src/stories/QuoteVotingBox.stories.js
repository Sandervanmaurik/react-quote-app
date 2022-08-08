import QuoteVotingBox from '../components/QuoteVotingBox/QuoteVotingBox';

export default {
    title: "QuoteVotingBox",
    component: QuoteVotingBox
}

const Template = args => <QuoteVotingBox {...args}></QuoteVotingBox>

export const NotVoted = Template.bind({});
NotVoted.args = {
    rating: [
        {
            id: "1",
            name:"Boring",
            color: "#F1F2F6",
            icon:"fa-face-meh"
        },
        {
            id: "2",
            name:"I don't get it",
            color: "#EFEBFF",
            icon:"fa-question"
        }, {
            id: "3",
            name:"Funny",
            color: "#D6EBE5",
            icon:"fa-face-grin-beam"
        }, {
            id: "4",
            name:"Inspiring",
            color: "#FEF3D7",
            icon:"fa-lightbulb"
        }
    ],
    onClick:() => {}
}

export const Voted = Template.bind({});
Voted.args = {
    rating: [
        {
            id: "1",
            name:"Boring",
            color: "#F1F2F6",
            icon:"fa-face-meh"
        },
        {
            id: "2",
            name:"I don't get it",
            color: "#EFEBFF",
            voters: [
                "example"
            ],
            icon:"fa-question"
        }, {
            id: "3",
            name:"Funny",
            color: "#D6EBE5",
            icon:"fa-face-grin-beam"
        }, {
            id: "4",
            name:"Inspiring",
            color: "#FEF3D7",
            icon:"fa-lightbulb"
        }
    ],
    visitorId: "example",
    onClick:() => {}
}
