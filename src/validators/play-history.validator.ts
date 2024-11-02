import validator from 'validator';

export class PlayHistoryValidator {

    static validate(body: any, toValidate: string[]) {
        const errors: string[] = [];
        if (body.userId) {
            if (toValidate.includes('userId') && validator.isEmpty(body.userId)) {
                errors.push('userId cannot be empty');
            }
        }
        else {
            errors.push('userId is null or undefined');
        }
        return errors;
    }
}
