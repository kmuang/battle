import * as THREE from 'three'

export default class Projectiles {
    constructor(scene) {
        this.scene = scene
        this.projectiles = []
    }

    fireCannonball(startPos, targetPos) {
        const geometry = new THREE.SphereGeometry(0.3)
        const material = new THREE.MeshStandardMaterial({ color: '#000000' })
        const mesh = new THREE.Mesh(geometry, material)

        mesh.position.copy(startPos)
        this.scene.add(mesh)

        // Calculate velocity
        const velocity = targetPos.clone().sub(startPos).normalize().multiplyScalar(0.5) // Speed

        this.projectiles.push({ mesh, velocity, type: 'cannonball', life: 60 })
    }

    fireArrow(startPos, targetPos) {
        const geometry = new THREE.CylinderGeometry(0.05, 0.05, 0.8)
        geometry.rotateX(Math.PI * 0.5)
        const material = new THREE.MeshStandardMaterial({ color: '#8B4513' })
        const mesh = new THREE.Mesh(geometry, material)

        mesh.position.copy(startPos)
        mesh.lookAt(targetPos)
        this.scene.add(mesh)

        const velocity = targetPos.clone().sub(startPos).normalize().multiplyScalar(0.8) // Faster than cannonball

        this.projectiles.push({ mesh, velocity, type: 'arrow', life: 60 })
    }

    fireFireball(startPos, targetPos) {
        const geometry = new THREE.SphereGeometry(0.4)
        const material = new THREE.MeshStandardMaterial({ color: '#FF4500', emissive: '#FF4500', emissiveIntensity: 0.5 })
        const mesh = new THREE.Mesh(geometry, material)

        mesh.position.copy(startPos)
        this.scene.add(mesh)

        const velocity = targetPos.clone().sub(startPos).normalize().multiplyScalar(0.6)

        this.projectiles.push({ mesh, velocity, type: 'fireball', life: 60 })
    }

    fireRocket(startPos, targetPos) {
        const group = new THREE.Group()

        // Body
        const body = new THREE.Mesh(
            new THREE.CylinderGeometry(0.1, 0.1, 0.8),
            new THREE.MeshStandardMaterial({ color: '#FFFFFF' })
        )
        body.rotation.x = Math.PI * 0.5
        group.add(body)

        // Nose
        const nose = new THREE.Mesh(
            new THREE.ConeGeometry(0.1, 0.3),
            new THREE.MeshStandardMaterial({ color: '#FF0000' })
        )
        nose.rotation.x = Math.PI * 0.5
        nose.position.z = 0.55
        group.add(nose)

        group.position.copy(startPos)
        group.lookAt(targetPos)
        this.scene.add(group)

        const velocity = targetPos.clone().sub(startPos).normalize().multiplyScalar(0.7)

        this.projectiles.push({ mesh: group, velocity, type: 'rocket', life: 80 })
    }

    update() {
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const p = this.projectiles[i]
            p.mesh.position.add(p.velocity)
            p.life--

            if (p.life <= 0) {
                this.scene.remove(p.mesh)
                this.projectiles.splice(i, 1)
            }
        }
    }
}
