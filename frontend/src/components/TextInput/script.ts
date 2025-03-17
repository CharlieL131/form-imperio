
export interface TextInputProps {
    type?: string;
    title: string;
    hint?: string;
    invalid_message?: string;
    value?: string;
    id?: string;
    pattern?: string;
    onChange?: (value: string) => void;
    isInvalid?: boolean;
}