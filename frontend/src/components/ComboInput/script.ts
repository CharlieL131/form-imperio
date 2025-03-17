export interface ComboInputProps {
    title: string;
    hint: string;
    options: { value: string; label: string }[]; 
    value: string;
    onChange: (value: string) => void;
    id: string;
    disabled?: boolean;
    isInvalid?: boolean;
    invalid_message?: string;
}