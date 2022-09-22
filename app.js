document.addEventListener("DOMContentLoaded", () => {
  class Birthday {
    static playSong() {
      const birthdaySong = document.getElementById("birthday-song");
      birthdaySong.play();
    }
    static openBox() {
      let sec = 1;
      const gift = document.getElementById("gift");
      const present = document.getElementById("present");
      // reset animation
      const shake = setInterval(function () {
        // -> delete class
        gift.classList.remove("apply-shake");
        // -> triggering reflow The actual magic
        // without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.

        gift.offsetWidth;
        // -> add the animation class so the animation is restarted
        gift.classList.add("apply-shake");
        sec++;
        // Stop shaking after 5th sec fade and start main animation and show confetti
        if (sec === 5) {
          Birthday.stopShaking(shake);
          Birthday.fade(present);
          Birthday.startMain();
          Birthday.showConfetti();
        }
      }, 1000);
    }
    static fade(element) {
      let op = 1; // initial opacity
      const timer = setInterval(function () {
        if (op <= 0.1) {
          clearInterval(timer);
          element.style.display = "none";
        }
        element.style.opacity = op;
        element.style.filter = "alpha(opacity=" + op * 100 + ")";
        op -= op * 0.1;
      }, 50);
    }
    static startMain() {
      let main = document.getElementById("main");
      main.classList.add("center");
    }
    static stopShaking(shake) {
      clearInterval(shake);
    }

    static showConfetti() {
      // launch a few confetti from the left edge
      confetti({
        particleCount: 5,
        angle: 180,
        spread: 360,
        origin: { x: 0.8, y: 0 },
      });
      // and launch a few from the right edge
      confetti({
        particleCount: 5,
        angle: 360,
        spread: 360,
        origin: { x: 0.2, y: 0 },
      });

      // keep showing confetti and play birthday song
      if (Date.now()) {
        requestAnimationFrame(Birthday.showConfetti);
        Birthday.playSong();
      }
    }
  }
  const present = document.getElementById("present");
  const date = document.getElementById("date");
  const today = new Date();
  let h1 = document.createElement("h1");
  h1.append(today.toLocaleDateString());

  date.append(h1);
  console.log(date);
  let click = false;
  present.addEventListener("click", () => {
    if (click) {
      console.log("already clicked");
      return;
    } else {
      console.log("first click");
      Birthday.openBox();
      click = true;
    }
  });
});
