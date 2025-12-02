import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'


export default function StarField() {
    const ref = useRef<THREE.Points>(null!)

    useFrame((_, delta) => {
        ref.current.rotation.y += delta * 0.1
    })

    return (
        <points ref={ref}>
            <sphereGeometry args={[6, 64, 64]} />
            <pointsMaterial size={0.01} color="white" />
        </points>
    )
}