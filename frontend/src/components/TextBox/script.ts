
export interface TextInputProps {
    title: string;
    hint?: string;
    invalid_message?: string;
    value?: string;
    id?: string;
    rows?: number;
    onChange?: (value: string) => void;
    isInvalid?: boolean;
}