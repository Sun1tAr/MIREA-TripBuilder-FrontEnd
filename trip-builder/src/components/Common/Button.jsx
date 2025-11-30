// src/components/Common/Button.jsx
import React from 'react';
import './Button.css';

const variants = {
    primary: {
        bg: '#3182CE',
        hover: '#2C5AA0',
        color: 'white',
    },
    secondary: {
        bg: '#38B2AC',
        hover: '#3182CE',
        color: 'white',
    },
    outline: {
        bg: 'transparent',
        hover: 'rgba(49, 130, 206, 0.06)',
        color: '#3182CE',
        border: '1px solid #3182CE',
    },
    ghost: {
        bg: 'transparent',
        hover: 'rgba(160, 174, 192, 0.2)',
        color: '#2D3748',
    },
    danger: {
        bg: '#E53E3E',
        hover: '#C53030',
        color: 'white',
    },
};

const sizes = {
    sm: { padding: '6px 10px', fontSize: '12px' },
    md: { padding: '8px 14px', fontSize: '13px' },
    lg: { padding: '10px 18px', fontSize: '15px' },
};

const Button = ({
                    children,
                    variant = 'primary',
                    size = 'md',
                    fullWidth = false,
                    className = '',
                    ...props
                }) => {
    const v = variants[variant] || variants.primary;
    const s = sizes[size] || sizes.md;

    const buttonClassName = `btn btn--${variant} btn--${size} ${
        fullWidth ? 'btn--full-width' : ''
    } ${props.disabled ? 'btn--disabled' : ''} ${className}`;

    return (
        <button
            {...props}
            className={buttonClassName}
            style={{
                padding: s.padding,
                fontSize: s.fontSize,
                backgroundColor: v.bg,
                color: v.color,
                border: v.border || 'none',
            }}
        >
            {children}
        </button>
    );
};

export default Button;
