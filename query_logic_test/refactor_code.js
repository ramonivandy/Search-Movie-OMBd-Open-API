function findFirstStringInBracket(str) {
    var index1 = str.indexOf("(");
    var index2 = str.indexOf(")");
    var result;
    if (index1 >= 0 && index2 >= 0) {
        result = str.substr(index1 + 1, (index2 - (index1 + 1)));
    }
    if (result) {
        return result;
    } else {
        return "";
    }
}