export function sanitize(str) {
  str = str.replace(/&/g, "&amp;");
  str = str.replace(/>/g, "&gt;");
  str = str.replace(/</g, "&lt;");
  str = str.replace(/"/g, "&quot;");
  str = str.replace(/'/g, "&#039;");
  return str;
}

export function linesToJson(str) {
    return str.split("\n");
}

export function cardsToText(jsxItems) {
    let strBuilder = "";
    for (let i = 0; i < jsxItems.length; ++i) {
        if (i != jsxItems.length - 1)
            strBuilder += jsxItems[i].props.id + "\n";
        else
            strBuilder += jsxItems[i].props.id;
    }
    return strBuilder; 
}
