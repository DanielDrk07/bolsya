import { formatNumber, parseFormattedNumber } from './numberUtils';

describe('Number Utils', () => {
    describe('formatNumber', () => {
        it('should format a whole number correctly', () => {
            expect(formatNumber(1234)).toBe('1.234,00');
        });

        it('should format a number with decimals correctly', () => {
            expect(formatNumber(1234.56)).toBe('1.234,56');
        });

        it('should format a number with one decimal correctly', () => {
            expect(formatNumber(1234.5)).toBe('1.234,50');
        });

        it('should handle zero correctly', () => {
            expect(formatNumber(0)).toBe('0,00');
        });

        it('should handle null or undefined correctly', () => {
            expect(formatNumber(null)).toBe('0,00');
            expect(formatNumber(undefined)).toBe('0,00');
        });
    });

    describe('parseFormattedNumber', () => {
        it('should parse a number with a comma decimal separator', () => {
            expect(parseFormattedNumber('1.234,56')).toBe(1234.56);
        });

        it('should parse a whole number', () => {
            expect(parseFormattedNumber('1.234')).toBe(1234);
        });

        it('should handle an empty string', () => {
            expect(parseFormattedNumber('')).toBe(0);
        });

        it('should handle a number with only decimals', () => {
            expect(parseFormattedNumber('0,56')).toBe(0.56);
        });
    });
});
