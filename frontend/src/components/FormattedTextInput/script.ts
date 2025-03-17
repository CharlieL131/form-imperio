
export interface FormattedTextInputProps {
    title: string;
    hint: string;
    invalid_message?: string;
    value: string;
    onChange?: (value: string) => void;
    id: string;
    format: (value: string) => string;
    validate?: (value: string) => boolean;
    isInvalid?: boolean;
}