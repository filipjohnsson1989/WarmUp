export default class Program {
    private static Default_Longest_Binary_Gap: number = 0;
    public static Main(N: number): number {
        // Assumptions:
        // N is integer within the range [1..2,147,483,647].
        // Otherwise, N is supposed to be positive.
        //if (N < 0) return Default_Longest_Binary_Gap;
        // Not efficent
        return Program.LongestBinaryGapWithoutRegex(N);

        // More efficent
        return Program.LongestBinaryGapWithRegex(N);
    }
    private static LongestBinaryGapWithoutRegex(N: number): number {
        let binaryString: string = (N >>> 0).toString(2); // Convert given number to binary
        //Console.WriteLine(binaryString); // Just for Test
        let trimedStringByZero: string = binaryString.replace(/^0+|0+$/g, ''); // To remove binary with no gaps
        //Console.WriteLine(trimedStringByZero); // Just for Test
        // To split by 1 and remove empty strings in the result array
        let splitedStringArray: Array<string> = trimedStringByZero.split('1').filter(element => {
            return element !== '';
        });;
        //Console.WriteLine(trimedStringByZero[1]); // Just for Test
        // The string array could be null in case of no gaps
        let longestGap: number = Math.max(...splitedStringArray.map(stringElement => stringElement.length)) || 0;
        if (longestGap === -Infinity) longestGap = 0;
        //Console.WriteLine(longestGap);
        return longestGap;
    }
    // More efficent
    private static LongestBinaryGapWithRegex(N: number): number {
        let binaryString: string = (N >>> 0).toString(2); // Convert given number to binary
        /*
        Regex Translation:
            CapturingGroup 
                ZeroWidthPositiveLookbehind
                1
            CapturingGroup
                GroupNumber:1
                Repeat
                    0
                    one or more times
            CapturingGroup
                ZeroWidthPositiveLookahead
                1
        */
        let splitedStringArray: Array<string> = (() => {
            let binaryGapRegex = /(?<=1)(0+)(?=1)/g;
            let __regex__m = null;
            let all___regex__m = new Array<string>();
            do {
                __regex__m = binaryGapRegex.exec(binaryString);
                if (__regex__m && __regex__m.length > 0) {
                    all___regex__m.push(__regex__m[0]);
                }
            }
            while (__regex__m);
            return all___regex__m;
        })();

        // The string array could be null in case of no gaps
        let longestGap: number = Math.max(...splitedStringArray.map(stringElement => stringElement.length)) || 0;
        //Console.WriteLine(longestGap);
        return longestGap;
    }
}
