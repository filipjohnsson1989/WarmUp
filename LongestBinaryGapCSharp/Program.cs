using System;
using System.Linq;
using System.Text.RegularExpressions;

namespace LongestBinaryGapCSharp;
internal class Program
{
    private const int Default_Longest_Binary_Gap = 0;
    private static void Main(string[] args)
    {

        // write your code in C# 6.0 with .NET 4.5 (Mono)

        // Assumptions:
        // N is integer within the range [1..2,147,483,647].
        // Otherwise, N is supposed to be positive.
        //if (N < 0) return Default_Max_Binary_Gap;


        // Not efficent
        //return LongestBinaryGapWithoutRegex(N);


        // More efficent
        int N = 1376796946;
        int longestGap = LongestBinaryGapWithRegex(N);
        Console.WriteLine(longestGap);
    }

    private static int LongestBinaryGapWithoutRegex(int N)
    {
        string binaryString = Convert.ToString(N, 2); // Convert given number to binary
                                                      //Console.WriteLine(binaryString); // Just for Test

        string trimedStringByZero = binaryString.Trim('0'); // To remove binary with no gaps
                                                            //Console.WriteLine(trimedStringByZero); // Just for Test

        // To split by 1 and remove empty strings in the result array
        string[] splitedStringArray = trimedStringByZero.Split(new char[] { '1' }, StringSplitOptions.RemoveEmptyEntries);
        //Console.WriteLine(trimedStringByZero[1]); // Just for Test


        // The string array could be null in case of no gaps
        int longestGap = splitedStringArray.Select(stringElement => stringElement.Length)
                                            .DefaultIfEmpty(Default_Longest_Binary_Gap)
                                            .Max();
        //Console.WriteLine(longestGap);

        return longestGap;
    }

    // More efficent
    private static int LongestBinaryGapWithRegex(int N)
    {
        string binaryString = Convert.ToString(N, 2); // Convert given number to binary

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
        Regex binaryGapRegex = new Regex("(?<=1)(0+)(?=1)");

        return binaryGapRegex.Matches(binaryString)
                .Cast<Match>()
                .Select(stringElement => stringElement.Length)
                .DefaultIfEmpty(Default_Longest_Binary_Gap)
                .Max();
    }


}
