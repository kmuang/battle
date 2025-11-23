import * as THREE from 'three'

export default class Troops {
    constructor(scene, buildingsList) {
        this.scene = scene
        this.buildingsList = buildingsList // Array of building meshes
        this.troops = []

        // Spawn some troops initially
        this.spawnWave()
    }

    spawnWave() {
        for (let i = 0; i < 10; i++) this.spawnBarbarian(-20 + Math.random() * 40, -20)
        for (let i = 0; i < 10; i++) this.spawnArcher(-20 + Math.random() * 40, 20)
        for (let i = 0; i < 4; i++) this.spawnGiant(-25, 0 + (Math.random() - 0.5) * 10)
        for (let i = 0; i < 4; i++) this.spawnWizard(25, 0 + (Math.random() - 0.5) * 10)

        this.spawnKing(0, -25)
        this.spawnQueen(0, 25)
    }

    spawnBarbarian(x, z) {
        const group = new THREE.Group()

        // Body
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 1, 0.5),
            new THREE.MeshStandardMaterial({ color: '#FFD700' }) // Yellow hair/body
        )
        body.position.y = 0.5
        group.add(body)

        // Sword
        const sword = new THREE.Mesh(
            new THREE.BoxGeometry(0.2, 0.8, 0.1),
            new THREE.MeshStandardMaterial({ color: '#C0C0C0' })
        )
        sword.position.set(0.5, 0.5, 0.3)
        sword.rotation.x = Math.PI * 0.2
        group.add(sword)

        group.position.set(x, 0, z)
        this.scene.add(group)

        this.troops.push({
            mesh: group,
            type: 'barbarian',
            hp: 100,
            range: 1.5,
            speed: 0.1,
            target: null
        })
    }

    spawnArcher(x, z) {
        const group = new THREE.Group()

        // Body
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(0.6, 1, 0.4),
            new THREE.MeshStandardMaterial({ color: '#FF69B4' }) // Pink hair
        )
        body.position.y = 0.5
        group.add(body)

        // Bow
        const bow = new THREE.Mesh(
            new THREE.TorusGeometry(0.3, 0.05, 4, 8, Math.PI),
            new THREE.MeshStandardMaterial({ color: '#8B4513' })
        )
        bow.position.set(0, 0.6, 0.3)
        group.add(bow)

        group.position.set(x, 0, z)
        this.scene.add(group)

        this.troops.push({
            mesh: group,
            type: 'archer',
            hp: 50,
            range: 8,
            speed: 0.08,
            target: null
        })
    }

    spawnGiant(x, z) {
        const group = new THREE.Group()

        // Body (Big)
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(1.5, 2, 1),
            new THREE.MeshStandardMaterial({ color: '#8B4513' }) // Brown coat
        )
        body.position.y = 1
        group.add(body)

        group.position.set(x, 0, z)
        this.scene.add(group)

        this.troops.push({
            mesh: group,
            type: 'giant',
            hp: 600,
            range: 1.5,
            speed: 0.04, // Slow
            target: null,
            prioritizeDefenses: true
        })
    }

    spawnWizard(x, z) {
        const group = new THREE.Group()

        // Robe
        const body = new THREE.Mesh(
            new THREE.ConeGeometry(0.5, 1.5, 8),
            new THREE.MeshStandardMaterial({ color: '#4169E1' }) // Blue robe
        )
        body.position.y = 0.75
        group.add(body)

        // Afro
        const head = new THREE.Mesh(
            new THREE.BoxGeometry(0.6, 0.4, 0.6),
            new THREE.MeshStandardMaterial({ color: '#000000' })
        )
        head.position.y = 1.6
        group.add(head)

        group.position.set(x, 0, z)
        this.scene.add(group)

        this.troops.push({
            mesh: group,
            type: 'wizard',
            hp: 80,
            range: 7,
            speed: 0.08,
            target: null
        })
    }

    spawnKing(x, z) {
        const group = new THREE.Group()

        // Huge Body
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(1.2, 1.8, 0.8),
            new THREE.MeshStandardMaterial({ color: '#FFD700' })
        )
        body.position.y = 0.9
        group.add(body)

        // Crown
        const crown = new THREE.Mesh(
            new THREE.CylinderGeometry(0.5, 0.5, 0.3, 6),
            new THREE.MeshStandardMaterial({ color: '#FFD700', metalness: 1 })
        )
        crown.position.y = 2
        group.add(crown)

        // Iron Fist
        const fist = new THREE.Mesh(
            new THREE.BoxGeometry(0.6, 0.6, 0.6),
            new THREE.MeshStandardMaterial({ color: '#708090' })
        )
        fist.position.set(0.8, 1, 0.4)
        group.add(fist)

        group.position.set(x, 0, z)
        this.scene.add(group)

        this.troops.push({
            mesh: group,
            type: 'king',
            hp: 1500,
            range: 1.5,
            speed: 0.08,
            target: null
        })
    }

    spawnQueen(x, z) {
        const group = new THREE.Group()

        // Body
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 1.6, 0.6),
            new THREE.MeshStandardMaterial({ color: '#800080' }) // Purple
        )
        body.position.y = 0.8
        group.add(body)

        // Crown
        const crown = new THREE.Mesh(
            new THREE.CylinderGeometry(0.4, 0.4, 0.2, 6),
            new THREE.MeshStandardMaterial({ color: '#C0C0C0', metalness: 1 })
        )
        crown.position.y = 1.8
        group.add(crown)

        // X-Bow
        const xbow = new THREE.Mesh(
            new THREE.BoxGeometry(0.3, 0.3, 1),
            new THREE.MeshStandardMaterial({ color: '#8B4513' })
        )
        xbow.position.set(0.5, 1, 0.4)
        group.add(xbow)

        group.position.set(x, 0, z)
        this.scene.add(group)

        this.troops.push({
            mesh: group,
            type: 'queen',
            hp: 800,
            range: 10, // Long range
            speed: 0.08,
            target: null
        })
    }

    update(projectiles, audio) {
        this.troops.forEach(troop => {
            if (!troop.target || !troop.target.parent) { // Target destroyed or invalid
                troop.target = this.findNearestBuilding(troop.mesh.position, troop.prioritizeDefenses)
            }

            if (troop.target) {
                const dist = troop.mesh.position.distanceTo(troop.target.position)

                if (dist > troop.range) {
                    // Move towards target
                    const direction = troop.target.position.clone().sub(troop.mesh.position).normalize()
                    troop.mesh.position.add(direction.multiplyScalar(troop.speed))
                    troop.mesh.lookAt(troop.target.position)
                } else {
                    // Attack (Animation placeholder)
                    troop.mesh.rotation.y += 0.2 // Spin attack!

                    // Wizards and Queen shoot
                    if (Math.random() < 0.05) {
                        if (troop.type === 'wizard') {
                            projectiles.fireFireball(troop.mesh.position.clone().add(new THREE.Vector3(0, 1, 0)), troop.target.position)
                            audio.playMagic()
                        } else if (troop.type === 'queen') {
                            projectiles.fireArrow(troop.mesh.position.clone().add(new THREE.Vector3(0, 1, 0)), troop.target.position)
                            audio.playArrow()
                        }
                    }
                }
            }
        })
    }

    findNearestBuilding(position, prioritizeDefenses = false) {
        let nearest = null
        let minDist = Infinity

        // Filter for defenses if prioritized
        const targets = prioritizeDefenses
            ? this.buildingsList.filter(b => b.userData.type === 'cannon' || b.userData.type === 'archertower')
            : this.buildingsList

        // Fallback if no defenses left
        const finalTargets = (targets.length > 0) ? targets : this.buildingsList

        finalTargets.forEach(building => {
            const dist = position.distanceTo(building.position)
            if (dist < minDist) {
                minDist = dist
                nearest = building
            }
        })
        return nearest
    }
}
