// Card game : twenty-one -- 7kyu

function twentyOne(card1, card2, card3) {
  var arr = [card1.slice(0,card1.length-1),card2.slice(0,card2.length-1),card3.slice(0,card3.length-1)]
  var back = arr.map(function(item) {
    return item.replace(/J/gi,'2')
    .replace(/Q/gi,'3')
    .replace(/K/gi,'4')
    .replace(/A/gi,'11')
  })
  var result =  back.reduce(function(prev,next) {
    return Number(prev) + Number(next)
  }) 
  return result == 21 ? 'twenty-one' :
    result > 21 ? 'more' : 'less'
}

function twentyOne1(card1, card2, card3) {
  let cards = [...arguments].map(card => +card.replace(/[♣♦♥]/g,'').replace('A', 11).replace('J', 2).replace('Q', 3).replace('K', 4))
  let cardsSum = cards.reduce((a,b) => a+b)
  return cardsSum == 21 ? 'twenty-one' :
    cardsSum > 21 ? 'more' : 'less'
}

function twentyOne2(...cs) {
  let score = cards.reduce((a, b) => a + ({'J': 2, 'Q': 3, 'K': 4, 'A': 11}[b.charAt(0)] || parseInt(b)), 0);
  return score > 21 ? 'more' : score < 21 ? 'less' : 'twenty-one';
}




console.log(twentyOne('9♣', '7♦', '10♥'))
console.log(twentyOne('A♣', '6♦', '5♥'))