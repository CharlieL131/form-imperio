
export interface DateInputProps {
    title: string;
    hint?: string;
    invalid_message?: string;
    value?: string;
    id?: string;
    pattern?: string;
    onChange?: (value: string) => void;
    validate?: (value: string) => boolean;
    isInvalid?: boolean;
}