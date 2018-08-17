export function chunk(arr, group) {
    var sets = [], chunks, i = 0;
    chunks = arr.length / group;

    while(i < chunks){
        sets[i] = arr.splice(0, group);
	      i++;
    }

    return sets;
}
