export function dhm(t : number){
    var cd : number = 24 * 60 * 60 * 1000,
        ch : number= 60 * 60 * 1000,
        d : number = Math.floor(t / cd),
        h = Math.floor( (t - d * cd) / ch),
        m = Math.round( (t - d * cd - h * ch) / 60000)
  if( m === 60 ){
    h++;
    m = 0;
  }
  if( h === 24 ){
    d++;
    h = 0;
  }

  return `${d} days, ${h} hours, ${m} minutes ago`;
}