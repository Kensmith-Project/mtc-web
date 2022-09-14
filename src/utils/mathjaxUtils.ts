export function mathjaxToText(input: string): string {
    type GeneralHash = { [index: string]: any }

    const converterHash: GeneralHash = {
        "\\\\times": "x",
        "\\\\": " " ,
    }

    let processedString: string = input + "";

    // Replace all the mathjax symbols with the corresponding text value
    for (const key in converterHash) {
        if (Object.prototype.hasOwnProperty.call(converterHash, key)) {
            const value = converterHash[key];
            let regex = new RegExp(key, 'g')
            processedString = processedString.replace(regex, value);
        }
    }

    return processedString;
}

export function textToMathjax(input: string): string {
    type GeneralHash = { [index: string]: any }

    const converterHash: GeneralHash = {
        "x": "\\times"
    }

    let processedString: string = input + "";

    // Replace all the mathjax symbols with the corresponding text value
    for (const key in converterHash) {
        if (Object.prototype.hasOwnProperty.call(converterHash, key)) {
            const value = converterHash[key];
            let regex = new RegExp(key, 'g')
            processedString = processedString.replace(regex, value);
        }
    }

    return processedString;
}