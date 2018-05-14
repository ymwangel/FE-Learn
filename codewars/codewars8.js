// str中word倒叙--7kyu
function reverseWords(str) {
  return str.split(' ').map(item => item.split('').reverse().join('')).join(' ')
}

console.log(reverseWords('a b cd d '))