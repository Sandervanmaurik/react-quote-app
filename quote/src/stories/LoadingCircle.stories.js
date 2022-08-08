import LoadingCircle from '../components/LoadingCircle/LoadingCircle';

export default {
    title: "LoadingCircle",
    component: LoadingCircle
}

const Template = args => <LoadingCircle {...args}></LoadingCircle>

export const Small = Template.bind({});
Small.args = {
    color: "#0d98ba",
    height: "50px",
    width:"50px",
    loadingText: "Loading small..."
}

export const Large = Template.bind({});
Large.args = {
    color: "#0d98ba",
    height: "100px",
    width:"100px",
    loadingText: "Loading large..."
}