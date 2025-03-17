export const formatCPF = (value: string): string => {
    if (!value) return '';
  
    const cleanedValue = value.replace(/\D/g, '');
  
    return cleanedValue
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

function TestaCPF(strCPF: string) {
    let Soma;
    let Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (let i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

export const validateCPF = (value: string): boolean => {
    const cleanedValue = value.replace(/\D/g, '');
    const haseleven = cleanedValue.length === 11;
    if (!haseleven) return false;
    return TestaCPF(cleanedValue)
};


export const formatPhone = (value: string): string => {
    if (!value) return '';
  
    const cleanedValue = value.replace(/\D/g, '');
  
    if (cleanedValue.length <= 10) {
      return cleanedValue
        .slice(0, 10)
        .replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return cleanedValue
        .slice(0, 11)
        .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
};

export const formatOnlyNumber = (value: string): string => {
    if (!value) return '';
  
    const cleanedValue = value.replace(/\D/g, '');
    return cleanedValue.slice(0, 5)

};

export const formatOnlyNumberNoLimit = (value: string): string => {
    if (!value) return '';
  
    const cleanedValue = value.replace(/\D/g, '');
    return cleanedValue;

};


export function formatCNPJ(cnpj: string): string {
    const cleanedCNPJ = cnpj.replace(/\D/g, '');
  
    if (cleanedCNPJ.length <= 2) {
      return cleanedCNPJ; 
    } else if (cleanedCNPJ.length <= 5) {
      return `${cleanedCNPJ.slice(0, 2)}.${cleanedCNPJ.slice(2)}`;
    } else if (cleanedCNPJ.length <= 8) {
      return `${cleanedCNPJ.slice(0, 2)}.${cleanedCNPJ.slice(2, 5)}.${cleanedCNPJ.slice(5)}`;
    } else if (cleanedCNPJ.length <= 12) {
      return `${cleanedCNPJ.slice(0, 2)}.${cleanedCNPJ.slice(2, 5)}.${cleanedCNPJ.slice(5, 8)}/${cleanedCNPJ.slice(8)}`; 
    } else {
      return `${cleanedCNPJ.slice(0, 2)}.${cleanedCNPJ.slice(2, 5)}.${cleanedCNPJ.slice(5, 8)}/${cleanedCNPJ.slice(8, 12)}-${cleanedCNPJ.slice(12, 14)}`;
    }
  }

export function validateCNPJ(cnpj: string): boolean {
    const cleanedCNPJ = cnpj.replace(/\D/g, '');
    return cleanedCNPJ.length === 14 && testCNPJ(cleanedCNPJ);
}


function testCNPJ(value: string) {
    if (!value) return false
    const regexCNPJ = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/
    const digitsOnly = /^\d{14}$/.test(value)
    const validFormat = regexCNPJ.test(value)
    const isValid = digitsOnly || validFormat
  
    if (!isValid) return false
  
    const numbers = matchNumbers(value)
  
    if (numbers.length !== 14) return false
  
    const items = [...new Set(numbers)]
    if (items.length === 1) return false
  
    const digits = numbers.slice(12)
  
    const digit0 = validCalc(12, numbers)
    if (digit0 !== digits[0]) return false
  
    const digit1 = validCalc(13, numbers)
    return digit1 === digits[1]
  }


function validCalc(x: number, numbers: number[]) {
    const slice = numbers.slice(0, x)
    let factor = x - 7
    let sum = 0
  
    for (let i = x; i >= 1; i--) {
      const n = slice[x - i]
      sum += n * factor--
      if (factor < 2) factor = 9
    }
  
    const result = 11 - (sum % 11)
  
    return result > 9 ? 0 : result
  }
  

  function matchNumbers(value: string | number | number[] = '') {
    const match = value.toString().match(/\d/g)
    return Array.isArray(match) ? match.map(Number) : []
  }
