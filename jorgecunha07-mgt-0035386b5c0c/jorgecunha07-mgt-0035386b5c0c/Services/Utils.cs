using System;
using System.Text.RegularExpressions;

namespace MGT.Services;

public static class Utils
{
    public static bool IsValidPhoneNumber(string phoneNumber)
    {
        const string phoneNumberPattern = @"^\+\d{1,4}\s?\d{9}$";
        return !string.IsNullOrWhiteSpace(phoneNumber) && Regex.IsMatch(phoneNumber, phoneNumberPattern);
    }
    
    public static string RemoveWhiteSpaces(string input)
    {
        return string.Join("", input.Split(default(string[]), StringSplitOptions.RemoveEmptyEntries));
    }
}