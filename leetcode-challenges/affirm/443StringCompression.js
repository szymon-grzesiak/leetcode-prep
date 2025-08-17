/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function(chars) {
    let writeIndex = 0;
    for (let i = 0; i < chars.length; i++) {
        let count = 1;

        while (i + 1 < chars.length && chars[i] === chars[i + 1]) {
            count++;
            i++;
        }

        chars[writeIndex] = chars[i];
        writeIndex++;

        if (count > 1) {
            for (const digit of String(count)) {
                chars[writeIndex] = digit;
                writeIndex++;
            }
        }
    }
    return writeIndex;
};