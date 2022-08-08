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
            iconColor:"#c9ccd6",
            icon:"fa-face-meh"
        },
        {
            id: "2",
            name:"I don't get it",
            color: "#EFEBFF",
            iconColor:"#9D85FF",
            icon:"fa-question"
        }, {
            id: "3",
            name:"Funny",
            color: "#D6EBE5",
            iconColor:"#69B59E",
            icon:"fa-face-grin-beam"
        }, {
            id: "4",
            name:"Inspiring",
            color: "#FEF3D7",
            iconColor:"#FAC94C",
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
            iconColor:"#c9ccd6",
            icon:"fa-face-meh"
        },
        {
            id: "2",
            name:"I don't get it",
            color: "#EFEBFF",
            iconColor:"#9D85FF",
            voters: [
                "example"
            ],
            icon:"fa-question"
        }, {
            id: "3",
            name:"Funny",
            color: "#D6EBE5",
            iconColor:"#69B59E",
            icon:"fa-face-grin-beam"
        }, {
            id: "4",
            name:"Inspiring",
            color: "#FEF3D7",
            iconColor:"#FAC94C",
            icon:"fa-lightbulb"
        }
    ],
    visitorId: "example",
    onClick:() => {}
}
