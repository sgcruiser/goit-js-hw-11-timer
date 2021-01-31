const refs = {
  days: document.querySelector('.value[data-value="days"]'),
  hours: document.querySelector('.value[data-value="hours"]'),
  mins: document.querySelector('.value[data-value="mins"]'),
  secs: document.querySelector('.value[data-value="secs"]'),
};

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }

  start() {
    let startTime = Date.now();

    this.deltaDates = Math.floor(
      (this.targetDate - startTime) / (1000 * 60 * 60 * 24),
    );
    // console.dir(this.deltaDates);

    this.intervalId = setInterval(() => {
      startTime = Date.now();
      const deltaTime = this.targetDate - startTime;

      this.updateClockface(deltaTime);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  updateClockface(time) {
    if (time <= 0) {
      return this.stop();
    }

    const days = this.padDate(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.padClock(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.padClock(
      Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
    );
    const secs = this.padClock(Math.floor((time % (1000 * 60)) / 1000));

    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.mins.textContent = `${mins}`;
    refs.secs.textContent = `${secs}`;
  }

  padDate(value) {
    // console.log(String(this.deltaDates).length);
    return String(value).padStart(String(this.deltaDates).length, '0');
  }

  padClock(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Oct 28, 2023, 19:06:19'),
});

// console.log(timer);
timer.start();
