import * as THREE from 'three'

export default class Buildings {
    constructor() {
        // Materials
        this.matStone = new THREE.MeshStandardMaterial({ color: '#808080' })
        this.matGold = new THREE.MeshStandardMaterial({ color: '#FFD700' })
        this.matElixir = new THREE.MeshStandardMaterial({ color: '#FF69B4', transparent: true, opacity: 0.8 })
        this.matWood = new THREE.MeshStandardMaterial({ color: '#8B4513' })
        this.matMetal = new THREE.MeshStandardMaterial({ color: '#708090' })
        this.matGrass = new THREE.MeshStandardMaterial({ color: '#6aa121' }) // Base plate
    }

    createBasePlate(size) {
        const geometry = new THREE.BoxGeometry(size, 0.1, size)
        const mesh = new THREE.Mesh(geometry, this.matGrass)
        mesh.position.y = 0.05
        return mesh
    }

    createTownHall() {
        const group = new THREE.Group()

        // Base
        group.add(this.createBasePlate(4))

        // Main Structure
        const body = new THREE.Mesh(new THREE.BoxGeometry(3.5, 2.5, 3.5), this.matStone)
        body.position.y = 1.25
        group.add(body)

        // Roof
        const roof = new THREE.Mesh(new THREE.ConeGeometry(2.5, 1.5, 4), this.matWood)
        roof.position.y = 3.25
        roof.rotation.y = Math.PI * 0.25
        group.add(roof)

        // Door
        const door = new THREE.Mesh(new THREE.BoxGeometry(1, 1.5, 0.2), this.matWood)
        door.position.set(0, 1, 1.8)
        group.add(door)

        return group
    }

    createWall() {
        const group = new THREE.Group()

        // Stone block
        const block = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1, 0.8), this.matStone)
        block.position.y = 0.5
        group.add(block)

        // Gold top (Level 5+)
        const top = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.2, 0.8), this.matGold)
        top.position.y = 1.1
        group.add(top)

        return group
    }

    createCannon() {
        const group = new THREE.Group()

        // Base
        group.add(this.createBasePlate(3))

        // Mount
        const mount = new THREE.Mesh(new THREE.CylinderGeometry(1, 1.2, 0.5, 6), this.matWood)
        mount.position.y = 0.5
        group.add(mount)

        // Barrel
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 2), this.matMetal)
        barrel.rotation.x = Math.PI * 0.5
        barrel.position.set(0, 1.2, 0)
        group.add(barrel)

        return group
    }

    createArcherTower() {
        const group = new THREE.Group()

        // Base
        group.add(this.createBasePlate(3))

        // Legs/Structure
        const legGeo = new THREE.BoxGeometry(0.2, 3, 0.2)
        const positions = [{ x: 1, z: 1 }, { x: -1, z: 1 }, { x: 1, z: -1 }, { x: -1, z: -1 }]

        positions.forEach(pos => {
            const leg = new THREE.Mesh(legGeo, this.matWood)
            leg.position.set(pos.x, 1.5, pos.z)
            group.add(leg)
        })

        // Platform
        const platform = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.2, 2.5), this.matWood)
        platform.position.y = 3
        group.add(platform)

        return group
    }

    createGoldStorage() {
        const group = new THREE.Group()

        // Base
        group.add(this.createBasePlate(3))

        // Glass Box
        const glass = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), this.matGold)
        glass.position.y = 1.2
        group.add(glass)

        // Frame
        const frameGeo = new THREE.BoxGeometry(2.2, 0.2, 2.2)
        const frame1 = new THREE.Mesh(frameGeo, this.matMetal)
        frame1.position.y = 0.2
        group.add(frame1)

        const frame2 = new THREE.Mesh(frameGeo, this.matMetal)
        frame2.position.y = 2.2
        group.add(frame2)

        return group
    }

    createElixirCollector() {
        const group = new THREE.Group()

        // Base
        group.add(this.createBasePlate(3))

        // Tank
        const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 2, 8), this.matElixir)
        tank.position.y = 1.2
        group.add(tank)

        // Pump
        const pump = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.5, 0.5), this.matMetal)
        pump.position.set(1, 1.25, 0)
        group.add(pump)

        return group
    }

    createHeroAltar(color) {
        const group = new THREE.Group()

        // Base
        group.add(this.createBasePlate(3))

        // Altar Stone
        const stone = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.5, 2.5), this.matStone)
        stone.position.y = 0.3
        group.add(stone)

        // Colored Top
        const top = new THREE.Mesh(new THREE.BoxGeometry(2, 0.2, 2), new THREE.MeshStandardMaterial({ color: color }))
        top.position.y = 0.65
        group.add(top)

        return group
    }

    createRocketDefense() {
        const group = new THREE.Group()

        // Base
        group.add(this.createBasePlate(3))

        // Stand
        const stand = new THREE.Mesh(new THREE.CylinderGeometry(1, 1.2, 1, 6), this.matMetal)
        stand.position.y = 0.5
        group.add(stand)

        // Turret Head
        const head = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1, 1.5), this.matStone)
        head.position.y = 1.5
        group.add(head)

        // Rocket Tubes (3)
        const tubeGeo = new THREE.CylinderGeometry(0.2, 0.2, 1.5)
        tubeGeo.rotateX(Math.PI * 0.5)
        const tubeMat = new THREE.MeshStandardMaterial({ color: '#8B0000' }) // Dark Red

        const positions = [
            { x: 0, y: 1.8, z: 0 },
            { x: -0.4, y: 1.4, z: 0 },
            { x: 0.4, y: 1.4, z: 0 }
        ]

        positions.forEach(pos => {
            const tube = new THREE.Mesh(tubeGeo, tubeMat)
            tube.position.set(pos.x, pos.y, pos.z)
            group.add(tube)
        })

        return group
    }
}
