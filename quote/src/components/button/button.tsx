import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import './Button.scss';

type props = {
    id: string;
    border: string;
    color: string;
    height: string;
    onClick: () => void;
    radius: string;
    width: string;
    text: string;
    icon: React.ReactNode;
    isActive: boolean;
}

function Button({
    id,
    border,
    color,
    height,
    onClick,
    radius,
    width,
    text,
    icon,
    isActive
}: props) {
    const [active, setActive] = useState(isActive);

    const styles = {
        border: border,
        backgroundColor: color,
        cursor: "pointer",
        borderRadius: radius,
        height: height,
        width: width,
    }


    useEffect(() => {
        setActive(isActive);
    }, [isActive]);

    return (
        <button
            id={id}
            onClick={onClick}
            style={styles}
            className={active ? "btn active" : "btn"}
        >
            <div style={
                {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "1rem"
                }
            }>
                {icon}
                <span>
                    {text}
                </span>
            </div>

        </button>
    );
}

Button.propTypes = {
    text: PropTypes.string,
    border: PropTypes.string,
    color: PropTypes.string,
    height: PropTypes.string,
    onClick: PropTypes.func,
    radius: PropTypes.string,
    width: PropTypes.string,
    isActive: PropTypes.bool
}

export default Button;