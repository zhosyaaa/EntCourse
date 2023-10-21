function startCountdown(endTime, display) {
    const timerInterval = setInterval(function () {
      const currentTime = new Date().getTime();
      const timeLeft = endTime - currentTime;
  
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        display.textContent = "Уақыт бітті.";
        return;
      }
  
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
      display.textContent = `${days} күн ${hours}:${minutes}:${seconds}`;
    }, 1000);
  }
  
  window.onload = function () {
    const countdown = document.getElementById("countdown");
    const endDate = new Date("Oct 30, 2023 00:00:00").getTime();
    startCountdown(endDate, countdown);
  };
  