export const breakpoints: Breakpoints = {
    sm, md, lg, xs, xl
}

type WidthDirection = 'up' | 'down';
export type Breakpoints = {
    sm: (direction?: WidthDirection) => string;
    md: (direction?: WidthDirection) => string;
    lg: (direction?: WidthDirection) => string;
    xl: (direction?: WidthDirection) => string;
    xs: (direction?: WidthDirection, customWidth?: CustomWidth) => string;
}

type CustomWidth = {
    maxWidth?: string; 
    minWidth?: string;
}

function sm(direction: WidthDirection = 'down'): string {
    
    if (direction === 'down') {
        return '@media screen and (max-width: 759px)'
    }

    return '@media screen and (min-width: 760px)'
}

function md(direction: WidthDirection = 'down'): string {
    
    if (direction === 'down') {
        return '@media screen and (max-width: 959px)'
    }

    return '@media screen and (min-width: 960px)'
}

function lg(direction: WidthDirection = 'down'): string {
    
    if (direction === 'down') {
        return '@media screen and (max-width: 1023px)'
    }

    return '@media screen and (min-width: 1024px)'
}

function xl(direction: WidthDirection = 'down'): string {
    
    if (direction === 'down') {
        return '@media screen and (max-width: 1199px)'
    }

    return '@media screen and (min-width: 1200px)'
}

function xs(direction: WidthDirection = 'down'): string {
    
    if (direction === 'down') {
        return `@media screen and (max-width: 599px)`;
    }

    return `@media screen and (min-width: 600px)`;
}