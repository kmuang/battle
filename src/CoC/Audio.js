export default class AudioManager {
    constructor() {
        this.context = new (window.AudioContext || window.webkitAudioContext)()
        this.masterGain = this.context.createGain()
        this.masterGain.gain.value = 0.3 // Lower volume
        this.masterGain.connect(this.context.destination)

        this.enabled = false
    }

    resume() {
        if (this.context.state === 'suspended') {
            this.context.resume()
        }
        this.enabled = true
    }

    playTone(freq, type, duration, startTime = 0) {
        if (!this.enabled) return

        const osc = this.context.createOscillator()
        const gain = this.context.createGain()

        osc.type = type
        osc.frequency.setValueAtTime(freq, this.context.currentTime + startTime)

        gain.gain.setValueAtTime(1, this.context.currentTime + startTime)
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + startTime + duration)

        osc.connect(gain)
        gain.connect(this.masterGain)

        osc.start(this.context.currentTime + startTime)
        osc.stop(this.context.currentTime + startTime + duration)
    }

    playCannon() {
        // Low boom
        this.playTone(100, 'square', 0.3)
        this.playTone(60, 'sawtooth', 0.4)
    }

    playArrow() {
        // High zip
        this.playTone(600, 'triangle', 0.1)
    }

    playRocket() {
        // Noise-like (approximated with rapid freq sweep)
        if (!this.enabled) return
        const osc = this.context.createOscillator()
        const gain = this.context.createGain()

        osc.frequency.setValueAtTime(200, this.context.currentTime)
        osc.frequency.exponentialRampToValueAtTime(50, this.context.currentTime + 0.5)

        gain.gain.setValueAtTime(0.5, this.context.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.5)

        osc.connect(gain)
        gain.connect(this.masterGain)
        osc.start()
        osc.stop(this.context.currentTime + 0.5)
    }

    playMagic() {
        // Mystical hum
        this.playTone(400, 'sine', 0.5)
        this.playTone(800, 'sine', 0.5, 0.1)
    }
}
