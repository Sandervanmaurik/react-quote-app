import Button from '../components/Button/Button';

export default {
    title: "Button",
    component: Button
}

const Template = args => <Button {...args}></Button>

export const Inactive = Template.bind({});
Inactive.args = {
    text:"Press me",
    color:'lightgreen',
    width:"100px",
    height:'50px',
    border:'none',
    isActive:false,
    radius:"10px"
}

export const Active = Template.bind({});
Active.args = {
    text:"Press me",
    color:'lightgreen',
    width:"100px",
    height:'50px',
    border:'none',
    isActive:true,
    radius:"10px"
}
