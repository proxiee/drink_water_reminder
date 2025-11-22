import React, { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, OrbitControls, Environment, Center, ContactShadows, SpotLight, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

const Model = ({ percentage }) => {
    const { scene, animations } = useGLTF('/models/labubu_final.glb')
    const { actions, names } = useAnimations(animations, scene)

    useEffect(() => {
        if (names.length > 0) {
            Object.values(actions).forEach(a => a.stop())
        }
        // Enable shadows for the model
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
    }, [scene, animations, names, actions])

    useFrame((state, delta) => {
        const time = state.clock.elapsedTime

        if (percentage >= 100) {
            // --- DANCE STATE ---
            if (names.length > 0) {
                const actionName = names[0]
                const action = actions[actionName]
                if (action && !action.isRunning()) {
                    action.reset().fadeIn(0.5).play()
                }
            } else {
                // Procedural Dance
                scene.position.y = Math.abs(Math.sin(time * 8)) * 0.5
                scene.rotation.y += delta * 5
                scene.rotation.z = Math.sin(time * 10) * 0.2
                const scalePulse = 1.0 + Math.sin(time * 10) * 0.1
                scene.scale.set(scalePulse, scalePulse, scalePulse)
            }
        } else {
            // --- IDLE STATE ---
            if (names.length > 0) {
                Object.values(actions).forEach(a => a.stop())
            }
            scene.position.y = THREE.MathUtils.lerp(scene.position.y, 0, delta * 5)
            scene.rotation.y = THREE.MathUtils.lerp(scene.rotation.y, 0, delta * 5)
            scene.rotation.z = THREE.MathUtils.lerp(scene.rotation.z, 0, delta * 5)
            const breath = 1.0 + Math.sin(time * 2) * 0.02
            scene.scale.set(breath, breath, breath)
        }
    })

    return <primitive object={scene} />
}

const Creature3D = ({ percentage }) => {
    let mood = "Keep drinking to see me dance!"
    if (percentage >= 100) mood = "GOAL REACHED! PARTY TIME!"

    // Trigger Confetti on Goal Reach
    useEffect(() => {
        if (percentage >= 100) {
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(function () {
                const particleCount = 50;

                if (window.confetti) {
                    window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                    window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
                }
            }, 250);

            return () => clearInterval(interval);
        }
    }, [percentage])

    return (
        <div className="creature-container" style={{ height: '60vh', width: '100%' }}>
            <Canvas shadows camera={{ position: [0, 0, 2.5], fov: 50 }}>
                <ambientLight intensity={1.5} />

                {/* Main Key Light */}
                <spotLight
                    position={[5, 10, 5]}
                    angle={0.5}
                    penumbra={1}
                    intensity={200}
                    castShadow
                    shadow-bias={-0.0001}
                />

                {/* Fill Light */}
                <pointLight position={[-10, -10, -10]} intensity={10} />

                <React.Suspense fallback={<mesh><boxGeometry /><meshStandardMaterial color="red" /></mesh>}>
                    <Center>
                        <Model percentage={percentage} />
                    </Center>
                    <ContactShadows resolution={1024} scale={10} blur={1} opacity={0.5} far={10} color="#000000" />

                    {/* 3D Sparkles when Goal Reached */}
                    {percentage >= 100 && (
                        <Sparkles
                            count={100}
                            scale={5}
                            size={6}
                            speed={0.4}
                            opacity={1}
                            color="#FFFF00"
                        />
                    )}
                </React.Suspense>

                <OrbitControls enableZoom={false} />
                <Environment preset="studio" />
            </Canvas>

            <div style={{
                position: 'absolute',
                bottom: '20px',
                background: 'rgba(0,0,0,0.5)',
                padding: '5px 15px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                pointerEvents: 'none'
            }}>
                {mood}
            </div>
        </div>
    )
}

export default Creature3D
