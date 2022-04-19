/*
  @name: NumberConverter
  @desc: converts number to a short length form with T/B/M/K and fixed number of decimals.
  @params: fixed: decimals to display , returnSign: 2 = "+"/"-", 1 = "-"/"", 0 = ""
  @returns: string
*/
export function NumberConverter(value, fixed=0, returnSign=0) {
  try {
    if (value == null) {
      return "0";
    }
    
    if (value.toString().length > 0) {
      let sign = "";
      
      if (returnSign === 2) {
        sign = (value.toString().includes("-") ? "-" : "+");
      } else if (returnSign === 1) {
        sign = (value.toString().includes("-") ? "-" : "");
      }
  
      value = value.toString().replace("-", "");
  
      return Math.abs(Number(value)) >= 1.0e+12
        // 1T
        ? sign + (Math.abs(Number(value)) / 1.0e+12).toFixed(fixed) + "T"
        // 1B
        : Math.abs(Number(value)) >= 1.0e+9
        ? sign + (Math.abs(Number(value)) / 1.0e+9).toFixed(fixed) + "B"
        // 1M
        : Math.abs(Number(value)) >= 1.0e+6
        ? sign + (Math.abs(Number(value)) / 1.0e+6).toFixed(fixed) + "M"
        // 1K
        : Math.abs(Number(value)) >= 1.0e+3
        ? sign + (Math.abs(Number(value)) / 1.0e+3).toFixed(fixed) + "K"
        // < 1000
        : sign + Math.abs(Number(value)).toFixed(fixed);
    }    
  } catch (error) {
    console.log(error);
  }  
}

/*
  @name: Subtract
  @desc: subtracts the variable b from a.
  @params: fixed: decimals to display , returnSign: 2 = "+"/"-", 1 = "-"/"", 0 = ""
  @returns: string
*/
export function Subtract(a, b, fixed=0, returnSign=0) {
  try {    
    return NumberConverter(a - b, fixed, returnSign);
  } catch (error) {
    console.log(error);
  }
}