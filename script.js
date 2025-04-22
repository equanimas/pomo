class PomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.timer = null;
        this.isRunning = false;
        this.isWorkMode = true;
        
        // DOM elements
        this.timeDisplay = document.querySelector('.time-display');
        this.startButton = document.getElementById('start');
        this.pauseButton = document.getElementById('pause');
        this.resetButton = document.getElementById('reset');
        this.modeButtons = document.querySelectorAll('.mode');
        this.modeToggleButton = document.getElementById('modeToggle');
        this.container = document.querySelector('.container');
        
        // Bind event listeners
        this.startButton.addEventListener('click', () => this.start());
        this.pauseButton.addEventListener('click', () => this.pause());
        this.resetButton.addEventListener('click', () => this.reset());
        this.modeButtons.forEach(button => {
            button.addEventListener('click', () => this.setMode(button));
        });
        this.modeToggleButton.addEventListener('click', () => this.toggleMode());
        this.container.addEventListener('mouseenter', () => this.handleHover(true));
        this.container.addEventListener('mouseleave', () => this.handleHover(false));
        
        // Initialize display
        this.updateDisplay();
        this.updateBackground();
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timer = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft <= 0) {
                    this.reset();
                    // You can add a notification sound here
                }
            }, 1000);
        }
    }
    
    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.timer);
        }
    }
    
    reset() {
        this.pause();
        const activeMode = document.querySelector('.mode.active');
        this.timeLeft = parseInt(activeMode.dataset.time) * 60;
        this.updateDisplay();
    }
    
    setMode(button) {
        this.modeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        this.reset();
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    toggleMode() {
        this.isWorkMode = !this.isWorkMode;
        this.updateBackground();
        this.modeToggleButton.textContent = this.isWorkMode ? 'Switch to Leisure Mode' : 'Switch to Work Mode';
    }
    
    handleHover(isHovering) {
        if (isHovering) {
            if (this.isWorkMode) {
                this.container.style.boxShadow = '0 15px 30px rgba(255, 255, 255, 0.25), 0 10px 10px rgba(255, 255, 255, 0.15)';
            } else {
                this.container.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.15)';
            }
        } else {
            this.updateBackground();
        }
    }
    
    updateBackground() {
        document.body.style.backgroundColor = this.isWorkMode ? 'black' : 'orange';
        if (this.isWorkMode) {
            this.container.style.boxShadow = '0 10px 20px rgba(255, 255, 255, 0.2), 0 6px 6px rgba(255, 255, 255, 0.1)';
        } else {
            this.container.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.1)';
        }
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
}); 