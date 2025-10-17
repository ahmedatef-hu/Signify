// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Advanced Animation System
document.addEventListener('DOMContentLoaded', () => {
    // Add different animation classes to elements
    const elementsToAnimate = [
        { selector: '.feature-card', animation: 'bounce-in' },
        { selector: '.learning-card', animation: 'scale-in' },
        { selector: '.about-text', animation: 'slide-in-left' },
        { selector: '.symbol', animation: 'rotate-in' },
        { selector: '.hero-visual', animation: 'slide-in-right' },
        { selector: '.communication-flow', animation: 'flip-in' },
        { selector: '.flow-item', animation: 'bounce-in' },
        { selector: '.avatar-3d-container', animation: 'scale-in' },
        { selector: '.translation-output', animation: 'slide-in-left' },
        { selector: '.camera-section', animation: 'slide-in-right' }
    ];
    
    elementsToAnimate.forEach(({ selector, animation }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.classList.add(animation);
            observer.observe(el);
        });
    });
    
    // Add floating animation to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('floating');
        }, index * 200);
    });
    
    // Add particle background to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.classList.add('particle-bg');
    }
    
});

// Sign to Speech Functionality
class SignToSpeech {
    constructor() {
        this.video = document.getElementById('signVideo');
        this.detectionBox = document.getElementById('detectionBox');
        this.statusIndicator = document.getElementById('statusIndicator');
        this.detectedText = document.getElementById('detectedText');
        this.audioVisualizer = document.getElementById('audioVisualizer');
        
        this.startCameraBtn = document.getElementById('startCamera');
        this.stopCameraBtn = document.getElementById('stopCamera');
        this.captureSignBtn = document.getElementById('captureSign');
        this.playSpeechBtn = document.getElementById('playSpeech');
        this.downloadAudioBtn = document.getElementById('downloadAudio');
        
        this.stream = null;
        this.isDetecting = false;
        this.speechSynthesis = window.speechSynthesis;
        this.currentUtterance = null;
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.startCameraBtn.addEventListener('click', () => this.startCamera());
        this.stopCameraBtn.addEventListener('click', () => this.stopCamera());
        this.captureSignBtn.addEventListener('click', () => this.captureSign());
        this.playSpeechBtn.addEventListener('click', () => this.playSpeech());
        this.downloadAudioBtn.addEventListener('click', () => this.downloadAudio());
    }
    
    async startCamera() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    width: 640, 
                    height: 480,
                    facingMode: 'user'
                } 
            });
            
            this.video.srcObject = this.stream;
            this.updateStatus('Camera Active', 'success');
            
            this.startCameraBtn.disabled = true;
            this.stopCameraBtn.disabled = false;
            this.captureSignBtn.disabled = false;
            
            // Start continuous sign detection
            this.startSignDetection();
            
        } catch (error) {
            console.error('Error accessing camera:', error);
            this.updateStatus('Camera Error', 'error');
            this.showNotification('Failed to access camera. Please check permissions.', 'error');
        }
    }
    
    stopCamera() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        
        this.video.srcObject = null;
        this.updateStatus('Camera Stopped', 'warning');
        
        this.startCameraBtn.disabled = false;
        this.stopCameraBtn.disabled = true;
        this.captureSignBtn.disabled = true;
        
        this.isDetecting = false;
    }
    
    updateStatus(message, type) {
        const statusSpan = this.statusIndicator.querySelector('span');
        const statusIcon = this.statusIndicator.querySelector('i');
        
        statusSpan.textContent = message;
        statusIcon.className = 'fas fa-circle';
        
        switch (type) {
            case 'success':
                statusIcon.style.color = '#4ade80';
                break;
            case 'error':
                statusIcon.style.color = '#ef4444';
                break;
            case 'warning':
                statusIcon.style.color = '#f59e0b';
                break;
            case 'detecting':
                statusIcon.style.color = '#3b82f6';
                break;
        }
    }
    
    startSignDetection() {
        this.isDetecting = true;
        this.updateStatus('Detecting Signs...', 'detecting');
        
        // Simulate sign detection with random words
        this.detectionInterval = setInterval(() => {
            if (this.isDetecting) {
                this.simulateSignDetection();
            }
        }, 3000);
    }
    
    simulateSignDetection() {
        const signWords = [
            'Hello', 'Thank you', 'Please', 'Help', 'Water', 'Food', 
            'Yes', 'No', 'Good', 'Bad', 'Love', 'Family', 'Friend',
            'Work', 'Home', 'School', 'Hospital', 'Money', 'Time'
        ];
        
        const randomWord = signWords[Math.floor(Math.random() * signWords.length)];
        this.detectedText.textContent = `Detected: "${randomWord}"`;
        this.playSpeechBtn.disabled = false;
        this.downloadAudioBtn.disabled = false;
        
        // Animate detection box
        this.detectionBox.style.borderColor = '#4ade80';
        setTimeout(() => {
            this.detectionBox.style.borderColor = '#87ceeb';
        }, 1000);
    }
    
    captureSign() {
        this.detectionBox.style.borderColor = '#3b82f6';
        this.detectionBox.style.borderStyle = 'solid';
        
        setTimeout(() => {
            this.detectionBox.style.borderStyle = 'dashed';
            this.detectionBox.style.borderColor = '#87ceeb';
        }, 2000);
        
        this.showNotification('Sign captured! Processing...', 'success');
    }
    
    playSpeech() {
        const text = this.detectedText.textContent.replace('Detected: "', '').replace('"', '');
        
        if (this.currentUtterance) {
            this.speechSynthesis.cancel();
        }
        
        this.currentUtterance = new SpeechSynthesisUtterance(text);
        this.currentUtterance.rate = 0.8;
        this.currentUtterance.pitch = 1;
        this.currentUtterance.volume = 1;
        
        // Visualize speech
        this.animateAudioVisualizer();
        
        this.currentUtterance.onstart = () => {
            this.playSpeechBtn.innerHTML = '<i class="fas fa-pause"></i> Playing...';
            this.playSpeechBtn.disabled = false;
        };
        
        this.currentUtterance.onend = () => {
            this.playSpeechBtn.innerHTML = '<i class="fas fa-volume-up"></i> Play Speech';
            this.stopAudioVisualizer();
        };
        
        this.speechSynthesis.speak(this.currentUtterance);
    }
    
    animateAudioVisualizer() {
        this.audioVisualizer.classList.add('playing');
        const waves = this.audioVisualizer.querySelectorAll('.sound-wave');
        
        waves.forEach((wave, index) => {
            wave.style.animation = `wave 0.5s ease-in-out infinite ${index * 0.1}s`;
        });
    }
    
    stopAudioVisualizer() {
        this.audioVisualizer.classList.remove('playing');
        const waves = this.audioVisualizer.querySelectorAll('.sound-wave');
        waves.forEach(wave => {
            wave.style.animation = 'none';
        });
    }
    
    downloadAudio() {
        const text = this.detectedText.textContent.replace('Detected: "', '').replace('"', '');
        
        // Create audio using Web Speech API
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        // Note: Direct audio download from SpeechSynthesis is not supported
        // This would require a more complex implementation with Web Audio API
        this.showNotification('Audio download feature requires additional setup', 'info');
    }
}

// Advanced 3D Avatar System
class ThreeDAvatar {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.avatar = null;
        this.clock = new THREE.Clock();
        
        this.initializeThreeJS();
        this.createAvatar();
        this.setupAnimations();
    }
    
    initializeThreeJS() {
        const canvas = document.getElementById('avatarCanvas');
        
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f8ff);
        
        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75, 
            canvas.clientWidth / canvas.clientHeight, 
            0.1, 
            1000
        );
        this.camera.position.set(0, 0, 5);
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            antialias: true,
            alpha: true 
        });
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);
        
        // Start render loop
        this.animate();
    }
    
    createAvatar() {
        // Avatar group
        this.avatar = new THREE.Group();
        
        // Head
        const headGeometry = new THREE.SphereGeometry(0.8, 32, 32);
        const headMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xffdbac,
            transparent: true,
            opacity: 0.9
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.set(0, 1.5, 0);
        head.castShadow = true;
        head.name = 'head';
        this.avatar.add(head);
        
        // Eyes
        const eyeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const eyeMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
        
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.25, 1.6, 0.7);
        this.avatar.add(leftEye);
        
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.25, 1.6, 0.7);
        this.avatar.add(rightEye);
        
        // Mouth
        const mouthGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const mouthMaterial = new THREE.MeshLambertMaterial({ color: 0x8B0000 });
        const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
        mouth.position.set(0, 1.3, 0.7);
        mouth.scale.set(1, 0.5, 0.5);
        this.avatar.add(mouth);
        
        // Body
        const bodyGeometry = new THREE.CylinderGeometry(0.6, 0.8, 1.5, 16);
        const bodyMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x4169E1,
            transparent: true,
            opacity: 0.9
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.set(0, 0.2, 0);
        body.castShadow = true;
        body.name = 'body';
        this.avatar.add(body);
        
        // Left Arm
        const leftArmGeometry = new THREE.CylinderGeometry(0.15, 0.2, 1.2, 16);
        const armMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xffdbac,
            transparent: true,
            opacity: 0.9
        });
        const leftArm = new THREE.Mesh(leftArmGeometry, armMaterial);
        leftArm.position.set(-0.8, 0.5, 0);
        leftArm.rotation.z = Math.PI / 4;
        leftArm.castShadow = true;
        leftArm.name = 'leftArm';
        this.avatar.add(leftArm);
        
        // Right Arm
        const rightArm = new THREE.Mesh(leftArmGeometry, armMaterial);
        rightArm.position.set(0.8, 0.5, 0);
        rightArm.rotation.z = -Math.PI / 4;
        rightArm.castShadow = true;
        rightArm.name = 'rightArm';
        this.avatar.add(rightArm);
        
        // Add avatar to scene
        this.scene.add(this.avatar);
        
        // Store references for animation
        this.avatarComponents = {
            head: head,
            leftArm: leftArm,
            rightArm: rightArm,
            body: body,
            leftEye: leftEye,
            rightEye: rightEye,
            mouth: mouth
        };
    }
    
    setupAnimations() {
        // Idle animation
        this.idleAnimation = {
            headBob: 0,
            armSway: 0,
            eyeBlink: 0
        };
    }
    
    playSignAnimation(signType) {
        const animations = {
            'hello': () => this.helloAnimation(),
            'thank-you': () => this.thankYouAnimation(),
            'please': () => this.pleaseAnimation(),
            'yes': () => this.yesAnimation(),
            'no': () => this.noAnimation(),
            'help': () => this.helpAnimation()
        };
        
        if (animations[signType]) {
            animations[signType]();
        }
    }
    
    helloAnimation() {
        const leftArm = this.avatarComponents.leftArm;
        const timeline = [
            { time: 0, rotation: { x: 0, y: 0, z: Math.PI / 4 } },
            { time: 0.5, rotation: { x: -Math.PI / 2, y: 0, z: Math.PI / 2 } },
            { time: 1.0, rotation: { x: -Math.PI / 2, y: 0, z: Math.PI / 2 } },
            { time: 1.5, rotation: { x: 0, y: 0, z: Math.PI / 4 } }
        ];
        
        this.animateArm(leftArm, timeline);
        this.updateAvatarStatus('Signing: Hello 👋');
    }
    
    thankYouAnimation() {
        const rightArm = this.avatarComponents.rightArm;
        const timeline = [
            { time: 0, rotation: { x: 0, y: 0, z: -Math.PI / 4 } },
            { time: 0.3, rotation: { x: -Math.PI / 3, y: 0, z: -Math.PI / 6 } },
            { time: 0.8, rotation: { x: -Math.PI / 3, y: 0, z: -Math.PI / 6 } },
            { time: 1.2, rotation: { x: 0, y: 0, z: -Math.PI / 4 } }
        ];
        
        this.animateArm(rightArm, timeline);
        this.updateAvatarStatus('Signing: Thank You 🙏');
    }
    
    yesAnimation() {
        const head = this.avatarComponents.head;
        const timeline = [
            { time: 0, rotation: { x: 0, y: 0, z: 0 } },
            { time: 0.2, rotation: { x: 0.3, y: 0, z: 0 } },
            { time: 0.4, rotation: { x: -0.3, y: 0, z: 0 } },
            { time: 0.6, rotation: { x: 0.3, y: 0, z: 0 } },
            { time: 0.8, rotation: { x: 0, y: 0, z: 0 } }
        ];
        
        this.animateHead(timeline);
        this.updateAvatarStatus('Signing: Yes 👍');
    }
    
    noAnimation() {
        const head = this.avatarComponents.head;
        const timeline = [
            { time: 0, rotation: { x: 0, y: 0, z: 0 } },
            { time: 0.2, rotation: { x: 0, y: -0.5, z: 0 } },
            { time: 0.4, rotation: { x: 0, y: 0.5, z: 0 } },
            { time: 0.6, rotation: { x: 0, y: -0.5, z: 0 } },
            { time: 0.8, rotation: { x: 0, y: 0, z: 0 } }
        ];
        
        this.animateHead(timeline);
        this.updateAvatarStatus('Signing: No 👎');
    }
    
    pleaseAnimation() {
        const leftArm = this.avatarComponents.leftArm;
        const rightArm = this.avatarComponents.rightArm;
        
        // Both arms together
        const timeline = [
            { time: 0, rotation: { x: 0, y: 0, z: Math.PI / 4 } },
            { time: 0.5, rotation: { x: -Math.PI / 4, y: 0, z: Math.PI / 6 } },
            { time: 1.0, rotation: { x: -Math.PI / 4, y: 0, z: Math.PI / 6 } },
            { time: 1.5, rotation: { x: 0, y: 0, z: Math.PI / 4 } }
        ];
        
        this.animateArm(leftArm, timeline);
        this.animateArm(rightArm, timeline.map(frame => ({
            ...frame,
            rotation: {
                x: frame.rotation.x,
                y: frame.rotation.y,
                z: -frame.rotation.z
            }
        })));
        this.updateAvatarStatus('Signing: Please 🤲');
    }
    
    helpAnimation() {
        const rightArm = this.avatarComponents.rightArm;
        const timeline = [
            { time: 0, rotation: { x: 0, y: 0, z: -Math.PI / 4 } },
            { time: 0.3, rotation: { x: -Math.PI / 2, y: 0, z: 0 } },
            { time: 0.6, rotation: { x: -Math.PI / 2, y: 0, z: 0 } },
            { time: 0.9, rotation: { x: -Math.PI / 2, y: 0, z: 0 } },
            { time: 1.2, rotation: { x: 0, y: 0, z: -Math.PI / 4 } }
        ];
        
        this.animateArm(rightArm, timeline);
        this.updateAvatarStatus('Signing: Help 🆘');
    }
    
    animateArm(arm, timeline) {
        const duration = Math.max(...timeline.map(frame => frame.time));
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = (Date.now() - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            
            // Find current frame
            let currentFrame = timeline[0];
            let nextFrame = timeline[1];
            
            for (let i = 0; i < timeline.length - 1; i++) {
                if (progress >= timeline[i].time / duration && progress <= timeline[i + 1].time / duration) {
                    currentFrame = timeline[i];
                    nextFrame = timeline[i + 1];
                    break;
                }
            }
            
            // Interpolate rotation
            const frameProgress = (progress - currentFrame.time / duration) / 
                                 ((nextFrame.time - currentFrame.time) / duration);
            
            arm.rotation.x = THREE.MathUtils.lerp(
                currentFrame.rotation.x, 
                nextFrame.rotation.x, 
                frameProgress
            );
            arm.rotation.y = THREE.MathUtils.lerp(
                currentFrame.rotation.y, 
                nextFrame.rotation.y, 
                frameProgress
            );
            arm.rotation.z = THREE.MathUtils.lerp(
                currentFrame.rotation.z, 
                nextFrame.rotation.z, 
                frameProgress
            );
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
    
    animateHead(timeline) {
        const head = this.avatarComponents.head;
        const duration = Math.max(...timeline.map(frame => frame.time));
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = (Date.now() - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            
            // Find current frame
            let currentFrame = timeline[0];
            let nextFrame = timeline[1];
            
            for (let i = 0; i < timeline.length - 1; i++) {
                if (progress >= timeline[i].time / duration && progress <= timeline[i + 1].time / duration) {
                    currentFrame = timeline[i];
                    nextFrame = timeline[i + 1];
                    break;
                }
            }
            
            // Interpolate rotation
            const frameProgress = (progress - currentFrame.time / duration) / 
                                 ((nextFrame.time - currentFrame.time) / duration);
            
            head.rotation.x = THREE.MathUtils.lerp(
                currentFrame.rotation.x, 
                nextFrame.rotation.x, 
                frameProgress
            );
            head.rotation.y = THREE.MathUtils.lerp(
                currentFrame.rotation.y, 
                nextFrame.rotation.y, 
                frameProgress
            );
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
    
    updateAvatarStatus(message) {
        const statusElement = document.getElementById('avatarStatus');
        if (statusElement) {
            const span = statusElement.querySelector('span');
            if (span) {
                span.textContent = message;
            }
        }
        
        // Reset status after 3 seconds
        setTimeout(() => {
            if (statusElement) {
                const span = statusElement.querySelector('span');
                if (span) {
                    span.textContent = 'Ready';
                }
            }
        }, 3000);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const elapsedTime = this.clock.getElapsedTime();
        
        // Idle animations
        if (this.avatarComponents) {
            // Gentle head bobbing
            this.avatarComponents.head.position.y = 1.5 + Math.sin(elapsedTime * 0.5) * 0.05;
            
            // Arm swaying
            this.avatarComponents.leftArm.rotation.z = Math.PI / 4 + Math.sin(elapsedTime * 0.3) * 0.1;
            this.avatarComponents.rightArm.rotation.z = -Math.PI / 4 + Math.sin(elapsedTime * 0.3) * 0.1;
            
            // Eye blinking
            if (Math.sin(elapsedTime * 2) > 0.9) {
                this.avatarComponents.leftEye.scale.y = 0.1;
                this.avatarComponents.rightEye.scale.y = 0.1;
            } else {
                this.avatarComponents.leftEye.scale.y = 1;
                this.avatarComponents.rightEye.scale.y = 1;
            }
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Speech to Sign Functionality
class SpeechToSign {
    constructor() {
        this.threeDAvatar = new ThreeDAvatar();
        this.micCircle = document.getElementById('micCircle');
        this.recognitionStatus = document.getElementById('recognitionStatus');
        this.textInput = document.getElementById('textInput');
        
        this.startListeningBtn = document.getElementById('startListening');
        this.stopListeningBtn = document.getElementById('stopListening');
        this.convertTextBtn = document.getElementById('convertText');
        this.animateAvatarBtn = document.getElementById('animateAvatar');
        
        this.recognition = null;
        this.isListening = false;
        this.microphoneVisualizer = document.querySelector('.microphone-visualizer');
        
        this.initializeEventListeners();
        this.initializeSpeechRecognition();
        this.initializeSignButtons();
    }
    
    initializeEventListeners() {
        this.startListeningBtn.addEventListener('click', () => this.startListening());
        this.stopListeningBtn.addEventListener('click', () => this.stopListening());
        this.convertTextBtn.addEventListener('click', () => this.convertTextToSign());
        this.animateAvatarBtn.addEventListener('click', () => this.demoAnimation());
    }
    
    initializeSignButtons() {
        const signButtons = document.querySelectorAll('.sign-btn');
        signButtons.forEach(button => {
            button.addEventListener('click', () => {
                const signType = button.getAttribute('data-sign');
                this.threeDAvatar.playSignAnimation(signType);
                this.showNotification(`Playing ${signType} animation`, 'success');
            });
        });
    }
    
    demoAnimation() {
        const animations = ['hello', 'thank-you', 'please', 'yes', 'no', 'help'];
        let currentIndex = 0;
        
        const playNext = () => {
            if (currentIndex < animations.length) {
                this.threeDAvatar.playSignAnimation(animations[currentIndex]);
                currentIndex++;
                setTimeout(playNext, 2000);
            } else {
                this.showNotification('Demo completed!', 'success');
            }
        };
        
        playNext();
    }
    
    initializeSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';
            
            this.recognition.onstart = () => {
                this.isListening = true;
                this.updateListeningStatus('Listening... Speak now!', 'listening');
                this.animateMicrophone();
                this.startListeningBtn.disabled = true;
                this.stopListeningBtn.disabled = false;
            };
            
            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.textInput.value = transcript;
                this.updateListeningStatus(`Recognized: "${transcript}"`, 'success');
                this.convertTextToSign();
            };
            
            this.recognition.onerror = (event) => {
                this.updateListeningStatus(`Error: ${event.error}`, 'error');
                this.stopListening();
            };
            
            this.recognition.onend = () => {
                this.stopListening();
            };
        } else {
            this.updateListeningStatus('Speech recognition not supported in this browser', 'error');
            this.startListeningBtn.disabled = true;
        }
    }
    
    startListening() {
        if (this.recognition) {
            this.recognition.start();
        }
    }
    
    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
        
        this.isListening = false;
        this.updateListeningStatus('Stopped listening', 'warning');
        this.stopMicrophoneAnimation();
        this.startListeningBtn.disabled = false;
        this.stopListeningBtn.disabled = true;
    }
    
    updateListeningStatus(message, type) {
        this.recognitionStatus.textContent = message;
        this.recognitionStatus.className = `recognition-status ${type}`;
    }
    
    animateMicrophone() {
        this.microphoneVisualizer.classList.add('listening');
        const rings = this.microphoneVisualizer.querySelectorAll('.ring');
        rings.forEach((ring, index) => {
            ring.style.animation = `ripple 2s infinite ${index * 0.5}s`;
        });
    }
    
    stopMicrophoneAnimation() {
        this.microphoneVisualizer.classList.remove('listening');
        const rings = this.microphoneVisualizer.querySelectorAll('.ring');
        rings.forEach(ring => {
            ring.style.animation = 'none';
        });
    }
    
    convertTextToSign() {
        const text = this.textInput.value.trim().toLowerCase();
        
        if (!text) {
            this.showNotification('Please enter text to convert', 'warning');
            return;
        }
        
        // Map text to sign animations
        const signMapping = {
            'hello': 'hello',
            'hi': 'hello',
            'hey': 'hello',
            'thank you': 'thank-you',
            'thanks': 'thank-you',
            'please': 'please',
            'yes': 'yes',
            'yeah': 'yes',
            'yep': 'yes',
            'no': 'no',
            'nope': 'no',
            'help': 'help',
            'assistance': 'help'
        };
        
        // Find matching sign
        let matchedSign = null;
        for (const [key, sign] of Object.entries(signMapping)) {
            if (text.includes(key)) {
                matchedSign = sign;
                break;
            }
        }
        
        if (matchedSign) {
            this.threeDAvatar.playSignAnimation(matchedSign);
            this.showNotification(`Converting "${text}" to sign language...`, 'success');
        } else {
            // Default animation for unmatched text
            this.threeDAvatar.playSignAnimation('hello');
            this.showNotification('Text converted to general greeting sign', 'info');
        }
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4ade80' : 
                     type === 'error' ? '#ef4444' : 
                     type === 'warning' ? '#f59e0b' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-weight: 500;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Learning Section Functionality
class LearningModule {
    constructor() {
        this.initializeLearningButtons();
    }
    
    initializeLearningButtons() {
        const learningButtons = document.querySelectorAll('.learning-card .btn');
        
        learningButtons.forEach(button => {
            button.addEventListener('click', () => {
                const cardTitle = button.closest('.learning-card').querySelector('h3').textContent;
                this.startLearningModule(cardTitle);
            });
        });
    }
    
    startLearningModule(moduleType) {
        switch (moduleType) {
            case 'Basic Alphabet':
                this.showAlphabetLearning();
                break;
            case 'Common Phrases':
                this.showPhrasesLearning();
                break;
            case 'Practice Mode':
                this.showPracticeMode();
                break;
        }
    }
    
    showAlphabetLearning() {
        this.showNotification('Alphabet learning module would open here. This would include interactive demonstrations of each sign language letter.', 'info');
    }
    
    showPhrasesLearning() {
        this.showNotification('Common phrases module would open here. This would include everyday expressions and their sign language equivalents.', 'info');
    }
    
    showPracticeMode() {
        this.showNotification('Practice mode would open here. This would include quizzes and gesture recognition exercises.', 'info');
    }
    
    showNotification(message, type) {
        showNotification(message, type);
    }
}

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active class styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--dark-blue) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    .recognition-status.success {
        background-color: #dcfce7;
        color: #166534;
        border: 1px solid #bbf7d0;
    }
    
    .recognition-status.error {
        background-color: #fef2f2;
        color: #dc2626;
        border: 1px solid #fecaca;
    }
    
    .recognition-status.warning {
        background-color: #fffbeb;
        color: #d97706;
        border: 1px solid #fed7aa;
    }
    
    .recognition-status.listening {
        background-color: #eff6ff;
        color: #2563eb;
        border: 1px solid #bfdbfe;
    }
    
    .audio-visualizer.playing .sound-wave {
        animation: wave 0.5s ease-in-out infinite;
    }
`;
document.head.appendChild(style);

// Advanced Interactive Effects
document.addEventListener('DOMContentLoaded', () => {
    // Magnetic hover effect for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.classList.add('magnetic');
        
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });
    
    // Parallax scrolling effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Parallax for feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const speed = 0.1 + (index * 0.05);
            card.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
    
    // Dynamic background particles
    createParticles();
    
});

// Create floating particles
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(135, 206, 235, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: particleFloat ${3 + Math.random() * 4}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        hero.appendChild(particle);
    }
}


// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize modules
    new SignToSpeech();
    new SpeechToSign();
    new LearningModule();
    
    // Add loading animation to page
    document.body.classList.add('loaded');
});

// Add loaded class styles and additional animations
const loadedStyle = document.createElement('style');
loadedStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    @keyframes particleFloat {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    /* Enhanced button hover effects */
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .btn::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
    }
    
    .btn:hover::after {
        width: 300px;
        height: 300px;
    }
    
    /* Advanced card hover effects */
    .feature-card:hover .feature-icon {
        animation: iconPulse 0.6s ease-in-out;
    }
    
    @keyframes iconPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    /* Text reveal animation */
    .text-reveal {
        overflow: hidden;
    }
    
    .text-reveal span {
        display: inline-block;
        animation: textReveal 0.8s ease-out both;
    }
    
    @keyframes textReveal {
        0% {
            transform: translateY(100%);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    /* Loading spinner */
    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(135, 206, 235, 0.3);
        border-top: 4px solid var(--dark-blue);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    /* Progress bar animation */
    .progress-bar {
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, var(--dark-blue), var(--accent-blue));
        border-radius: 2px;
        animation: progressFill 2s ease-out;
    }
    
    @keyframes progressFill {
        0% { width: 0%; }
        100% { width: 100%; }
    }
    
    /* Morphing shapes */
    .morph-shape {
        animation: morphShape 4s ease-in-out infinite;
    }
    
    @keyframes morphShape {
        0%, 100% { border-radius: 50%; }
        25% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
        50% { border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; }
        75% { border-radius: 30% 70% 70% 30% / 70% 30% 30% 70%; }
    }
`;
document.head.appendChild(loadedStyle);
