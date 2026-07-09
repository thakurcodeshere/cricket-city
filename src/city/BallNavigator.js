// ============================================
// CRICKET CITY — Ball Navigator
// Cricket ball arc animation between buildings
// ============================================

import * as THREE from 'three';
import gsap from 'gsap';

export class BallNavigator {
  constructor(scene, camera, controls) {
    this.scene = scene;
    this.camera = camera;
    this.controls = controls;
    this.ball = null;
    this.trail = null;
    this.trailPoints = [];
    this.isAnimating = false;
    this.onArrival = null;

    this.createBall();
  }

  createBall() {
    // Cricket ball — red with seam
    const ballGroup = new THREE.Group();

    // Main sphere
    const ballGeo = new THREE.SphereGeometry(0.6, 32, 32);
    const ballMat = new THREE.MeshStandardMaterial({
      color: 0xCC2222,
      roughness: 0.6,
      metalness: 0.2,
      emissive: 0xCC2222,
      emissiveIntensity: 0.15
    });
    const sphere = new THREE.Mesh(ballGeo, ballMat);
    ballGroup.add(sphere);

    // Seam ring
    const seamGeo = new THREE.TorusGeometry(0.6, 0.04, 8, 32);
    const seamMat = new THREE.MeshStandardMaterial({
      color: 0xFFEECC,
      roughness: 0.3,
      metalness: 0.1,
      emissive: 0xFFEECC,
      emissiveIntensity: 0.2
    });
    const seam = new THREE.Mesh(seamGeo, seamMat);
    seam.rotation.x = Math.PI / 6;
    ballGroup.add(seam);

    // Glow
    const glowGeo = new THREE.SphereGeometry(0.9, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xFF4444,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    ballGroup.add(glow);

    // Point light on ball
    const light = new THREE.PointLight(0xFF4444, 1, 10);
    ballGroup.add(light);

    ballGroup.visible = false;
    this.ball = ballGroup;
    this.scene.add(this.ball);

    // Trail line
    const trailMat = new THREE.LineBasicMaterial({
      color: 0xFF6644,
      transparent: true,
      opacity: 0.5,
      linewidth: 2
    });
    const trailGeo = new THREE.BufferGeometry();
    this.trail = new THREE.Line(trailGeo, trailMat);
    this.trail.visible = false;
    this.scene.add(this.trail);
  }

  navigateTo(fromPos, toPos, onComplete) {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const from = fromPos.clone();
    from.y = 2;
    const to = toPos.clone();
    to.y = 2;

    // Arc height based on distance
    const distance = from.distanceTo(to);
    const arcHeight = Math.max(15, distance * 0.4);
    const midPoint = from.clone().lerp(to, 0.5);
    midPoint.y = arcHeight;

    // Build curve path
    const curve = new THREE.QuadraticBezierCurve3(from, midPoint, to);
    const curvePoints = curve.getPoints(80);

    // Show ball
    this.ball.visible = true;
    this.ball.position.copy(from);

    // Trail points
    this.trailPoints = [];

    // Animate along curve
    const progress = { t: 0 };
    const duration = Math.max(1.5, Math.min(3, distance * 0.04));

    gsap.to(progress, {
      t: 1,
      duration: duration,
      ease: 'power2.inOut',
      onUpdate: () => {
        const point = curve.getPoint(progress.t);
        this.ball.position.copy(point);

        // Spin the ball
        this.ball.children[0].rotation.x += 0.15;
        this.ball.children[0].rotation.z += 0.08;
        this.ball.children[1].rotation.y += 0.1;

        // Update trail
        this.trailPoints.push(point.clone());
        if (this.trailPoints.length > 2) {
          const geo = new THREE.BufferGeometry().setFromPoints(this.trailPoints);
          this.trail.geometry.dispose();
          this.trail.geometry = geo;
          this.trail.visible = true;
        }

        // Camera follows ball loosely
        const camOffset = new THREE.Vector3(0, 8, 12);
        const targetCamPos = point.clone().add(camOffset);
        this.camera.position.lerp(targetCamPos, 0.03);
        this.controls.target.lerp(point, 0.05);
      },
      onComplete: () => {
        // Zoom into building
        gsap.to(this.camera.position, {
          x: to.x + 5,
          y: to.y + 10,
          z: to.z + 12,
          duration: 1,
          ease: 'power2.out'
        });

        gsap.to(this.controls.target, {
          x: to.x,
          y: to.y + 5,
          z: to.z,
          duration: 1,
          ease: 'power2.out'
        });

        // Fade out ball & trail
        setTimeout(() => {
          this.ball.visible = false;
          this.trail.visible = false;
          this.trailPoints = [];
          this.isAnimating = false;

          if (onComplete) onComplete();
          if (this.onArrival) this.onArrival();
        }, 1200);
      }
    });
  }

  dispose() {
    this.scene.remove(this.ball);
    this.scene.remove(this.trail);
  }
}
