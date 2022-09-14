export default function getInitials(fullname: string): string{
    let nameArr = fullname.split(" ");
    let firstLetters = [];
 
    for (let i = 0; i < nameArr.length; i++){
        firstLetters.push(nameArr[i].charAt(0));
    }
    
    let firstInitial = firstLetters[0]
    let lastInitial = firstLetters.slice(-1)[0]
    return firstInitial + lastInitial
}
 