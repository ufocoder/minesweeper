import React, { FC, useCallback, useState } from 'react';

import presets from 'src/lib/presets.json';
import './assets/styles.sass';

interface Values {
    rows: number;
    cols: number;
    mines: number;
}

interface FieldProps {
    label: string;
    value: number;
    onChange: (value: string) => void;
}

const MAX_ROWS = 100;
const MAX_COLS = 100;

const MAX_LENGTH = 3;

const Field: FC<FieldProps> = ({ label, value, onChange }) => {
    return (
        <label className='settings-form__field'>
            <div className='settings-form__field-label'>{label}</div>
            <input
                type='text'
                value={value}
                maxLength={MAX_LENGTH}
                onChange={(e) => onChange(e.target.value)}
                className='settings-form__field-input'
            />
        </label>
    );
};

interface SettingsProps {
    values: Values;
    onCancel: () => void;
    onSubmit: (values: Values) => void;
}

const FormSettings = ({ values, onCancel, onSubmit }: SettingsProps) => {
    const [formValues, setFormValues] = useState<Values>({ ...values });
    const maxMines = formValues.rows * formValues.cols - 1;
    const canBeSubmitted = maxMines > 0;

    const handleFormSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            onSubmit(formValues);
        },
        [onSubmit, formValues],
    );

    const handleCancelClick = useCallback(
        (e) => {
            e.preventDefault();
            onCancel();
        },
        [onCancel],
    );

    const createFieldChangeHandler = (fieldName: string, limit: number) => (fieldValue: string) => {
        const newFormValues = {
            ...formValues,
            [fieldName]: Math.max(Math.min(parseInt(fieldValue, 10) || 0, limit), 0),
        };

        setFormValues(newFormValues);
    };

    return (
        <>
            <fieldset className='settings__fieldset'>
                <legend className='settings__legend'>Choose preset</legend>

                <button onClick={() => onSubmit(presets.easy)} className='settings-form__button'>
                    Easy
                </button>
                <button onClick={() => onSubmit(presets.medium)} className='settings-form__button'>
                    Medium
                </button>
                <button onClick={() => onSubmit(presets.hard)} className='settings-form__button'>
                    Hard
                </button>
            </fieldset>

            <fieldset className='settings__fieldset'>
                <legend className='settings__legend'>Create own preset</legend>

                <form className='settings-form' onSubmit={handleFormSubmit}>
                    <Field
                        label={`Rows, max ${MAX_ROWS}`}
                        value={formValues.rows}
                        onChange={createFieldChangeHandler('rows', MAX_ROWS)}
                    />
                    <Field
                        label={`Cols, max ${MAX_COLS}`}
                        value={formValues.cols}
                        onChange={createFieldChangeHandler('cols', MAX_COLS)}
                    />
                    <Field
                        label={`Mines, max ${maxMines}`}
                        value={formValues.mines}
                        onChange={createFieldChangeHandler('mines', maxMines)}
                    />

                    <div className='settings-form__buttons'>
                        <button className='settings-form__button' disabled={!canBeSubmitted} type='submit'>
                            OK
                        </button>
                        <button className='settings-form__button' onClick={handleCancelClick}>
                            Canel
                        </button>
                    </div>
                </form>
            </fieldset>
        </>
    );
};

export default FormSettings;
