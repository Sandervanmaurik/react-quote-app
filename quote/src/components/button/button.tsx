import React, { useEffect, useState } from "react";


interface Props {
    id: string;
    border: string;
    color: string;
    children?: React.ReactNode;
    height: string;
    onClick: () => void;
    radius: string;
    width: string;
    text: string;
    icon: React.ReactNode;
    isActive: boolean;
}

const Button: React.FC<Props> = ({
    id,
    border,
    color,
    children,
    height,
    onClick,
    radius,
    width,
    text,
    icon,
    isActive
}) => {
    const [active, setActive] = useState(isActive);


    useEffect(() => {
        setActive(isActive);
    }, [isActive]);

    return (
        <button
            id={id}
            onClick={onClick}
            style={{
                backgroundColor: color,
                cursor: "pointer",
                border,
                borderRadius: radius,
                height,
                width,
            }}
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
export default Button;