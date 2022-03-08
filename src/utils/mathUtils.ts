export function roundUp(num: number, round: number = 2): number{
    let places = Math.pow(10,round);
    let roundedValue = Math.round(num * places + Number.EPSILON) / places;

    return roundedValue;
}