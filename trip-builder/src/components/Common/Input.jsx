// src/components/Common/Input.jsx
import React from 'react';
import './Input.css';

const Input = ({
                   label,
                   hint,
                   error,
                   type = 'text',
                   fullWidth = true,
                   className = '',
                   ...props
               }) => {
    const id = props.id || `input-${label?.toString().replace(/\s+/g, '-').toLowerCase()}`;

    return (
        <div className={`input-wrapper ${fullWidth ? 'input-wrapper--full' : ''} ${className}`}>
            {label && (
                <label htmlFor={id} className="input-label">
                    {label}
                </label>
            )}

            <input
                id={id}
                type={type}
                {...props}
                className={`input-field ${error ? 'input-field--error' : ''}`}
            />

            {hint && !error && <div className="input-hint">{hint}</div>}

            {error && <div className="input-error">{error}</div>}
        </div>
    );
};

export default Input;
