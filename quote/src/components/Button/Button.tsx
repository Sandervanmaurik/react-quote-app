import React from "react";
import './Button.scss';
import Icon from "../Icon/Icon";

type props = {
    id: string;
    border: string;
    color: string;
    height: string;
    onClick: () => void;
    radius: string;
    width: string;
    text: string;
    iconName: string;
    iconColor: string;
    isActive: boolean;
}

const Button = ({ id, border, color, height, onClick, radius, width, text, iconName, iconColor, isActive }: props) => {
    const btnStyles: React.CSSProperties = {
        border: border,
        backgroundColor: color,
        cursor: "pointer",
        borderRadius: radius,
        minHeight: height,
        minWidth: width,
    }
    
    let gap = (iconName) ? "1em" : "";

    const wrapperStyles: React.CSSProperties = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap:gap
    }



    return (
        <button id={id} onClick={onClick} style={btnStyles} className={isActive ? "btn active" : "btn"} >
            <div style={wrapperStyles}> {<Icon name={iconName} color={iconColor}></Icon>}
                <span> {text} </span>
            </div>
        </button>
    );
};
export default Button;