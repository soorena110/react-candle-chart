export const shortenNumber = (number: number | string, toFix = 3, minimumValue = 1000) => {
    if (typeof number == 'string')
        number = Number(number);

    if (number < minimumValue)
        return number;

    const numberPostfixes = ['', 'K', 'M', 'B', 'KB', 'MB', 'BB'];
    let inputNumberPostFix = '';
    for (let i = 0; i < numberPostfixes.length; i++)
        if (number < 1000) {
            inputNumberPostFix = numberPostfixes[i];
            break;
        }
        else
            number /= 1000;

    return `${number.toFixed(toFix)} ${inputNumberPostFix}`;
};