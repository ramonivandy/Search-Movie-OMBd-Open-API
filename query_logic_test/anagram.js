function anagram (arr) {
    var mapData = {};
    var result = [];
        //grouping data by sorted string.
        for(var i = 0; i < arr.length; i++){
        var sorted = arr[i].split("").sort().join("");
        
        if(mapData[sorted] === undefined){
            mapData[sorted] = [arr[i]];
        }
        else{
            mapData[sorted].push(arr[i]);
        }
      }
      //create output
      for(var array in mapData){
          result.push(mapData[array]);
      }
      return result;
    }