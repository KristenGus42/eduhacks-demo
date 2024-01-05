'use strict';
(function() {

  // GIVEN
  window.addEventListener("load", init);

  // 4: DEMO -> event listeners
  function init() {
    document.getElementById("chat-btn").addEventListener("click", displayUser);
  }

  // 5: DEMO -> Display user input
  async function displayUser() {
    let input = document.getElementById("input").value;
    let userChat = document.createElement("p");
    userChat.textContent =  "YOU: " + input;
    document.getElementById("output").appendChild(userChat);
    document.getElementById("input").value = "";
    // 6: DEMO -> Fetch response from our app.js backend
    fetchRespnse(input);
  }

  // 6: DEMO -> Fetch response from our app.js backend
  async function fetchRespnse(input) {
    try {
      let response = await fetch("/response/" + input);
      await statusCheck(response);
      response = await response.text();
      displayBot(response);
    } catch (err) {
      console.log(err);
    }
  }

  // 7: DEMO -> Display bot response
  function displayBot(res) {
    let botChat = document.createElement("p");
    botChat.textContent = "CHAT BOT: "  + res;
    document.getElementById("output").appendChild(botChat);
  }

  // GIVEN
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }


})();