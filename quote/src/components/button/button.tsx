import React from "react";


interface Props {
    border: string;
    color: string;
    children?: React.ReactNode;
    height: string;
    onClick: () => void;
    radius: string;
    width: string;
    boxShadow: string;
    text: string;
    icon: React.ReactNode;
}

const Button: React.FC<Props> = ({
    border,
    color,
    children,
    height,
    onClick,
    radius,
    width,
    boxShadow,
    text,
    icon
}) => {
    return (
        <button
            onClick={onClick}
            style={{
                backgroundColor: color,
                border,
                borderRadius: radius,
                height,
                width,
                boxShadow: boxShadow
            }}
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
export default Button;