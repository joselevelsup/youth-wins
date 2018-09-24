export function chunk(arr, group) {
    var sets = [], chunks, i = 0;
    chunks = arr.length / group;

    while(i < chunks){
        sets[i] = arr.splice(0, group);
	      i++;
    }

    return sets;
}

export function websiteValid(str){
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(str);
}


export function emailValid(str){
    var regexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regexp.test(str);
}
