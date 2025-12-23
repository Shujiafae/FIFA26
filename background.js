document.addEventListener("DOMContentLoaded", function () {

  var playersData = []

  fetch("FIFA20.json")
    .then(function(res){
      return res.json()
    })
    .then(function(d){
      playersData = d
    })
    .catch(function(){
      console.log("json didnt load")
    })

  var input = document.getElementById("player-input")
  var dropdown = document.getElementById("dropdown")

  if(!input || !dropdown){
    console.log("input or dropdown missing")
    return
  }

  input.addEventListener("input", function(){
    var val = input.value.toLowerCase()
    dropdown.innerHTML = ""

    if(val == "") return

    var shown = 0

    for(var i=0;i<playersData.length;i++){
      var name = playersData[i].Name.toLowerCase()

      if(name.indexOf(val) !== -1){
        var item = document.createElement("div")
        item.className = "dropdown-item"
        item.textContent = playersData[i].Name

        item.onclick = function(){
          localStorage.setItem("selectedPlayerName", this.textContent)
          window.location.href = "player.html"
        }

        dropdown.appendChild(item)
        shown++

        if(shown >= 5) break
      }
    }
  })

})
