document.addEventListener('DOMContentLoaded', () => {
    const timer = document.getElementById("timer");
    const startPauseBtn = document.getElementById("startpause");
    const modeSelectorBtn = document.getElementById("modeselector");
    const modeTextElement = document.getElementById("mode");
    const darkmodeBtn = document.getElementById("darkmode");
    const body = document.querySelector("body");
    const buttons = document.querySelectorAll("button");
    const customBtn = document.getElementById("custom");
    const customField = document.getElementById("customtime");
    const popup = document.getElementById("popup");
    const timeSubmit = document.getElementById("submittime");
    const alarmSound = new Audio("sounds/alarm.mp3");
    const alarmToggle = document.getElementById("togglesound");

    let minutes = 25;
    let seconds = 0;
    let isPaused = true;
    let mode = "Pomodoro";
    let interval;
    let darkIsOn = false;
    let soundOn = true;

    function playSound() {
        if(soundOn) {
            alarmSound.play();

        }
    }

    timeSubmit.addEventListener("click", () => {
        const mins = parseInt(customField.value);
        console.log(mins);
        if(!isNaN(mins) && mins > 0) {
            minutes = mins;
            seconds = 0;
            updateTimerDisplay();
            customHandle();
        }else {
            alert("Invalid");
        }
    })
    alarmToggle.addEventListener("click", () => {
        soundOn = !soundOn;
    })

    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference === 'enabled') {
        body.classList.add("dark-mode");
        // Apply dark-btn class to all buttons after dark mode is applied
        buttons.forEach(button => {
            button.classList.add("dark-btn");
        });
    }
    function customHandle() {
        popup.classList.toggle("visible");
        console.log(popup.classList); // Check the visibility state
    }
    
    

    function updateTimerDisplay() {
        timer.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function darkMode() {
        darkIsOn = !darkIsOn;
        body.classList.toggle("dark-mode"); // Toggle dark mode on body
        
        // Toggle dark-btn class for all buttons
        buttons.forEach(button => {
            button.classList.toggle("dark-btn");
        });

        // Save dark mode state to localStorage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    }

    function togglePause() {
        isPaused = !isPaused;
        if (!isPaused) {
            if (!interval) {
                startTimer();
            }
        }
    }

    function switchMode() {
        if (mode === "Pomodoro") {
            mode = "Break";
            minutes = 5;
        } else {
            mode = "Pomodoro";
            minutes = 25;
        }
        seconds = 0;
        modeTextElement.textContent = mode;
        updateTimerDisplay();
    }

    function startTimer() {
        interval = setInterval(() => {
            if (!isPaused) {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(interval);
                        interval = null;
                        playSound();
                        return;
                    }
                    minutes--;
                    seconds = 59;
                } else {
                    seconds--;
                }
                updateTimerDisplay();
            }
        }, 1000);
    }

    // Event listeners for buttons
    startPauseBtn.addEventListener("click", togglePause);
    modeSelectorBtn.addEventListener("click", switchMode);
    darkmodeBtn.addEventListener("click", darkMode);
    customBtn.addEventListener("click", customHandle);

    updateTimerDisplay();
});
