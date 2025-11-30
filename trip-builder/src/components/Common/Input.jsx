// src/components/Common/Input.jsx
import React from 'react';
import './Input.css';

const Input = React.forwardRef(
    (
        {
            label,
            hint,
            error,
            type = 'text',
            fullWidth = true,
            className = '',
            value,
            onChange,
            disabled = false,
            placeholder = '',
            ...props
        },
        ref
    ) => {
        const id = props.id || `input-${label?.toString().replace(/\s+/g, '-').toLowerCase()}`;

        return (
            <div className={`input-wrapper ${fullWidth ? 'input-wrapper--full' : ''}`}>
                {label && (
                    <label htmlFor={id} className="input-label">
                        {label}
                    </label>
                )}

                <input
                    ref={ref}
                    id={id}
                    type={type}
                    value={value || ''}
                    onChange={onChange}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`input-field ${error ? 'input-field--error' : ''} ${className}`}
                    {...props}
                />

                {hint && !error && <p className="input-hint">{hint}</p>}
                {error && <p className="input-error">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
