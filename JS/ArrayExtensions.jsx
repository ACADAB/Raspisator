Array.prototype.filterInPlace = function(condition){
  let index = 0;
  let newIndex = 0;
  while (index < this.length) {
    const value = this[index];
    if (condition(value)) this[newIndex++] = value;
    index++;
  }

  this.length = newIndex;
  return this;
}


Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
}