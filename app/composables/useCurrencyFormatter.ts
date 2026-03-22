export const useCurrencyFormatter = () => {
    const formatCurrency = (value: number, locale = 'en-US', currency = 'USD') => {
        if (typeof value !== "number") {
            return value;
        }
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
        }).format(value);
    };

    return { formatCurrency };
};
