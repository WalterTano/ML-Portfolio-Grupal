
export function extractLink(inputString) {
  const regex = /\[(.*?)\]\((.*?)\)/;
  const match = inputString.match(regex);
  
  if (match) {
    const result = {
      outputString: inputString.replace(`[${match[1]}]`, match[1]).replace(`(${match[2]})`, ''),
      label: match[1],
      url: match[2]
    };

    result.beforeLink = result.outputString.substring(0, result.outputString.indexOf(result.label));
    result.afterLink = result.outputString.substring(result.outputString.indexOf(result.label) + result.label.length);
    return result;
  }
}