import React from 'react';

interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  rows?: number;
  as?: 'input' | 'textarea';
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  rows = 3,
  as = 'input'
}) => {
  const inputClasses = `w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-[#57A777] transition-colors ${className}`;
  const style = { '--tw-ring-color': '#57A777' } as React.CSSProperties;

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-2">
        {label}
      </label>
      {as === 'textarea' ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange as any}
          rows={rows}
          className={`${inputClasses} resize-none`}
          style={style}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={inputClasses}
          style={style}
        />
      )}
    </div>
  );
};