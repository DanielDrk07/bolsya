export const formatNumber = (value) => {
    if (value === null || value === undefined || isNaN(value)) return '0,00';
    const numValue = typeof value === 'string' ? parseFloat(value) : value;

    const fixedValue = numValue.toFixed(2);
    const parts = fixedValue.split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const decimalPart = parts[1];
    return `${integerPart},${decimalPart}`;
};

export const parseFormattedNumber = (formattedValue) => {
    if (!formattedValue) return 0;
    const cleanValue = String(formattedValue).replace(/\./g, '').replace(',', '.');
    const parsed = parseFloat(cleanValue);
    return isNaN(parsed) ? 0 : parsed;
};

export const formatCurrency = (amount) => {
    return '$' + formatNumber(amount);
};
