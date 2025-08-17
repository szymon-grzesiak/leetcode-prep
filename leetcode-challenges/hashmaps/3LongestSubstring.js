/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
    let maxLength = 0;
    let start = 0;
    let seen = {};
  
    for (let end = 0; end < s.length; end++) {
      const currentChar = s[end];

      if(seen[currentChar] >= start) {
        start = seen[currentChar] + 1
      }
  
      seen[currentChar] = end;
      maxLength = Math.max(maxLength, end - start + 1);
    }
  
    return maxLength;
  }
  