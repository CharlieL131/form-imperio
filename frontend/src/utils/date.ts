export function validateDOB(strDOB: string): boolean {
    const now = Date.now();
    const converted_date = Date.parse(strDOB);
    if (converted_date >= now) return false;
    const timeDiff =  new Date (now - converted_date);
    const yearDiff = Math.abs(timeDiff.getUTCFullYear() - 1970);
    if (yearDiff > 100) return false;
    if (yearDiff < 18) return false;
    return true;
}

export function validateDateOfPurchase(strDate: string): boolean {

    const dateFrom = Date.parse("2025-05-01");
    const dateTo = Date.parse("2025-05-31");
    const dateCheck = Date.parse(strDate);

    if (dateFrom > dateCheck) return false;
    if(dateTo < dateCheck) return false;

    return true;
}