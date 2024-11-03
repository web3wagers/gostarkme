export default function hex2ascii(hexx: string) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

export function calculatePorcentage(qty: number, goal: number): number {
  return (Number(qty) / Number(goal)) * 100;
}