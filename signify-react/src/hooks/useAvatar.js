import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const useAvatar = (canvasRef) => {
  const [avatarStatus, setAvatarStatus] = useState('⏳ جاري تحميل الأفاتار...');
  const [isLoaded, setIsLoaded] = useState(false);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const avatarRef = useRef(null);
  const mixerRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const animationFrameRef = useRef(null);
  const bonesRef = useRef({});

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5); // Light gray - subtle background
    sceneRef.current = scene;

    // Camera - original settings from realistic-avatar.js (no modifications)
    const camera = new THREE.PerspectiveCamera(
      50,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.6, 2.5);
    camera.lookAt(0, 1.4, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    // Professional Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
    keyLight.position.set(2, 3, 2);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-2, 2, -1);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
    rimLight.position.set(0, 2, -3);
    scene.add(rimLight);

    const faceLight1 = new THREE.PointLight(0xffffff, 0.3, 5);
    faceLight1.position.set(0.5, 1.8, 1);
    scene.add(faceLight1);

    const faceLight2 = new THREE.PointLight(0xffffff, 0.3, 5);
    faceLight2.position.set(-0.5, 1.8, 1);
    scene.add(faceLight2);

    // Load GLB Model
    const loader = new GLTFLoader();
    loader.load(
      '/691f406abcfe438b1863e4d2.glb',
      (gltf) => {
        console.log('✅ تم تحميل النموذج 3D بنجاح!', gltf);
        
        avatarRef.current = gltf.scene;
        
        // NO modifications - use model as-is with its original size and position
        console.log('Model loaded with original form - no scaling or positioning');
        
        // Enable shadows
        avatarRef.current.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
            
            if (node.material) {
              if (node.material.map) {
                node.material.map.anisotropy = renderer.capabilities.getMaxAnisotropy();
              }
              node.material.needsUpdate = true;
            }
          }
          
          // Store bones
          if (node.isBone) {
            bonesRef.current[node.name] = node;
            console.log('Found bone:', node.name);
          }
          
          // Store important nodes
          const nodeName = node.name.toLowerCase();
          if (nodeName.includes('hand') || nodeName.includes('wrist') || 
              nodeName.includes('arm') || nodeName.includes('shoulder') ||
              nodeName.includes('head') || nodeName.includes('neck') ||
              nodeName.includes('finger') || nodeName.includes('thumb')) {
            bonesRef.current[node.name] = node;
          }
        });
        
        // Setup animation mixer
        if (gltf.animations && gltf.animations.length > 0) {
          mixerRef.current = new THREE.AnimationMixer(avatarRef.current);
          console.log('Found animations:', gltf.animations.length);
          
          gltf.animations.forEach((clip) => {
            console.log('Animation:', clip.name);
          });
        }
        
        scene.add(avatarRef.current);
        setIsLoaded(true);
        setAvatarStatus('✅ جاهز');
        
        console.log('Avatar loaded! Total bones:', Object.keys(bonesRef.current).length);
      },
      (progress) => {
        const percent = (progress.loaded / progress.total) * 100;
        setAvatarStatus(`⏳ جاري التحميل... ${Math.round(percent)}%`);
      },
      (error) => {
        console.error('❌ خطأ في تحميل الأفاتار:', error);
        setAvatarStatus('❌ فشل تحميل الأفاتار');
        
        // Fallback to simple avatar
        console.log('Creating fallback avatar...');
        createSimpleAvatar(scene, bonesRef);
        setIsLoaded(true);
        setAvatarStatus('✅ جاهز (وضع بسيط)');
      }
    );
    
    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      const delta = clockRef.current.getDelta();
      
      // Update mixer if available
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }
      
      // Idle animations for simple avatar
      if (!mixerRef.current) {
        const elapsedTime = clockRef.current.getElapsedTime();
        
        if (bonesRef.current.head) {
          bonesRef.current.head.position.y = 1.5 + Math.sin(elapsedTime * 0.5) * 0.05;
        }
        
        if (bonesRef.current.leftArm) {
          bonesRef.current.leftArm.rotation.z = Math.PI / 4 + Math.sin(elapsedTime * 0.3) * 0.1;
        }
        
        if (bonesRef.current.rightArm) {
          bonesRef.current.rightArm.rotation.z = -Math.PI / 4 + Math.sin(elapsedTime * 0.3) * 0.1;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      renderer.dispose();
    };
  }, [canvasRef]);

  const playSignAnimation = (signType) => {
    setAvatarStatus(`🤟 يتم تشغيل: ${getSignNameInArabic(signType)}`);
    
    // If we have a real avatar with animations, try to play them
    if (mixerRef.current && avatarRef.current) {
      // Try to find and play animation by name
      // This depends on the GLB file's animation names
      console.log('Playing animation for:', signType);
    }
    
    // Fallback to simple animations
    const animations = {
      'hello': animateWave,
      'thank-you': animateThankYou,
      'yes': animateNod,
      'no': animateHeadShake,
      'please': animatePlease,
      'help': animateHelp
    };

    const animationFn = animations[signType] || animateWave;
    if (bonesRef.current.leftArm || bonesRef.current.rightArm || bonesRef.current.head) {
      animationFn(bonesRef.current, avatarRef.current);
    }

    setTimeout(() => setAvatarStatus('✅ جاهز'), 3000);
  };

  return { avatarStatus, playSignAnimation, isLoaded };
};

// Helper to get Arabic name
const getSignNameInArabic = (signType) => {
  const names = {
    'hello': 'مرحباً',
    'thank-you': 'شكراً',
    'yes': 'نعم',
    'no': 'لا',
    'please': 'من فضلك',
    'help': 'مساعدة'
  };
  return names[signType] || signType;
};

// Helper function to create simple fallback avatar
const createSimpleAvatar = (scene, bonesRef) => {
  const avatar = new THREE.Group();

  const skinMaterial = new THREE.MeshLambertMaterial({ color: 0xffdbac });
  const shirtMaterial = new THREE.MeshLambertMaterial({ color: 0x4169E1 });

  // Head
  const headGeometry = new THREE.SphereGeometry(0.8, 32, 32);
  const head = new THREE.Mesh(headGeometry, skinMaterial);
  head.position.set(0, 1.5, 0);
  head.castShadow = true;
  avatar.add(head);
  bonesRef.current.head = head;

  // Eyes
  const eyeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
  const eyeMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
  
  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  leftEye.position.set(-0.25, 1.6, 0.7);
  avatar.add(leftEye);
  
  const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  rightEye.position.set(0.25, 1.6, 0.7);
  avatar.add(rightEye);

  // Body
  const bodyGeometry = new THREE.CylinderGeometry(0.6, 0.8, 1.5, 16);
  const body = new THREE.Mesh(bodyGeometry, shirtMaterial);
  body.position.set(0, 0.2, 0);
  body.castShadow = true;
  avatar.add(body);

  // Arms
  const armGeometry = new THREE.CylinderGeometry(0.15, 0.2, 1.2, 16);
  
  const leftArm = new THREE.Mesh(armGeometry, skinMaterial);
  leftArm.position.set(-0.8, 0.5, 0);
  leftArm.rotation.z = Math.PI / 4;
  leftArm.castShadow = true;
  avatar.add(leftArm);
  bonesRef.current.leftArm = leftArm;
  
  const rightArm = new THREE.Mesh(armGeometry, skinMaterial);
  rightArm.position.set(0.8, 0.5, 0);
  rightArm.rotation.z = -Math.PI / 4;
  rightArm.castShadow = true;
  avatar.add(rightArm);
  bonesRef.current.rightArm = rightArm;

  scene.add(avatar);
};

// Animation functions (same as before)
const animateWave = (bones, avatar) => {
  if (!bones.leftArm && !avatar) return;
  
  const arm = bones.leftArm;
  if (!arm) return;
  
  const startRotation = arm.rotation.z;
  const duration = 1500;
  const startTime = Date.now();

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    if (progress < 0.5) {
      arm.rotation.z = startRotation + (Math.PI / 2) * (progress * 2);
    } else {
      arm.rotation.z = startRotation + (Math.PI / 2) * (2 - progress * 2);
    }

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      arm.rotation.z = startRotation;
    }
  };
  animate();
};

const animateThankYou = (bones) => {
  if (!bones.rightArm) return;
  
  const startRotation = bones.rightArm.rotation.z;
  const duration = 1200;
  const startTime = Date.now();

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    bones.rightArm.rotation.x = -Math.PI / 3 * progress;
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      bones.rightArm.rotation.x = 0;
      bones.rightArm.rotation.z = startRotation;
    }
  };
  animate();
};

const animateNod = (bones) => {
  if (!bones.head) return;
  
  const startRotation = bones.head.rotation.x;
  const duration = 800;
  const startTime = Date.now();

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    bones.head.rotation.x = Math.sin(progress * Math.PI * 2) * 0.3;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      bones.head.rotation.x = startRotation;
    }
  };
  animate();
};

const animateHeadShake = (bones) => {
  if (!bones.head) return;
  
  const startRotation = bones.head.rotation.y;
  const duration = 800;
  const startTime = Date.now();

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    bones.head.rotation.y = Math.sin(progress * Math.PI * 3) * 0.5;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      bones.head.rotation.y = startRotation;
    }
  };
  animate();
};

const animatePlease = (bones) => {
  if (!bones.leftArm || !bones.rightArm) return;
  
  const duration = 1500;
  const startTime = Date.now();

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    bones.leftArm.rotation.x = -Math.PI / 4 * progress;
    bones.rightArm.rotation.x = -Math.PI / 4 * progress;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      bones.leftArm.rotation.x = 0;
      bones.rightArm.rotation.x = 0;
    }
  };
  animate();
};

const animateHelp = (bones) => {
  if (!bones.rightArm) return;
  
  const duration = 1200;
  const startTime = Date.now();

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    bones.rightArm.rotation.x = -Math.PI / 2 * progress;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      bones.rightArm.rotation.x = 0;
    }
  };
  animate();
};
