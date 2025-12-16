var playersData = [];

fetch('FIFA20.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    playersData = data;
  });

var input = document.getElementById('player-input');
var dropdown = document.getElementById('dropdown');
var playerBox = document.getElementById('player-box');

input.addEventListener('input', function () {
  var value = input.value.toLowerCase();
  dropdown.innerHTML = '';

  if (value === '') {
    return;
  }

  var matchesCount = 0;
  var i;

  for (i = 0; i < playersData.length; i++) {
    var nameLower = playersData[i].Name.toLowerCase();

    if (nameLower.indexOf(value) !== -1) {
      var option = document.createElement('div');
      option.className = 'dropdown-item';
      option.textContent = playersData[i].Name;

      (function(playerName) {
        option.addEventListener('click', function () {
          showPlayer(playerName);
          dropdown.innerHTML = '';
        });
      })(playersData[i].Name);

      dropdown.appendChild(option);

      matchesCount++;
      if (matchesCount === 5) {
        break; 
      }
    }
  }
});

function showPlayer(playerName) {
    playerBox.innerHTML = ''; 

    var player = playersData.find(function(p) {
        return p.Name === playerName;
    });

    if (player) {
        var nameElem = document.createElement('h2');
        nameElem.textContent = player.Name;

        var clubElem = document.createElement('p');
        clubElem.textContent = 'Club: ' + (player.Club || 'N/A'); 

        var ratingElem = document.createElement('p');
        ratingElem.textContent = 'Overall Rating: ' + (player.Overall || player.Rating || 'N/A');

        playerBox.appendChild(nameElem);
        playerBox.appendChild(clubElem);
        playerBox.appendChild(ratingElem);
        
        input.value = '';

    } else {
        playerBox.innerHTML = '<p>Player not found.</p>';
    }
}

