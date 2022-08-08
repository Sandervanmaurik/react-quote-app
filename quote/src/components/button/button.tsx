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
    const styles = {
        border: border,
        backgroundColor: color,
        cursor: "pointer",
        borderRadius: radius,
        minHeight: height,
        minWidth: width,
    }

    function icon(){
        return (iconName) ? <Icon name={iconName} color={iconColor}></Icon> : <></>;
    }

    return (
        <button id={id} onClick={onClick} style={styles} className={isActive ? "btn active" : "btn"} >
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "1rem"
            }}> {icon()}
                <span> {text} </span>
            </div>
        </button>
    );
};

// Button.propTypes = {
//     text: PropTypes.string,
//     border: PropTypes.string,
//     color: PropTypes.string,
//     height: PropTypes.string,
//     onClick: PropTypes.func,
//     radius: PropTypes.string,
//     width: PropTypes.string,
//     isActive: PropTypes.bool
// }

export default Button;