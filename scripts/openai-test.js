// DEMO CODE
'use strict';
(function() {

  window.addEventListener("load", init);

  function init() {
    document.getElementById("chat-btn").addEventListener("click", beginChat);
  }

  async function beginChat() {
    // Display user input
    let input = document.getElementById("input").value;
    let userChat = document.createElement("p");
    userChat.textContent =  "YOU: " + input;
    document.getElementById("output").appendChild(userChat);
    document.getElementById("input").value = "";

    // Request user input
    try {
      let response = await fetch("/response/" + input);
      await statusCheck(response);
      response = await response.text();
      displayBot(response);
    } catch (err) {
      console.log(err);
    }
  }

  function displayBot(res) {
    // Display bot response
    let botChat = document.createElement("p");
    botChat.textContent = "CHAT BOT: "  + res;
    document.getElementById("output").appendChild(botChat);
  }

  // Given
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }


})();