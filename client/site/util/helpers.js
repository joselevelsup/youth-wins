export function shorten(d, num, word){
    if (d.length <= num) {
        return d;
    }
    var subString = d.substr(0, num-1);
    return (word ? subString.substr(0, subString.lastIndexOf(' ')) : subString) + "...";
}
