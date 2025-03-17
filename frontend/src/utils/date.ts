export function validateDOB(strDOB: string): boolean {
    const now = Date.now();
    const converted_date = Date.parse(strDOB);
    if (converted_date >= now) return false;
    const timeDiff =  new Date (now - converted_date);
    const yearDiff = Math.abs(timeDiff.getUTCFullYear() - 1970);
    if (yearDiff > 100) return false;
    return true;
}