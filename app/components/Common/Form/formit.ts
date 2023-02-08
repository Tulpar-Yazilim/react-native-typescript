import {ObjectSchema} from 'yup';
import {SchemaMeta, SchemaInputType} from './types/dataForm';

export const formitDefaults = (schema: ObjectSchema<any>, defaultValues?: object | any): Record<string, any> => {
    const defaultFromShape = schema.getDefaultFromShape();

    if (!defaultValues) {
        return defaultFromShape;
    }

    const defaults = {} as any;
    const keys = defaultValues ? Object.keys(defaultValues) : (Object.keys(defaultFromShape) as any);

    keys.map((key: any) => {
        switch (defaultValues[key]) {
            case null:
                defaults[key] = defaultFromShape[key];
                break;
            default:
                defaults[key] = defaultValues[key];
                break;
        }
    });

    return defaults;
};

const _formitMeta = (description: Record<string, any>, name: string): SchemaMeta => {
    const meta = description?.meta;
    const col = description?.meta?.col || 12;
    const label = description?.label || '';
    const fieldType = description?.type || SchemaInputType.text;
    return {name, col, fieldType, label, ...meta};
};

export const formitMeta = (schema: ObjectSchema<any>, name: string): SchemaMeta => {
    const description = schema.describe().fields[name] as Record<string, any>;
    const meta = description?.meta;
    const col = description?.meta?.col || 12;
    const label = description?.label || '';
    const fieldType = description?.type || SchemaInputType.text;
    const fields = description?.fields || description?.innerType?.fields || null;

    if (fields) {
        const fieldsKeys = Object.keys(fields);
        return {
            col,
            name,
            field: '',
            fieldType,
            label,
            ...meta,
            fields: fieldsKeys.map(key => _formitMeta(fields[key], key)),
        };
    }

    return _formitMeta(description, name);
};

interface FormitFormData {
    data?: Record<string, any>;
    additions?: Record<string, any>;
}

export const formitFormData = async ({data = {}, additions = {}}: FormitFormData) => {
    const formData: any = {};

    const incomingData = {...data, ...additions};
    const incomingKeys = Object.keys(incomingData);

    for (const key of incomingKeys) {
        formData[key] = incomingData[key];
    }

    return formData;
};
