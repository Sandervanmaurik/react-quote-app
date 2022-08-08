import QuoteBanner from '../components/QuoteBanner/QuoteBanner';

export default {
    title: "QuoteBanner",
    component: QuoteBanner
}

const Template = args => <QuoteBanner {...args}></QuoteBanner>

export const Banner = Template.bind({});
Banner.args = {
    quote: "This is a super funny quote"
}