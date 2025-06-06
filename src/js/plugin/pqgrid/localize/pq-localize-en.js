if ("function" == typeof require)
    var jQuery = jQuery || require("jquery");

(function($) {

    var pq = $.paramquery
      , local = 'en'
      , grid = pq.pqGrid.regional[local] = {
        strLocal: local,
        strAdd: "Add",
        strBlanks: "(Blanks)",
        strDelete: "Delete",
        strEdit: "Edit",
        strCondition: "Condition:",
        strConditions: {
            "": "--None--",
            begin: "Begins with",
            between: "In between",
            contain: "Contains",
            equal: "Equals",
            empty: "Empty",
            end: "Ends With",
            great: "Greater than",
            gte: "Greater than or equal",
            less: "Less than",
            lte: "Less than or equal",
            notbegin: "Not begins with",
            notcontain: "Not contains",
            notequal: "Not equals",
            notempty: "Not empty",
            notend: "Not ends with",
            range: "[ Range ]",
            regexp: "Regular expression"
        },
        strOk: 'Ok',
        strClear: 'Clear',
        strTabRemove: "{0} would be deleted permanently.\r\n Are you sure?",
        strTabName: "sheet{0}",
        strTabAdd: "New sheet",
        strTabClose: "Remove sheet",
        strGroup_header: "Drag a column here to group by that column",
        strGroup_merge: 'Merge cells',
        strGroup_fixCols: 'Fix columns',
        strGroup_grandSummary: 'Grand summary',
        strTP_aggPane: "Aggregates",
        strTP_colPane: 'Group columns',
        strTP_pivot: "Pivot mode",
        strTP_rowPane: "Group rows",
        strTP_aggPH: "Drop columns for computing aggregate values",
        strTP_colPH: "Drop columns here for grouping along column or x axis",
        strTP_rowPH: "Drop columns here for grouping along row or y axis",
        strLoading: "Loading",
        strNextResult: "Next Result",
        strNoRows: "No rows to display.",
        strNothingFound: "Nothing found",
        strPrevResult: "Previous Result",
        strSearch: "Search",
        strSelectAll: "Select All",
        strSelectedmatches: "Selected {0} of {1} match(es)",
        strFormulas: {
            ABS: ["ABS(number)", "Returns the absolute value of a number. The absolute value of a number is the number without its sign."],
            ACOS: ["ACOS(number)", "Returns the arccosine, or inverse cosine, of a number. The arccosine is the angle whose cosine is number. The returned angle is given in radians in the range 0 (zero) to pi."],
            AND: ["AND(logical1, [logical2], ...)", "Returns TRUE if all its arguments evaluate to TRUE, and returns FALSE if one or more arguments evaluate to FALSE."],
            ASIN: ["ASIN(number)", "Returns the arcsine, or inverse sine, of a number. The arcsine is the angle whose sine is number. The returned angle is given in radians in the range -pi/2 to pi/2."],
            ATAN: ["ATAN(number)", "Returns the arctangent, or inverse tangent, of a number. The arctangent is the angle whose tangent is number. The returned angle is given in radians in the range -pi/2 to pi/2."],
            AVERAGE: ["AVERAGE(number1, [number2], ...)", "Returns the average (arithmetic mean) of the arguments. For example, if the range A1:A20 contains numbers, the formula =AVERAGE(A1:A20) returns the average of those numbers."],
            AVERAGEIF: ["AVERAGEIF(range, criteria, [average_range])", "Returns the average (arithmetic mean) of all the cells in a range that meet a given criteria."],
            AVERAGEIFS: ["AVERAGEIFS(average_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)", "Returns the average (arithmetic mean) of all cells that meet multiple criteria."],
            CEILING: ["CEILING(number, significance)", "Returns number rounded up, away from zero, to the nearest multiple of significance. For example, if you want to avoid using pennies in your prices and your product is priced at $4.42, use the formula =CEILING(4.42,0.05) to round prices up to the nearest nickel."],
            CHAR: ["CHAR(number)", "Returns the character specified by a number."],
            CHOOSE: ["CHOOSE(index_num, value1, [value2], ...)", "If index_num is 1, CHOOSE returns value1; if it is 2, CHOOSE returns value2; and so on."],
            CODE: ["CODE(text)", "Returns a numeric code for the first character in a text string."],
            COLUMN: ["COLUMN()", "Returns reference of the cell in which the COLUMN function appears."],
            COLUMNS: ["COLUMNS(array)", "Returns the number of columns in an array or reference."],
            CONCATENATE: ["CONCATENATE(text1, [text2], ...)", "join two or more text strings into one string."],
            COS: ["COS(number)", "Returns the cosine of the given angle(in radians)."],
            COUNT: ["COUNT(value1, [value2], ...)", "Counts the number of cells that contain numbers, and counts numbers within the list of arguments."],
            COUNTA: ["COUNTA(value1, [value2], ...)", "The COUNTA function counts the number of cells that are not empty in a range."],
            COUNTBLANK: ["COUNTBLANK(range)", "Counts empty cells in a specified range of cells."],
            COUNTIF: ["COUNTIF(range, criteria)", "counts the number of cells that meet a criterion; for example, to count the number of times a particular city appears in a customer list."],
            COUNTIFS: ["COUNTIFS(criteria_range1, criteria1, [criteria_range2, criteria2]…)", "Applies criteria to cells across multiple ranges and counts the number of times all criteria are met."],
            DATE: ["DATE(year,month,day)", "returns the sequential serial number that represents a particular date."],
            DATEDIF: ["DATEDIF(start_date,end_date,unit)", "Calculates the number of days, months, or years between two dates. Unit can be 'Y', 'M' or 'D'."],
            DATEVALUE: ["DATEVALUE(date_text)", "converts a date that is stored as text to a serial number that Excel recognizes as a date. For example, the formula =DATEVALUE(\"1/1/2008\") returns 39448."],
            DAY: ["DAY(serial_number)", "Returns the day of a date, represented by a serial number."],
            DAYS: ["DAYS(end_date, start_date)", "Returns the number of days between two dates."],
            DEGREES: ["DEGREES(angle)", "Converts radians into degrees."],
            EOMONTH: ["EOMONTH(start_date, months)", "Returns the serial number for the last day of the month that is the indicated number of months before or after start_date."],
            EXP: ["EXP(number)", "Returns e raised to the power of number. "],
            FIND: ["FIND(find_text, within_text, [start_num])", "Locates one text string within a second text string, and return the number of the starting position of the first text string from the first character of the second text string."],
            FLOOR: ["FLOOR(number, significance)", "Rounds number down, toward zero, to the nearest multiple of significance."],
            HLOOKUP: ["HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])", "Searches for a value in the top row of a table or an array of values, and then returns a value in the same column from a row you specify in the table or array."],
            HOUR: ["HOUR(serial_number)", "Returns the hour of a time value. The hour is given as an integer, ranging from 0 (12:00 A.M.) to 23 (11:00 P.M.)."],
            IF: ["IF(logical_test, value_if_true, [value_if_false])", "returns one value if a condition is true and another value if it's false."],
            //IFERROR:  ["IFERROR(value, value_if_error)","Returns a value you specify if a formula evaluates to an error; otherwise, returns the result of the formula. Use the IFERROR function to trap and handle errors in a formula."],
            INDEX: ["INDEX(array, row_num, [column_num])", "Returns the value of an element in a table or an array, selected by the row and column number indexes."],
            INDIRECT: ["INDIRECT(ref_text, [a1])", "Returns the reference specified by a text string. References are immediately evaluated to display their contents."],
            ISBLANK: ["ISBLANK(value)", "Returns TRUE if the value is blank"],
            LARGE: ["LARGE(array, k)", "Returns the k-th largest value in a data set."],
            LEFT: ["LEFT(text, [num_chars])", "returns the first character or characters in a text string, based on the number of characters you specify."],
            LEN: ["LEN(text)", "returns the number of characters in a text string."],
            LOOKUP: ["LOOKUP(lookup_value, lookup_vector, [result_vector])", "Looks in a one-row or one-column range (known as a vector) for a value and returns a value from the same position in a second one-row or one-column range."],
            LOWER: ["LOWER(text)", "Converts all uppercase letters in a text string to lowercase."],
            MATCH: ["MATCH(lookup_value, lookup_array, [match_type])", "Searches for a specified item in a range of cells, and then returns the relative position of that item in the range. match_type can be: 0 for exact match with option to use wildcards; 1 ( default ) for less than, The values in the lookup_array argument must be placed in ascending order; -1 for greater than, values in the lookup_array argument must be placed in descending order."],
            MAX: ["MAX(number1, [number2], ...)", "Returns the largest value in a set of values."],
            MEDIAN: ["MEDIAN(number1, [number2], ...)", "Returns the median of the given numbers. The median is the number in the middle of a set of numbers."],
            MID: ["MID(text, start_num, num_chars)", "returns a specific number of characters from a text string, starting at the position you specify, based on the number of characters you specify."],
            MIN: ["MIN(number1, [number2], ...)", "Returns the smallest number in a set of values."],
            MODE: ["MODE(number1,[number2],...)", "Returns the most frequently occurring, or repetitive, value in an array or range of data."],
            MONTH: ["MONTH(serial_number)", "Returns the month of a date represented by a serial number. The month is given as an integer, ranging from 1 (January) to 12 (December)."],
            OR: ["OR(logical1, [logical2], ...)", "returns TRUE if any of its arguments evaluate to TRUE, and returns FALSE if all of its arguments evaluate to FALSE."],
            PI: ["PI()", "Returns the number 3.14159265358979, the mathematical constant pi."],
            POWER: ["POWER(number, power)", "Returns the result of a number raised to a power."],
            PRODUCT: ["PRODUCT(number1, [number2], ...)", "multiplies all the numbers given as arguments and returns the product. PRODUCT(A1:A3, C1:C3) is equivalent to =A1 * A2 * A3 * C1 * C2 * C3."],
            PROPER: ["PROPER(text)", "Capitalizes the first letter in each word of a text value."],
            RADIANS: ["RADIANS(angle)", "Converts degrees into radians."],
            RAND: ["RAND()", "Returns an evenly distributed random real number greater than or equal to 0 and less than 1."],
            RANK: ["RANK(number,ref,[order])", "Returns the rank of a number in a list of numbers."],
            RATE: ["", ""],
            REPLACE: ["REPLACE(old_text, start_num, num_chars, new_text)", "replaces part of a text string, based on the number of characters you specify, with a different text string."],
            REPT: ["REPT(text, number_times)", "Repeats text a given number of times."],
            RIGHT: ["RIGHT(text,[num_chars])", "returns the last character or characters in a text string, based on the number of characters you specify."],
            ROUND: ["ROUND(number, num_digits)", "rounds a number to a specified number of digits."],
            ROUNDDOWN: ["ROUNDDOWN(number, num_digits)", "Rounds a number down, toward zero."],
            ROUNDUP: ["ROUNDUP(number, num_digits)", "Rounds a number up, away from 0 (zero)."],
            ROW: ["ROW()", "Returns the reference of the cell in which the ROW function appears."],
            ROWS: ["ROWS(array)", "Returns the number of rows in a reference or array."],
            SEARCH: ["SEARCH(find_text,within_text,[start_num])", "locate one text string within a second text string, and return the number of the starting position of the first text string from the first character of the second text string."],
            SIN: ["SIN(number)", "Returns the sine of the given angle(in radians)."],
            SMALL: ["SMALL(array, k)", "Returns the k-th smallest value in a data set."],
            SQRT: ["SQRT(number)", "Returns a positive square root."],
            STDEV: ["STDEV(number1,[number2],...)", "Estimates standard deviation based on a sample. The standard deviation is a measure of how widely values are dispersed from the average value (the mean)."],
            STDEVP: ["STDEVP(number1,[number2],...)", "Calculates standard deviation based on the entire population given as arguments."],
            SUBSTITUTE: ["SUBSTITUTE(text, old_text, new_text, [instance_num])", "Substitutes new_text for old_text in a text string."],
            SUM: ["SUM(number1,[number2],...)", "Adds its arguments. You can add individual values, cell references or ranges or a mix of all three."],
            //different from actual specs,
            SUMIF: ["SUMIF(range, criteria, [sum_range])", "adds the values in a range that meet criteria that you specify"],
            SUMIFS: ["SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)", "adds all of its arguments that meet multiple criteria."],
            SUMPRODUCT: ["SUMPRODUCT(array1, [array2], [array3], ...)", "Multiplies corresponding components in the given arrays, and returns the sum of those products."],
            TAN: ["TAN(number)", "Returns the tangent of the given angle(in radians)."],
            TEXT: ["TEXT(Value you want to format, \"Format code you want to apply\")", "The TEXT function lets you change the way a number appears by applying formatting to it with format codes."],
            TIME: ["TIME(hour, minute, second)", "Returns the decimal number for a particular time."],
            TIMEVALUE: ["TIMEVALUE(time_text)", "Returns the decimal number of the time represented by a text string. The decimal number is a value ranging from 0 (zero) to 0.99988426, representing the times from 0:00:00 (12:00:00 AM) to 23:59:59 (11:59:59 P.M.)."],
            TODAY: ["TODAY()", "Returns the serial number of the current date."],
            TRIM: ["TRIM(text)", "Removes all spaces from text except for single spaces between words."],
            TRUNC: ["TRUNC(number, [num_digits])", "Truncates a number to an integer by removing the fractional part of the number."],
            UPPER: ["UPPER(text)", "Converts text to uppercase."],
            VALUE: ["VALUE(text)", "Converts a text string that represents a number to a number."],
            VAR: ["VAR(number1,[number2],...)", "Estimates variance based on a sample."],
            VARP: ["VARP(number1,[number2],...)", "Calculates variance based on the entire population."],
            VLOOKUP: ["VLOOKUP (lookup_value, table_array, col_index_num, [range_lookup])", "look up a value in a table or a range by row. For example, look up a price of an automotive part by the part number."],
            YEAR: ["YEAR(serial_number)", "Returns the year corresponding to a date. The year is returned as an integer in the range 1900-9999."]
        }
    }
      , pager = pq.pqPager.regional[local] = {
        strDisplay: "Displaying {0} to {1} of {2} items.",
        strFirstPage: "First Page",
        strLastPage: "Last Page",
        strNextPage: "Next Page",
        strPage: "Page {0} of {1}",
        strPrevPage: "Previous Page",
        strRefresh: "Refresh",
        strRpp: "Records per page: {0}"
    };

    $.extend(pq.pqGrid.defaults, grid);
    $.extend(pq.pqPager.defaults, pager);

}
)(jQuery)
