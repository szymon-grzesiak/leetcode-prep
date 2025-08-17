{
  // TODO*: Given an input list of names, for each name, find the shortest substring that only appears in that name.

  // TODO: Input: ["cheapair", "cheapoair", "peloton", "pelican"]
  // TODO: Output:
  // TODO: "cheapair": "pa"  // every other 1-2 length substring overlaps with cheapoair
  // TODO: "cheapoair": "po" // "oa" would also be acceptable
  // TODO: "pelican": "ca"   // "li", "ic", or "an" would also be acceptable
  // TODO: "peloton": "t"    // this single letter doesn't occur in any other string

  function shortestUniqueSubstring(names) {
    let substringMap = new Map();

    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      for (let j = 0; j < name.length; j++) {
        for (let k = j + 1; k <= name.length; k++) {
          const sub = name.substring(j, k);
          if (!substringMap.has(sub)) {
            substringMap.set(sub, new Set());
          }
          substringMap.get(sub).add(i);
        }
      }
    }

    const results = {};
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      let shortestSub = "";

      for (let len = 1; len <= name.length; len++) {
        for (let j = 0; j <= name.length - len; j++) {
          const sub = name.substring(j, j + len);
          const occurrences = substringMap.get(sub);
          if (occurrences.size === 1) {
            shortestSub = sub;
            break;
          }
        }
        if (shortestSub) {
          break;
        }
      }
      results[name] = shortestSub;
    }

    return results;
  }

  console.log(
    shortestUniqueSubstring(["cheapair", "cheapoair", "peloton", "pelican"])
  );
}
{
  function shortestUniqueSubstr(strArr) {
    const result = {};

    for (const str of strArr) {
      result[str] = str;

      for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j <= str.length; j++) {
          const subStr = str.substring(i, j);

          if (subStr.length >= result[str].length) continue;

          let isUnique = true;
          for (const otherStr of strArr) {
            if (otherStr === str) continue;

            if (otherStr.includes(subStr)) {
              isUnique = false;
              break;
            }
          }
          if (isUnique) result[str] = subStr;
        }
      }
    }
    return result;
  }

  const names = ["cheapair", "cheapoair", "peloton", "pelican"];
  const uniqueSubstrings = shortestUniqueSubstr(names);
  console.log(uniqueSubstrings);
}
